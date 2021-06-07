import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Card() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-center border-b dark:border-gray-800 relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={\`w-full h-auto transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'} \`}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
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
            className="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700"
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

const PREACT = `
/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';

function Card() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-center border-b dark:border-gray-800 relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={\`w-full h-auto transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'} \`}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
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
            className="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<Card />, root);

  return () => {
    render(null, root, result);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import {
  h,
  createApp,
  defineComponent,
  reactive,
} from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Card = defineComponent({
  name: 'Card',
  setup () {
    const state = reactive({
      loading: true,
    });

    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
          <div className="w-full flex items-center justify-center border-b dark:border-gray-800 relative">
            <img
              alt="Forest"
              src="https://source.unsplash.com/1200x630/?forest"
              width="1200"
              height="630"
              className={\`w-full h-auto transition-opacity duration-200 \${state.loading ? 'opacity-0' : 'opacity-100'} \`}
              onLoad={() => {
                state.loading = false;
              }}
            />
            {state.loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
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
              className="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700"
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
        <div class="w-full flex items-center justify-center border-b dark:border-gray-800 relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            class="w-full h-auto transition-opacity duration-200 opacity-0"
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
            class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  \`;
}

function Fallback() {
  return html\`
    <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
    </div>
  \`;
}

function renderFallback(root) {
  root.querySelectorAll('img').forEach((el) => {
    if (!el.complete) {
      const fallback = document.createElement('div');
  
      render(Fallback(), fallback);
  
      el.parentNode.appendChild(fallback);
  
      el.addEventListener('load', () => {
        el.classList.remove('opacity-0');
        el.classList.add('opacity-100');
  
        el.parentNode.removeChild(fallback);
      });
    } else {
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
    }
  });
}

export default function renderApp(root) {
  render(Card(), root);
  renderFallback(root);
}
`;

const PAGE: Page = {
  path: 'card',
  title: 'Card',
  code: {
    react: REACT,
    preact: PREACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
