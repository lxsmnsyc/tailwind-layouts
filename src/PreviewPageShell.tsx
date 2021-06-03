import React, {
  useState,
  useEffect,
  Suspense,
} from 'react';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import Compiler, { CompilerBaseProps } from './components/Compiler';

function Fallback(): JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-blue-500 w-8 h-8">
        <Spinner />
      </div>
    </div>
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

export default function PreviewPageShell(
  { title, code }: CompilerBaseProps,
): JSX.Element {
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
    <div className="flex flex-col h-screen w-screen bg-white text-black dark:bg-black dark:text-white">
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
  );
}
