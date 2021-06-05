export const path = 'snippet';

export const title = 'Snippet';

export const code = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

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

function Snippet() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full border rounded-lg relative dark:border-gray-800">
        <div className="p-4 overflow-x-auto">
          <div className="font-mono text-sm whitespace-pre">
            {'() => <h1>Hello World</h1>'}
          </div>
        </div>
        <div className="absolute right-0 top-0 m-2">
          <button
            type="button"
            className="w-8 h-8 border dark:border-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 rounded p-1 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-500"
          >
            <span className="sr-only">Copy to clipboard</span>
            <Clipboard />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Snippet />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;
