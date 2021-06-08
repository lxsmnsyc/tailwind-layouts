import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Lock() {
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function Refresh() {
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
        strokeWidth="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function BrowserWindow() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full h-full overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
          <div className="p-1 flex items-center justify-center">
            <div className="bg-red-500 m-1 w-3 h-3 rounded-full" />
            <div className="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
            <div className="bg-green-500 m-1 w-3 h-3 rounded-full" />
          </div>
          <div className="w-full flex items-center justify-center absolute left-0">
            <a
              href="https://tailwindcss.com"
              className="text-xs bg-gray-100 dark:bg-gray-900 w-1/2 rounded-lg py-1 flex justify-between items-center"
            >
              <div className="flex items-center justify-center pl-4">
                <span className="text-green-500 w-4 h-4 mr-2"><Lock /></span>
                <span className="">{'tailwindcss.com'}</span>
              </div>
              <div className="flex pr-4">
                <span className="text-gray-500 w-4 h-4"><Refresh /></span>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full h-full relative">
          <iframe
            title="TaildwindCSS"
            src="https://tailwindcss.com"
            className={\`w-full h-full transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'} \`}
            onLoad={() => {
              setLoading(false);
            }}
          /> 
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<BrowserWindow />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

const PREACT = `
/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';

function Lock() {
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function Refresh() {
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
        strokeWidth="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function BrowserWindow() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full h-full overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
          <div className="p-1 flex items-center justify-center">
            <div className="bg-red-500 m-1 w-3 h-3 rounded-full" />
            <div className="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
            <div className="bg-green-500 m-1 w-3 h-3 rounded-full" />
          </div>
          <div className="w-full flex items-center justify-center absolute left-0">
            <a
              href="https://tailwindcss.com"
              className="text-xs bg-gray-100 dark:bg-gray-900 w-1/2 rounded-lg py-1 flex justify-between items-center"
            >
              <div className="flex items-center justify-center pl-4">
                <span className="text-green-500 w-4 h-4 mr-2"><Lock /></span>
                <span className="">{'tailwindcss.com'}</span>
              </div>
              <div className="flex pr-4">
                <span className="text-gray-500 w-4 h-4"><Refresh /></span>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full h-full relative">
          <iframe
            title="TaildwindCSS"
            src="https://tailwindcss.com"
            className={\`w-full h-full transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'} \`}
            onLoad={() => {
              setLoading(false);
            }}
          /> 
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<BrowserWindow />, root);

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

const Lock = defineComponent({
  name: 'Lock',
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    );
  },
});

const Refresh = defineComponent({
  name: 'Refresh',
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
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    );
  },
});

const BrowserWindow = defineComponent({
  name: 'BrowserWindow',
  setup () {
    const state = reactive({
      loading: true,
    });
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-full h-full overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
          <div className="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
            <div className="p-1 flex items-center justify-center">
              <div className="bg-red-500 m-1 w-3 h-3 rounded-full" />
              <div className="bg-yellow-500 m-1 w-3 h-3 rounded-full" />
              <div className="bg-green-500 m-1 w-3 h-3 rounded-full" />
            </div>
            <div className="w-full flex items-center justify-center absolute left-0">
              <a
                href="https://tailwindcss.com"
                className="text-xs bg-gray-100 dark:bg-gray-900 w-1/2 rounded-lg py-1 flex justify-between items-center"
              >
                <div className="flex items-center justify-center pl-4">
                  <span className="text-green-500 w-4 h-4 mr-2"><Lock /></span>
                  <span className="">{'tailwindcss.com'}</span>
                </div>
                <div className="flex pr-4">
                  <span className="text-gray-500 w-4 h-4"><Refresh /></span>
                </div>
              </a>
            </div>
          </div>
          <div className="w-full h-full relative">
            <iframe
              title="TaildwindCSS"
              src="https://tailwindcss.com"
              className={\`w-full h-full transition-opacity duration-200 \${state.loading ? 'opacity-0' : 'opacity-100'} \`}
              onLoad={() => {
                state.loading = false;
              }}
            /> 
            {state.loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(BrowserWindow);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render, svg } from 'https://cdn.skypack.dev/lit-html';

function Lock() {
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  \`;
}

function Refresh() {
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
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  \`;
}

function BrowserWindow() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full h-full overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div class="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
          <div class="p-1 flex items-center justify-center">
            <div class="bg-red-500 m-1 w-3 h-3 rounded-full"></div>
            <div class="bg-yellow-500 m-1 w-3 h-3 rounded-full"></div>
            <div class="bg-green-500 m-1 w-3 h-3 rounded-full"></div>
          </div>
          <div class="w-full flex items-center justify-center absolute left-0">
            <a
              href="https://tailwindcss.com"
              class="text-xs bg-gray-100 dark:bg-gray-900 w-1/2 rounded-lg py-1 flex justify-between items-center"
            >
              <div class="flex items-center justify-center pl-4">
                <span class="text-green-500 w-4 h-4 mr-2">\${Lock()}</span>
                <span class="">tailwindcss.com</span>
              </div>
              <div class="flex pr-4">
                <span class="text-gray-500 w-4 h-4">\${Refresh()}</span>
              </div>
            </a>
          </div>
        </div>
        <div class="w-full h-full relative">
          <iframe
            title="TaildwindCSS"
            src="https://tailwindcss.com"
            class="w-full h-full transition-opacity duration-200 opacity-0"
          >
          </iframe>
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
  root.querySelectorAll('iframe').forEach((el) => {
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
  render(BrowserWindow(), root);
  renderFallback(root);
}
`;

const PAGE: Page = {
  path: 'browser-window',
  title: 'Browser Window',
  code: {
    react: REACT,
    preact: PREACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
