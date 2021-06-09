/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@next/dist/vue.esm-browser.js';

const Tag = defineComponent({
  name: 'Tag',
  setup() {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-start">
          <div className="m-2 border border-gray-400 dark:border-gray-500 rounded-full relative bg-gray-200 dark:bg-gray-700">
            <div className="px-2 py-1 text-xs text-gray-700 dark:text-gray-200 font-semibold">
              Neutral tag
            </div>
          </div>
          <div className="m-2 border border-gray-400 dark:border-gray-500 rounded-full relative">
            <div className="px-2 py-1 text-xs text-gray-700 dark:text-gray-200 font-semibold">
              Neutral tag
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="m-2 border border-blue-400 dark:border-blue-500 rounded-full relative bg-blue-200 dark:bg-blue-700">
            <div className="px-2 py-1 text-xs text-blue-700 dark:text-blue-200 font-semibold">
              Information tag
            </div>
          </div>
          <div className="m-2 border border-blue-400 dark:border-blue-500 rounded-full relative">
            <div className="px-2 py-1 text-xs text-blue-700 dark:text-blue-200 font-semibold">
              Information tag
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="m-2 border border-green-400 dark:border-green-500 rounded-full relative bg-green-200 dark:bg-green-700">
            <div className="px-2 py-1 text-xs text-green-700 dark:text-blue-200 font-semibold">
              Positive tag
            </div>
          </div>
          <div className="m-2 border border-green-400 dark:border-green-500 rounded-full relative">
            <div className="px-2 py-1 text-xs text-green-700 dark:text-green-200 font-semibold">
              Positive tag
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="m-2 border border-yellow-400 dark:border-yellow-500 rounded-full relative bg-yellow-200 dark:bg-yellow-700">
            <div className="px-2 py-1 text-xs text-yellow-700 dark:text-yellow-200 font-semibold">
              Warning tag
            </div>
          </div>
          <div className="m-2 border border-yellow-400 dark:border-yellow-500 rounded-full relative">
            <div className="px-2 py-1 text-xs text-yellow-700 dark:text-yellow-200 font-semibold">
              Warning tag
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="m-2 border border-red-400 dark:border-red-500 rounded-full relative bg-red-200 dark:bg-red-700">
            <div className="px-2 py-1 text-xs text-red-700 dark:text-red-200 font-semibold">
              Negative tag
            </div>
          </div>
          <div className="m-2 border border-red-400 dark:border-red-500 rounded-full relative">
            <div className="px-2 py-1 text-xs text-red-700 dark:text-red-200 font-semibold">
              Negative tag
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default function renderApp(root: HTMLDivElement): () => void {
  const app = createApp(Tag);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
