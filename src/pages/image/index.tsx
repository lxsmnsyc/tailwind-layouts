import { Page } from '../types';

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Image() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={\`w-full h-auto transition-opacity duration-300 \${loading ? 'opacity-0' : 'opacity-100'} \`}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
        <div className="w-full p-2 flex items-center justify-center">
          <span className="text-xs">Source: Unsplash</span>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Image />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
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

const Image = defineComponent({
  name: 'Image',
  setup () {
    const state = reactive({
      loading: true,
    });
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center flex-col">
          <div className="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
            <img
              alt="Forest"
              src="https://source.unsplash.com/1200x630/?forest"
              width="1200"
              height="630"
              className={\`w-full h-auto transition-opacity duration-300 \${state.loading ? 'opacity-0' : 'opacity-100'} \`}
              onLoad={() => {
                state.loading = false;
              }}
            />
            {state.loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
          </div>
          <div className="w-full p-2 flex items-center justify-center">
            <span className="text-xs">Source: Unsplash</span>
          </div>
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Image);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
`;

const LIT_HTML = `
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Fallback() {
  return html\`
    <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
    </div>
  \`;
}

function Image() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full flex items-center justify-center flex-col">
        <div class="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            class="w-full h-auto transition-opacity duration-300 opacity-0"
          />
        </div>
        <div class="w-full p-2 flex items-center justify-center">
          <span class="text-xs">Source: Unsplash</span>
        </div>
      </div>
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
  render(Image(), root);
  renderFallback(root);
}
`;

const PAGE: Page = {
  path: 'image',
  title: 'Image',
  code: {
    react: REACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
