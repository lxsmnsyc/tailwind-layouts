import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Button() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-start">
        <div className="m-2">
          <button
            type="button"
            class="bg-gray-800 py-1 px-2 text-white rounded text-sm hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="bg-gray-800 py-3 px-6 text-lg text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <div className="m-2">
          <button
            type="button"
            class="py-1 px-2 rounded text-sm transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="py-2 px-4 rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="py-3 px-6 text-lg rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Button />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

const PREACT = `
/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';

function Button() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-start">
        <div className="m-2">
          <button
            type="button"
            class="bg-gray-800 py-1 px-2 text-white rounded text-sm hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="bg-gray-800 py-3 px-6 text-lg text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <div className="m-2">
          <button
            type="button"
            class="py-1 px-2 rounded text-sm transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="py-2 px-4 rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div className="m-2">
          <button
            type="button"
            class="py-3 px-6 text-lg rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<Button />, root);

  return () => {
    render(null, root, result);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Button = defineComponent({
  name: 'Button',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-start">
          <div className="m-2">
            <button
              type="button"
              class="bg-gray-800 py-1 px-2 text-white rounded text-sm hover:bg-gray-700 active:bg-gray-600"
            >
              Button
            </button>
          </div>
          <div className="m-2">
            <button
              type="button"
              class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
            >
              Button
            </button>
          </div>
          <div className="m-2">
            <button
              type="button"
              class="bg-gray-800 py-3 px-6 text-lg text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
            >
              Button
            </button>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="m-2">
            <button
              type="button"
              class="py-1 px-2 rounded text-sm transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
            >
              Button
            </button>
          </div>
          <div className="m-2">
            <button
              type="button"
              class="py-2 px-4 rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
            >
              Button
            </button>
          </div>
          <div className="m-2">
            <button
              type="button"
              class="py-3 px-6 text-lg rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Button);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Button() {
  return html\` 
    <div class="p-8 w-full h-full flex items-center justify-center flex-col">
      <div class="flex items-center justify-start">
        <div class="m-2">
          <button
            type="button"
            class="bg-gray-800 py-1 px-2 text-white rounded text-sm hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="bg-gray-800 py-3 px-6 text-lg text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
      </div>
      <div class="flex items-center justify-start">
        <div class="m-2">
          <button
            type="button"
            class="py-1 px-2 rounded text-sm transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="py-2 px-4 rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="py-3 px-6 text-lg rounded-lg transition-colors duration-300 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-50 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(Button(), root);
}
`;

const PAGE: Page = {
  path: 'button',
  title: 'Button',
  code: {
    react: REACT,
    preact: PREACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
