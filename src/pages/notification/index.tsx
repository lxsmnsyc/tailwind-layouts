import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Notification() {
  return (
    <div className="m-2 flex flex-col">
      <div className="m-2 border border-gray-400 dark:border-gray-500 rounded-lg relative bg-gray-200 dark:bg-gray-700">
        <div className="p-4 text-sm text-gray-700 dark:text-gray-200 font-semibold">
          Neutral notification
        </div>
      </div>
      <div className="m-2 border border-blue-500 rounded-lg relative bg-blue-700">
        <div className="p-4 text-sm text-blue-200 font-semibold">
          Informative notification
        </div>
      </div>
      <div className="m-2 border border-green-500 rounded-lg relative bg-green-700">
        <div className="p-4 text-sm text-green-200 font-semibold">
          Positive notification
        </div>
      </div>
      <div className="m-2 border border-yellow-500 rounded-lg relative bg-yellow-700">
        <div className="p-4 text-sm text-yellow-200 font-semibold">
          Warning notification
        </div>
      </div>
      <div className="m-2 border border-red-500 rounded-lg relative bg-red-700">
        <div className="p-4 text-sm text-red-200 font-semibold">
          Negative notification
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Notification />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Notification = defineComponent({
  name: 'Notification',
  setup () {
    return () => (
      <div className="m-2 flex flex-col">
        <div className="m-2 border border-gray-400 dark:border-gray-500 rounded-lg relative bg-gray-200 dark:bg-gray-700">
          <div className="p-4 text-sm text-gray-700 dark:text-gray-200 font-semibold">
            Neutral notification
          </div>
        </div>
        <div className="m-2 border border-blue-500 rounded-lg relative bg-blue-700">
          <div className="p-4 text-sm text-blue-200 font-semibold">
            Informative notification
          </div>
        </div>
        <div className="m-2 border border-green-500 rounded-lg relative bg-green-700">
          <div className="p-4 text-sm text-green-200 font-semibold">
            Positive notification
          </div>
        </div>
        <div className="m-2 border border-yellow-500 rounded-lg relative bg-yellow-700">
          <div className="p-4 text-sm text-yellow-200 font-semibold">
            Warning notification
          </div>
        </div>
        <div className="m-2 border border-red-500 rounded-lg relative bg-red-700">
          <div className="p-4 text-sm text-red-200 font-semibold">
            Negative notification
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Notification);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Notification() {
  return html\`
    <div class="m-2 flex flex-col">
      <div class="m-2 border border-gray-400 dark:border-gray-500 rounded-lg relative bg-gray-200 dark:bg-gray-700">
        <div class="p-4 text-sm text-gray-700 dark:text-gray-200 font-semibold">
          Neutral notification
        </div>
      </div>
      <div class="m-2 border border-blue-500 rounded-lg relative bg-blue-700">
        <div class="p-4 text-sm text-blue-200 font-semibold">
          Informative notification
        </div>
      </div>
      <div class="m-2 border border-green-500 rounded-lg relative bg-green-700">
        <div class="p-4 text-sm text-green-200 font-semibold">
          Positive notification
        </div>
      </div>
      <div class="m-2 border border-yellow-500 rounded-lg relative bg-yellow-700">
        <div class="p-4 text-sm text-yellow-200 font-semibold">
          Warning notification
        </div>
      </div>
      <div class="m-2 border border-red-500 rounded-lg relative bg-red-700">
        <div class="p-4 text-sm text-red-200 font-semibold">
          Negative notification
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(Notification(), root);
}
`;

const PAGE: Page = {
  path: 'notification',
  title: 'Notification',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
