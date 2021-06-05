export const path = 'app-window';

export const title = 'App Window';

export const code = `
function AppWindow() {
  return (
    <div className="m-8 shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
      <div className="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
        <div className="p-1 flex items-center justify-center">
          <div className="bg-red-500 m-1 w-3 h-3 rounded-full" />
          <div className="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
          <div className="bg-green-500 m-1 w-3 h-3 rounded-full" />
        </div>
        <div className="w-full flex items-center justify-center absolute left-0">
          <span className="font-sans text-xs text-gray-500 dark:text-gray-400">Hello World</span>
        </div>
      </div>
      <div className="">
        <div className="p-4">
          <h1>Hello World</h1>
        </div>
      </div>
    </div>
  );
}

export default AppWindow;
`;
