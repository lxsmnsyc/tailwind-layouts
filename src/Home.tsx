import React, { lazy, Suspense, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { useEnvironmentState } from './components/Environment';
import PAGES from './pages';
import { Project } from './pages/types';

const Preview = lazy(() => import('./components/Preview'));

interface PatternCardProps {
  title: string;
  href: string;
  code: Project;
}

function PatternCard({ href, title, code }: PatternCardProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  const environment = useEnvironmentState();

  return (
    <Link to={`/patterns/${href}?environment=${environment}`}>
      <a className="w-full md:w-1/3 lg:w-1/4">
        <div className="rounded-lg shadow-lg border transition duration-200 dark:border-gray-800 m-2 overflow-hidden hover:scale-105 hover:text-gray-500 dark:hover:text-gray-400">
          <div className="w-full h-auto border-b transition-colors duration-200 dark:border-gray-800 relative overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <div className="absolute w-[200%] h-[200%] top-0 left-0 transform-gpu scale-50 origin-top-left">
                <Suspense fallback={null}>
                  <Preview
                    title={title}
                    code={code}
                    onLoad={() => {
                      setLoading(false);
                    }}
                  />
                </Suspense>
              </div>
            </div>
            {loading && <div className="absolute top-0 w-full h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
            <div className="absolute top-0 w-full h-full" />
          </div>
          <div className="p-4">
            <span>{title}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function Home(): JSX.Element {
  const [match] = useRoute('/');

  if (!match) {
    return <></>;
  }

  return (
    <div className="flex-1 w-full h-full flex flex-col">
      <div className="flex-1 flex flex-wrap px-8 pb-4 pt-2 items-center justify-start">
        {Object.values(PAGES).map((value) => (
          <PatternCard
            key={value.path}
            title={value.title}
            href={value.path}
            code={value.code}
          />
        ))}
      </div>
      <div className="flex-none px-8 py-4 w-full border-t dark:border-gray-800">
        <span>
          {'MIT © '}
          <a href="https://github.com/lxsmnsyc">lxsmnsyc</a>
        </span>
      </div>
    </div>
  );
}
