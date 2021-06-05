import * as esbuild from 'esbuild-wasm';
import esbuildWASM from 'esbuild-wasm/esbuild.wasm?url';
import React, { useEffect, useRef } from 'react';
import createResource from '../utils/create-resource';

export interface CompilerBaseProps {
  code?: string;
  title: string;
}

export interface CompilerProps extends CompilerBaseProps {
  onError: (error: Error) => void;
  onLoad?: () => void;
}

type ExportCleanup = (() => void) | undefined | void; 

interface ComponentExport {
  default: (root: HTMLDivElement) => ExportCleanup;
}

const esbuildResource = createResource(() => esbuild.initialize({
  wasmURL: esbuildWASM,
}));

export default function Compiler(
  {
    code,
    title,
    onError,
    onLoad,
  }: CompilerProps,
): JSX.Element {
  esbuildResource.read();

  const container = useRef<HTMLDivElement | null>(null);
  const cleanup = useRef<ExportCleanup>();

  useEffect(() => () => {
    if (cleanup.current) {
      cleanup.current();
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (code && container.current) {
      const { current } = container;
      esbuild.transform(code, {
        format: 'esm',
        target: 'es2017',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        loader: 'jsx',
        globalName: 'Component',
        sourcemap: 'inline',
      }).then((result) => {
        if (mounted) {
          const encodedJs = encodeURIComponent(result.code);
          const dataUri = `data:text/javascript;charset=utf-8,${encodedJs}`;
          return import(/* @vite-ignore */dataUri).then((mod: ComponentExport) => {
            if (cleanup.current) {
              cleanup.current();
            }
            cleanup.current = mod.default(current);
            onLoad?.();
          });
        }
        return undefined;
      }).catch((err) => {
        onError(err);
      });
    }

    return () => {
      mounted = false;
    };
  }, [code, title, onError, onLoad]);

  return (
    <div ref={container} className="w-full h-full" />
  );
}
