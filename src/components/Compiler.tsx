import * as esbuild from 'esbuild-wasm';
import esbuildWASM from 'esbuild-wasm/esbuild.wasm?url';
import React, { useEffect, useRef, useState } from 'react';
import { EXTENSIONS } from '../pages';
import createResource from '../utils/create-resource';
import { useEnvironmentState } from './Environment';
import IFRAME from './playground/playground.html?raw';

export interface CompilerBaseProps {
  code?: string;
  title: string;
}

export interface CompilerProps extends CompilerBaseProps {
  onError: (error: Error) => void;
  onLoad?: () => void;
}

type ExportCleanup = (() => void) | undefined | void;

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
  const [container, setContainer] = useState<HTMLIFrameElement | null>(null);
  const cleanup = useRef<ExportCleanup>();
  const [refreshKey, setRefreshKey] = useState(0);

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
      const transformedCode = EXTENSIONS[environment] === 'tsx'
        ? code
        // https://stackoverflow.com/questions/56647747/how-to-base64-encode-emojis-in-javascript
        : `
        export default function renderApp(root: HTMLDivElement): () => void {
          root.innerHTML = decodeURIComponent(escape(atob('${btoa(unescape(encodeURIComponent(code)))}')));
        
          root.querySelectorAll('script').forEach((item) => {
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
        
          return () => {
            while (root.firstChild) {
              if (root.lastChild) {
                root.removeChild(root.lastChild);
              }
            }
          };
        }         
        `;
      esbuild.transform(transformedCode, {
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
          // If the document is still loading, schedule the code
          // only when the document has loaded.
          if (container.contentWindow?.document.readyState === 'complete') {
            container.contentWindow?.postMessage({
              code: dataUri,
              refresh: refreshKey,
            }, '*');
          } else {
            container.addEventListener('load', () => {
              container.contentWindow?.postMessage({
                code: dataUri,
                refresh: refreshKey,
              }, '*');
            });
          }
        }
      }).catch((err) => {
        onError(err);
      });

      const confirmLoad = () => {
        container.contentWindow?.removeEventListener('message', confirmLoad);
        onLoad?.();
      };

      container.contentWindow?.addEventListener('message', confirmLoad);

      return () => {
        mounted = false;
      };
    }

    return () => {
      mounted = false;
    };
  }, [code, title, onError, onLoad, container, environment, refreshKey]);

  return (
    <iframe
      title="Preview"
      ref={setContainer}
      className="w-full h-full"
      srcDoc={IFRAME}
    />
  );
}
