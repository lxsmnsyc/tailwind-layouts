import React, { ReactNode } from 'react';
import { Link } from 'wouter';
import DarkModeToggle from './components/DarkModeToggle';
import Github from './components/Github';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps): JSX.Element {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="sticky top-0 z-50 flex flex-row justify-between items-center border-b dark:border-gray-800 backdrop-filter backdrop-blur">
        <div className="p-4">
          <Link to="/">
            <a className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300">Tailwind Layouts</a>
          </Link>
        </div>
        <div className="flex flex-row px-2">
          <DarkModeToggle />
          <Github />
        </div>
      </div>
      {children}
    </div>
  );
}
