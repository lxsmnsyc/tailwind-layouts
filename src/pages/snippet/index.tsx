import React from 'react';
import DemoPageShell from '../../DemoPageShell';

const CODE = `

function Clipboard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

export default function Snippet() {
  return (
    <div className="m-8 border rounded-lg relative">
      <div className="p-4 overflow-x-scroll">
        <div className="font-mono text-sm whitespace-pre">
          {'() => <h1>Hello World</h1>'}
        </div>
      </div>
      <div className="absolute right-0 top-0 m-2">
        <button
          type="button"
          className="w-8 h-8 border text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-200 rounded p-1 hover:border-gray-200 dark:hover:border-gray-300 hover:text-gray-400 dark:hover:text-gray-500"
        >
          <Clipboard />
        </button>
      </div>
    </div>
  );
}
`;

export default function SnippetPattern(): JSX.Element {
  return (
    <DemoPageShell
      title="Snippet"
      code={CODE}
      
      route="/patterns/snippet"
    />
  );
}
