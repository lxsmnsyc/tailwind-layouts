import React, { lazy, Suspense } from 'react';
import Compiler from './Compiler';
import CompilerError from './CompilerError';
import { useEnvironmentState } from './Environment';
import ErrorBoundary from './ErrorBoundary';
import FullLoader from './FullLoader';
import {
  usePlaygroundError,
  usePlaygroundTitle,
  usePlaygroundDebouncedCode,
  usePlaygroundRetryKey,
  usePlaygroundRenderError,
} from './PlaygroundModel';

const PlaygroundMonacoEditor = lazy(() => import('./PlaygroundMonacoEditor'));
const PlaygroundCodejarEditor = lazy(() => import('./PlaygroundMobileEditor'));

function PlaygroundError(): JSX.Element {
  const { value } = usePlaygroundError();

  if (value) {
    return <CompilerError error={value} />;
  }

  return <></>;
}

function PlaygroundView(): JSX.Element {
  const environment = useEnvironmentState();
  const title = usePlaygroundTitle();
  const { dispatch: setError } = usePlaygroundError();
  const { value: debouncedCode } = usePlaygroundDebouncedCode();

  return (
    <Suspense fallback={<FullLoader />}>
      <Compiler
        title={title}
        code={debouncedCode[environment]}
        onError={setError}
      />
    </Suspense>
  );
}

interface PlaygroundContentProps {
  isDesktop: boolean;
}

export default function PlaygroundContent(
  { isDesktop }: PlaygroundContentProps,
): JSX.Element {
  const retryKey = usePlaygroundRetryKey();
  const setRenderError = usePlaygroundRenderError();
  const { dispatch: setError } = usePlaygroundError();

  if (isDesktop) {
    return (
      <>
        <div className="relative">
          <div className="w-full h-full absolute">
            <Suspense fallback={<FullLoader />}>
              <PlaygroundMonacoEditor />
            </Suspense>
          </div>
        </div>
        <div className="border-b dark:border-gray-800 md:border-l relative">
          <div className="w-full h-full absolute overflow-auto">
            <ErrorBoundary
              key={retryKey}
              onError={(err) => {
                setRenderError(true);
                setError(err);
              }}
              fallback={<PlaygroundError />}
            >
              <PlaygroundView />
            </ErrorBoundary>
            <PlaygroundError />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border-b dark:border-gray-800 md:border-l relative">
        <div className="w-full h-full absolute overflow-auto">
          <ErrorBoundary
            key={retryKey}
            onError={(err) => {
              setRenderError(true);
              setError(err);
            }}
            fallback={<PlaygroundError />}
          >
            <PlaygroundView />
          </ErrorBoundary>
          <PlaygroundError />
        </div>
      </div>
      <div className="relative">
        <div className="w-full h-full absolute">
          <Suspense fallback={<FullLoader />}>
            <PlaygroundCodejarEditor />
          </Suspense>
        </div>
      </div>
    </>
  );
}
