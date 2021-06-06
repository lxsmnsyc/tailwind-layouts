import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Feedback() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
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
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Feedback />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Feedback = defineComponent({
  name: 'Feedback',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-full shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
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
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Feedback);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Feedback() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div class="w-full border-b px-4 py-2 dark:border-gray-800">
          <label htmlFor="feedback" class="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold">Feedback</label>
          <textarea id="feedback" class="mt-2 w-full rounded p-2 outline-none ring-2 ring-purple-300 dark:ring-purple-700 focus-visible:ring-purple-500 dark:bg-black"></textarea>
        </div>
        <div class="w-full flex items-center justify-between">
          <div class="m-2">
            <button
              type="button"
              class="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              🤩
            </button>
            <button
              type="button"
              class="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              😀
            </button>
            <button
              type="button"
              class="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              😕
            </button>
            <button
              type="button"
              class="bg-gray-100 dark:bg-gray-900 m-1 border p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 hover:border-gray-100 dark:border-gray-600 dark:hover:border-gray-700"
            >
              😭
            </button>
          </div>
          <div class="m-2">
            <button
              type="button"
              class="bg-purple-700 py-2 px-4 text-white rounded-lg hover:bg-purple-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(Feedback(), root);
}
`;

const PAGE: Page = {
  path: 'feedback',
  title: 'Feedback',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
