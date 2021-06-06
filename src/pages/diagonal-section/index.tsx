import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function DiagonalSection() {
  return (
    <div className="py-8 w-full h-full flex items-center justify-center">
      <div className="relative w-full h-64">
        <div className="absolute left-0 top-0 w-full h-full transform-gpu -skew-y-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-xl text-white z-10">Lorem Ipsum</span>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<DiagonalSection />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

export const VUE_3 = `
/** @jsx h */
import { h, createApp, defineComponent } from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const DiagonalSection = defineComponent({
  name: 'DiagonalSection',
  setup () {
    return () => (
      <div className="py-8 w-full h-full flex items-center justify-center">
        <div className="relative w-full h-64">
          <div className="absolute left-0 top-0 w-full h-full transform-gpu -skew-y-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-xl text-white z-10">Lorem Ipsum</span>
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(DiagonalSection);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function DiagonalSection() {
  return html\`
    <div class="py-8 w-full h-full flex items-center justify-center">
      <div class="relative w-full h-64">
        <div class="absolute left-0 top-0 w-full h-full transform-gpu -skew-y-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
        <div class="w-full h-full flex flex-col items-center justify-center">
          <span class="text-xl text-white z-10">Lorem Ipsum</span>
        </div>
      </div>
    </div>
  \`;
}

export default function renderApp(root) {
  render(DiagonalSection(), root);
}
`;

const PAGE: Page = {
  path: 'diagonal-section',
  title: 'Diagonal Section',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
