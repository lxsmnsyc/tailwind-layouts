import React, { lazy, Suspense, useState } from 'react';
import { Link, useRoute } from 'wouter';
import PAGES from './pages';

const Preview = lazy(() => import('./components/Preview'));

interface PatternCardProps {
  title: string;
  href: string;
  code: string;
}

function PatternCard({ href, title, code }: PatternCardProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  return (
    <Link to={`/patterns/${href}`}>
      <a>
        <div className="rounded-lg shadow-lg border dark:border-gray-800 m-2 overflow-hidden transition hover:scale-105 hover:text-gray-500 dark:hover:text-gray-400">
          <div className="w-full h-auto border-b dark:border-gray-800 relative overflow-hidden">
            <div className="w-[256px] h-[144px]">
              <div className={`w-[512px] h-[288px] transform-gpu scale-50 origin-top-left transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
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
