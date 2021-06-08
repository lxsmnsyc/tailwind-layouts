/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';

function Feedback() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full border-b px-4 py-2 dark:border-gray-800">
          <label htmlFor="feedback" className="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold">Feedback</label>
          <textarea
            id="feedback"
            className="mt-2 w-full rounded p-2 outline-none ring-2 ring-gray-300 dark:ring-gray-700 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 dark:bg-black"
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="m-2">
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              🤩
            </button>
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              😀
            </button>
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              😕
            </button>
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              😭
            </button>
          </div>
          <div className="m-2">
            <button
              type="button"
              className="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<Feedback />, root);

  return () => {
    render(null, root, result);
  };
}
