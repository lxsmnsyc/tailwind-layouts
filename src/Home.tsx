import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import PAGES from './pages';

interface PatternCardProps {
  title: string;
  href: string;
}

function PatternCard({ href, title }: PatternCardProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  return (
    <Link to={`/patterns/${href}`}>
      <a>
        <div className="rounded-lg shadow-lg border m-2 overflow-hidden">
          <div className="w-full h-auto border-b relative">
            <div className="w-[256px] h-[144px]">
              <iframe
                title={title}
                src={`/preview/${href}`}
                width="1024"
                height="768"
                className={`w-[512px] h-[288px] transform-gpu scale-50 origin-top-left transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => {
                  setLoading(false);
                }}
                frameBorder="0"
              />
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
          />
        ))}
      </div>
      <div className="flex-none px-8 py-4 w-full border-t">
        <span>
          {'MIT © '}
          <a href="https://github.com/lxsmnsyc">lxsmnsyc</a>
        </span>
      </div>
    </div>
  );
}
