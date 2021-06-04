import React, {
  useState,
  useEffect,
  Suspense,
} from 'react';
import Editor from '@monaco-editor/react';
import ErrorBoundary from './components/ErrorBoundary';
import { useDarkPreference } from './components/ThemeAdapter';
import Compiler, { CompilerBaseProps } from './components/Compiler';
import FullLoader from './components/FullLoader';
import CompilerError from './components/CompilerError';

export default function DemoPageShell(
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
    <div className="overflow-hidden w-full h-screen flex-1 flex items-stretch justify-center flex-col">
      <div className="flex-none flex items-center justify-between border-b dark:border-gray-900">
        <div className="p-4 font-bold text-xl">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="sm:flex-row flex-col-reverse overflow-hidden flex-grow flex items-stretch justify-center">
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme={isDarkMode ? 'vs-dark' : 'light'}
            defaultValue={code}
            onChange={(value) => {
              setState(value);
            }}
            loading={<FullLoader />}
          />
        </div>
        <div className="flex-1 overflow-scroll border-b dark:border-gray-900 md:border-l relative">
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
      </div>
    </div>
  );
}
