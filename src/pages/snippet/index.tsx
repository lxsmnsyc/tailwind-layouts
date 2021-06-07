import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Clipboard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function Snippet() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full border rounded-lg relative dark:border-gray-800">
        <div className="p-4 overflow-x-auto">
          <div className="font-mono text-sm whitespace-pre">
            {'() => <h1>Hello World</h1>'}
          </div>
        </div>
        <div className="absolute right-0 top-0 m-2">
          <button
            type="button"
            className="w-8 h-8 border dark:border-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 rounded p-1 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-500"
          >
            <span className="sr-only">Copy to clipboard</span>
            <Clipboard />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Snippet />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

const PREACT = `
/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';

function Clipboard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function Snippet() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full border rounded-lg relative dark:border-gray-800">
        <div className="p-4 overflow-x-auto">
          <div className="font-mono text-sm whitespace-pre">
            {'() => <h1>Hello World</h1>'}
          </div>
        </div>
        <div className="absolute right-0 top-0 m-2">
          <button
            type="button"
            className="w-8 h-8 border dark:border-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 rounded p-1 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-500"
          >
            <span className="sr-only">Copy to clipboard</span>
            <Clipboard />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<Snippet />, root);

  return () => {
    render(null, root, result);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Clipboard = defineComponent({
  name: 'Clipboard',
  setup () {
    return () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    );
  }
});

const Snippet = defineComponent({
  name: 'Snippet',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-full border rounded-lg relative dark:border-gray-800">
          <div className="p-4 overflow-x-auto">
            <div className="font-mono text-sm whitespace-pre">
              {'() => <h1>Hello World</h1>'}
            </div>
          </div>
          <div className="absolute right-0 top-0 m-2">
            <button
              type="button"
              className="w-8 h-8 border dark:border-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 rounded p-1 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-500"
            >
              <span className="sr-only">Copy to clipboard</span>
              <Clipboard />
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Snippet);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, svg, render } from 'https://cdn.skypack.dev/lit-html';

function Clipboard() {
  return svg\`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  \`;
}

function Snippet() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full border rounded-lg relative dark:border-gray-800">
        <div class="p-4 overflow-x-auto">
          <div class="font-mono text-sm whitespace-pre">\${'() => <h1>Hello World</h1>'}</div>
        </div>
        <div class="absolute right-0 top-0 m-2">
          <button
            type="button"
            class="w-8 h-8 border dark:border-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 rounded p-1 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-500"
          >
            <span class="sr-only">Copy to clipboard</span>
            \${Clipboard()}
          </button>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(Snippet(), root);
}
`;

const PAGE: Page = {
  path: 'snippet',
  title: 'Snippet',
  code: {
    react: REACT,
    preact: PREACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
