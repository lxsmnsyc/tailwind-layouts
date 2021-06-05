export const path = 'browser-window';

export const title = 'Browser Window';

export const code = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Lock() {
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function Refresh() {
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
        strokeWidth="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function BrowserWindow() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full h-full overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
          <div className="p-1 flex items-center justify-center">
            <div className="bg-red-500 m-1 w-3 h-3 rounded-full" />
            <div className="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
            <div className="bg-green-500 m-1 w-3 h-3 rounded-full" />
          </div>
          <div className="w-full flex items-center justify-center absolute left-0">
            <a
              href="https://tailwindcss.com"
              className="text-xs bg-gray-100 dark:bg-gray-900 w-1/2 rounded-lg py-1 flex justify-between items-center"
            >
              <div className="flex items-center justify-center pl-4">
                <span className="text-green-500 w-4 h-4 mr-2"><Lock /></span>
                <span className="">{'tailwindcss.com'}</span>
              </div>
              <div className="flex pr-4">
                <span className="text-gray-500 w-4 h-4"><Refresh /></span>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full h-full">
          <iframe
            title="TaildwindCSS"
            src="https://tailwindcss.com"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<BrowserWindow />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;
