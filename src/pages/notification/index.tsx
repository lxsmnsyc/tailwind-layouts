export const path = 'notification';

export const title = 'Notification';

export const code = `
export default function Notification() {
  return (
    <div className="m-2 flex flex-col">
      <div className="m-2 border border-gray-400 dark:border-gray-500 rounded-lg relative bg-gray-200 dark:bg-gray-700">
        <div className="p-4 text-sm text-gray-600 dark:text-gray-300 font-semibold">
          Neutral notification
        </div>
      </div>
      <div className="m-2 border border-blue-500 rounded-lg relative bg-blue-700">
        <div className="p-4 text-sm text-blue-300 font-semibold">
          Informative notification
        </div>
      </div>
      <div className="m-2 border border-green-500 rounded-lg relative bg-green-700">
        <div className="p-4 text-sm text-green-300 font-semibold">
          Positive notification
        </div>
      </div>
      <div className="m-2 border border-yellow-500 rounded-lg relative bg-yellow-700">
        <div className="p-4 text-sm text-yellow-300 font-semibold">
          Warning notification
        </div>
      </div>
      <div className="m-2 border border-red-500 rounded-lg relative bg-red-700">
        <div className="p-4 text-sm text-red-300 font-semibold">
          Negative notification
        </div>
      </div>
    </div>
  );
}
`;
