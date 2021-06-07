import React, {
  useState,
  Suspense,
  useEffect,
  useRef,
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

function PreviewInternal(
  { title, code, onLoad }: PreviewProps,
): JSX.Element {
  const [error, setError] = useState<Error>();
  const [, setRenderError] = useState<boolean>(false);
  const environment = useEnvironmentState();

  return (
    <>
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
    </>
  );
}

export default function Preview(
  { title, code, onLoad }: PreviewProps,
): JSX.Element {
  const visible = useRef(false);
  const [visibleOnce, setVisibleOnce] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);

  const environment = useEnvironmentState();

  useEffect(() => {
    setVisibleOnce(visible.current);
  }, [environment]);

  useEffect(() => {
    const { current } = container;
    if (!current) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === current) {
          visible.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            setVisibleOnce(true);
          }
        }
      });
    });

    observer.observe(current);

    return () => {
      observer.unobserve(current);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={container}
      className="flex flex-col h-full w-full bg-white text-black dark:bg-black dark:text-white"
    >
      {
        visibleOnce && (
          <PreviewInternal
            title={title}
            code={code}
            onLoad={onLoad}
          />
        )
      }
    </div>
  );
}
