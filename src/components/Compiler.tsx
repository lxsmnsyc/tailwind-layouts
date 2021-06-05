import * as esbuild from 'esbuild-wasm';
import esbuildWASM from 'esbuild-wasm/esbuild.wasm?url';
import React, { ComponentType, useState, useEffect } from 'react';
import createResource from '../utils/create-resource';

export interface CompilerBaseProps {
  code?: string;
  title: string;
}

export interface CompilerProps extends CompilerBaseProps {
  onError: (error: Error) => void;
  onLoad?: () => void;
}

interface ComponentExport {
  default: ComponentType;
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

  const [exported, setExported] = useState<ComponentExport>();

  useEffect(() => {
    let mounted = true;

    if (code) {
      esbuild.transform(code, {
        format: 'esm',
        target: 'es2017',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        loader: 'jsx',
        globalName: 'Component',
        sourcemap: 'inline',
        minify: true,
      }).then((result) => {
        if (mounted) {
          const encodedJs = encodeURIComponent(result.code);
          const dataUri = `data:text/javascript;charset=utf-8,${encodedJs}`;
          return import(/* @vite-ignore */dataUri).then((mod: ComponentExport) => {
            setExported(mod);
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

  if (exported == null) {
    return <></>;
  }

  const { default: Component } = exported;

  if (Component == null) {
    return <></>;
  }

  return (
    <Component />
  );
}
