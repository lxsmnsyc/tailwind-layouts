import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Navbar() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full border dark:border-gray-800 flex items-center justify-between shadow-lg">
        <div className="p-4">
          <a href="#" className="text-xl font-bold">
            Title
          </a>
        </div>
        <div className="flex p-2 text-sm font-semibold">
          <a href="#" className="p-2">
            Page 1
          </a>
          <a href="#" className="p-2">
            Page 2
          </a>
          <a href="#" className="p-2">
            Page 3
          </a>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Navbar />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Navbar = defineComponent({
  name: 'NavBar',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-full border dark:border-gray-800 flex items-center justify-between shadow-lg">
          <div className="p-4">
            <a href="#" className="text-xl font-bold">
              Title
            </a>
          </div>
          <div className="flex p-2 text-sm font-semibold">
            <a href="#" className="p-2">
              Page 1
            </a>
            <a href="#" className="p-2">
              Page 2
            </a>
            <a href="#" className="p-2">
              Page 3
            </a>
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Navbar);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Navbar() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full border dark:border-gray-800 flex items-center justify-between shadow-lg">
        <div class="p-4">
          <a href="#" class="text-xl font-bold">
            Title
          </a>
        </div>
        <div class="flex p-2 text-sm font-semibold">
          <a href="#" class="p-2">
            Page 1
          </a>
          <a href="#" class="p-2">
            Page 2
          </a>
          <a href="#" class="p-2">
            Page 4
          </a>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(Navbar(), root);
}
`;

const PAGE: Page = {
  path: 'navbar',
  title: 'Navbar',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
