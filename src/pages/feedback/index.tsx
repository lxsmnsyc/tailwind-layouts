export const path = 'feedback';

export const title = 'Feedback';

export const code = `
export default function Feedback() {
  return (
    <div className="m-8 shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
      <div className="w-full border-b px-4 py-2 dark:border-gray-800">
        <label htmlFor="feedback" className="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold">Feedback</label>
        <textarea id="feedback" className="mt-2 w-full rounded p-2 outline-none ring-2 ring-purple-300 dark:ring-purple-700 focus-visible:ring-purple-500 dark:bg-black" />
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
            className="bg-purple-700 py-2 px-4 text-white rounded-lg hover:bg-purple-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
`;
