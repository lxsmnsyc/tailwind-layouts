import React, {
  useState,
  Suspense,
} from 'react';
import ErrorBoundary from './ErrorBoundary';
import Compiler from './Compiler';
import FullLoader from './FullLoader';
import CompilerError from './CompilerError';
import { Project } from '../pages/types';
import { useEnvironmentState } from './Environment';

interface PreviewProps {
  title: string;
  code: Project;
  onLoad: () => void;
}

export default function Preview(
  { title, code, onLoad }: PreviewProps,
): JSX.Element {
  const [error, setError] = useState<Error>();
  const [, setRenderError] = useState<boolean>(false);
  const environment = useEnvironmentState();

  return (
    <div className="flex flex-col h-full w-full bg-white text-black dark:bg-black dark:text-white">
      <ErrorBoundary
        onError={(err) => {
          setRenderError(true);
          setError(err);
        }}
        fallback={error && <CompilerError error={error} />}
      >
        <Suspense fallback={<FullLoader />}>
          <Compiler
            title={title}
            code={code[environment]}
            onError={setError}
            onLoad={onLoad}
          />
        </Suspense>
      </ErrorBoundary>
      {
        error && <CompilerError error={error} />
      }
    </div>
  );
}
