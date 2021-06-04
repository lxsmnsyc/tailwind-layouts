import React, {
  useState,
  useEffect,
  Suspense,
} from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Compiler, { CompilerBaseProps } from './components/Compiler';
import FullLoader from './components/FullLoader';
import CompilerError from './components/CompilerError';

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
        fallback={error && <CompilerError error={error} />}
      >
        <Suspense fallback={<FullLoader />}>
          <Compiler
            title={title}
            code={debouncedState}
            onError={setError}
          />
        </Suspense>
      </ErrorBoundary>
      {
        error && <CompilerError error={error} />
      }
    </div>
  );
}
