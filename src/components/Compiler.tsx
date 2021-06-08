import * as esbuild from 'esbuild-wasm';
import esbuildWASM from 'esbuild-wasm/esbuild.wasm?url';
import React, { useEffect, useRef, useState } from 'react';
import { EXTENSIONS } from '../pages';
import createResource from '../utils/create-resource';
import { useEnvironmentState } from './Environment';

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

  const environment = useEnvironmentState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const cleanup = useRef<ExportCleanup>();

  useEffect(() => {
    setRefreshKey((current) => current + 1);
  }, [environment]);

  useEffect(() => () => {
    if (cleanup.current) {
      cleanup.current();
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (code && container) {
      if (EXTENSIONS[environment] === 'tsx') {
        esbuild.transform(code, {
          format: 'esm',
          target: 'es2017',
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment',
          loader: 'tsx',
          globalName: 'Component',
          sourcemap: 'inline',
          tsconfigRaw: JSON.stringify({
            compilerOptions: {
              module: 'ESNext',
              lib: ['ESNext'],
              importHelpers: true,
              declaration: true,
              sourceMap: true,
              strict: true,
              noUnusedLocals: true,
              noUnusedParameters: true,
              noImplicitReturns: true,
              noFallthroughCasesInSwitch: true,
              moduleResolution: 'node',
              jsx: 'react',
              esModuleInterop: true,
              target: 'ES2017',
            },
          }),
        }).then((result) => {
          if (mounted) {
            const encodedJs = encodeURIComponent(result.code);
            const dataUri = `data:text/javascript;charset=utf-8,${encodedJs}`;
            return import(/* @vite-ignore */dataUri).then((mod: ComponentExport) => {
              if (cleanup.current) {
                try {
                  cleanup.current();
                } catch (error) {
                  cleanup.current = undefined;
                  throw error;
                }
              }
              cleanup.current = mod.default(container);
              onLoad?.();
            });
          }
          return undefined;
        }).catch((err) => {
          onError(err);
        });
      } else {
        container.innerHTML = code;

        container.querySelectorAll('script').forEach((item) => {
          // Get the content
          const content = item.textContent;
          if (content) {
            // Create replacement
            const newScript = document.createElement('script');
            const textContent = document.createTextNode(content);
            // Update content
            newScript.appendChild(textContent);
            item.parentNode?.replaceChild(newScript, item);
          }
        });

        cleanup.current = () => {
          while (container.firstChild) {
            if (container.lastChild) {
              container.removeChild(container.lastChild);
            }
          }
        };

        onLoad?.();
      }
    }

    return () => {
      mounted = false;
    };
  }, [code, title, onError, onLoad, container, environment]);

  return (
    <div key={refreshKey} ref={setContainer} className="w-full h-full" />
  );
}
