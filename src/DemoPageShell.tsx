import * as esbuild from 'esbuild-wasm';
import React, {
  useState,
  useEffect,
  Suspense,
  ComponentType,
} from 'react';
import Editor from '@monaco-editor/react';
import { useRoute } from 'wouter';
import createResource from './utils/create-resource';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useDarkPreference } from './components/ThemeAdapter';

const esbuildResource = createResource(() => esbuild.initialize({
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.12.5/esbuild.wasm',
}));

function Fallback(): JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-blue-500 w-8 h-8">
        <Spinner />
      </div>
    </div>
  );
}

interface CompilerBaseProps {
  code?: string;
  title: string;
}

interface CompilerProps extends CompilerBaseProps {
  onError: (error: Error) => void;
}

interface ComponentExport {
  default: ComponentType;
}

function Compiler(
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

interface ErrorFallbackProps {
  error?: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps): JSX.Element {
  if (error == null) {
    return <></>;
  }
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75">
      <div className="flex items-center justify-center">
        <div className="m-4 w-3/4 p-4 font-mono rounded-lg bg-red-500 text-white">
          <div className="mb-2">
            <span className="text-lg">{`${error.name}: ${error.message}`}</span>
          </div>
          <p className="p-2 overflow-x-scroll bg-gray-900 rounded-lg whitespace-pre">
            {error.stack}
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoPageShellInternal(
  { title, code }: CompilerBaseProps,
): JSX.Element {
  const isDarkMode = useDarkPreference();

  const [state, setState] = useState<string | undefined>(code);
  const [error, setError] = useState<Error>();
  const [, setRenderError] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setState(code);
  }, [code]);

  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedState(state);
      setError(undefined);
      setRenderError((prev) => {
        if (prev) {
          setRetryKey((key) => key + 1);
        }
        return false;
      });
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <div className="overflow-hidden w-full flex-1 flex items-stretch justify-center flex-col">
      <div className="flex-none flex items-center justify-between border-b">
        <div className="p-4 font-bold text-xl">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="sm:flex-row flex-col-reverse overflow-hidden  flex-grow flex items-stretch justify-center">
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme={isDarkMode ? 'vs-dark' : 'light'}
            value={debouncedState}
            onChange={(value) => {
              setState(value);
            }}
            loading={<Fallback />}
          />
        </div>
        <div className="flex-1 overflow-scroll border-l relative">
          <ErrorBoundary
            key={retryKey}
            onError={(err) => {
              setRenderError(true);
              setError(err);
            }}
            fallback={error && <ErrorFallback error={error} />}
          >
            <Suspense fallback={<Fallback />}>
              <Compiler
                title={title}
                code={debouncedState}
                onError={setError}
              />
            </Suspense>
          </ErrorBoundary>
          {
            error && <ErrorFallback error={error} />
          }
        </div>
      </div>
    </div>
  );
}

interface DemoPageShellProps extends CompilerBaseProps {
  route: string;
}

export default function DemoPageShell(
  {
    title,
    code,
    route,
  }: DemoPageShellProps,
): JSX.Element {
  const [match] = useRoute(route);

  if (!match) {
    return <></>;
  }

  return (
    <DemoPageShellInternal
      title={title}
      code={code}
    />
  );
}
