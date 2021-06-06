import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function AppWindow() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="shadow-lg w-full flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
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
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<AppWindow />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const AppWindow = defineComponent({
  name: 'AppWindow',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="shadow-lg w-full flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
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
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(AppWindow);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function AppWindow() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="shadow-lg w-full flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div class="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
          <div class="p-1 flex items-center justify-center">
            <div class="bg-red-500 m-1 w-3 h-3 rounded-full"></div>
            <div class="bg-yellow-500 m-1 w-3 h-3 rounded-full"></div>
            <div class="bg-green-500 m-1 w-3 h-3 rounded-full"></div>
          </div>
          <div class="w-full flex items-center justify-center absolute left-0">
            <span class="font-sans text-xs text-gray-500 dark:text-gray-400">Hello World</span>
          </div>
        </div>
        <div class="">
          <div class="p-4">
            <h1>Hello World</h1>
          </div>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(AppWindow(), root);
}
`;

const PAGE: Page = {
  path: 'app-window',
  title: 'App Window',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
