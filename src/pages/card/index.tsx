import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Card() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-center border-b dark:border-gray-800">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className="w-full h-auto"
          />
        </div>
        <div className="p-4 w-full border-b dark:border-gray-800">
          <span className="text-xl">Lorem Ipsum</span>
          <p className="py-1 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed est viverra ex tincidunt vehicula. Donec pellentesque diam sit amet mi ullamcorper, ac finibus lorem scelerisque.
          </p>
        </div>
        <div className="p-4 w-full flex items-center justify-start flex-row-reverse">
          <button
            type="button"
            className="text-purple-500 hover:text-purple-400"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Card />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Card = defineComponent({
  name: 'Card',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
          <div className="w-full flex items-center justify-center border-b dark:border-gray-800">
            <img
              alt="Forest"
              src="https://source.unsplash.com/1200x630/?forest"
              width="1200"
              height="630"
              className="w-full h-auto"
            />
          </div>
          <div className="p-4 w-full border-b dark:border-gray-800">
            <span className="text-xl">Lorem Ipsum</span>
            <p className="py-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed est viverra ex tincidunt vehicula. Donec pellentesque diam sit amet mi ullamcorper, ac finibus lorem scelerisque.
            </p>
          </div>
          <div className="p-4 w-full flex items-center justify-start flex-row-reverse">
            <button
              type="button"
              className="text-purple-500 hover:text-purple-400"
            >
              Action
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Card);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Card() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div class="w-full flex items-center justify-center border-b dark:border-gray-800">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            class="w-full h-auto"
          />
        </div>
        <div class="p-4 w-full border-b dark:border-gray-800">
          <span class="text-xl">Lorem Ipsum</span>
          <p class="py-1 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed est viverra ex tincidunt vehicula. Donec pellentesque diam sit amet mi ullamcorper, ac finibus lorem scelerisque.
          </p>
        </div>
        <div class="p-4 w-full flex items-center justify-start flex-row-reverse">
          <button
            type="button"
            class="text-purple-500 hover:text-purple-400"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(Card(), root);
}
`;

const PAGE: Page = {
  path: 'card',
  title: 'Card',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
