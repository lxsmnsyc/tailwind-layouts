import React, { ReactNode } from 'react';
import { Link } from 'wouter';
import DarkModeToggle from './components/DarkModeToggle';
import Github from './components/Github';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps): JSX.Element {
  return (
    <div className="flex flex-col w-full h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex-none flex flex-row justify-between items-center border-b">
        <div className="p-4">
          <Link to="/">
            <a className="text-2xl font-bold">Tailwind Layouts</a>
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
