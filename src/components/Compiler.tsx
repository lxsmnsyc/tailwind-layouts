import * as esbuild from 'esbuild-wasm';
import React, { ComponentType, useState, useEffect } from 'react';
import createResource from '../utils/create-resource';

export interface CompilerBaseProps {
  code?: string;
  title: string;
}

export interface CompilerProps extends CompilerBaseProps {
  onError: (error: Error) => void;
}

interface ComponentExport {
  default: ComponentType;
}

const esbuildResource = createResource(() => esbuild.initialize({
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.12.5/esbuild.wasm',
}));

export default function Compiler(
  {
    code,
    title,
    onError,
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
      }).then((result) => {
        if (mounted) {
          const encodedJs = encodeURIComponent(result.code);
          const dataUri = `data:text/javascript;charset=utf-8,${encodedJs}`;
          return import(/* @vite-ignore */dataUri).then((mod: ComponentExport) => {
            setExported(mod);
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
  }, [code, title, onError]);

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
