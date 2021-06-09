import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Button() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-start">
        <div className="m-2">
          <button
            type="button"
            className="bg-gray-800 py-1 px-2 text-white rounded text-sm hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            className="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            className="bg-gray-800 py-3 px-6 text-lg text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <div className="m-2">
          <button
            type="button"
            className="py-1 px-2 rounded text-sm transition-colors duration-200 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            className="py-2 px-4 rounded-lg transition-colors duration-200 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            className="py-3 px-6 text-lg rounded-lg transition-colors duration-200 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root: HTMLDivElement): () => void {
  ReactDOM.render(<Button />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
