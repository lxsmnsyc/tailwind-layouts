import { Page } from '../types';

const HTML = `
<div id="lightbox" class="p-8 w-full h-full flex items-center justify-center">
  <div
    class="w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative"
  >
    <img
      alt="Forest"
      src="https://source.unsplash.com/1200x630/?forest"
      width="1200"
      height="630"
      class="w-full h-auto transition-opacity duration-200 opacity-0"
    />
  </div>
</div>
<script type="text/javascript">
  function renderFallback(root) {
    root.querySelectorAll('img').forEach((el) => {
      if (!el.complete) {
        const fallback = document.createElement('div');
    
        fallback.innerHTML = \`
          <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
          </div>
        \`;
    
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

  function createLightbox(root) {
    const el = root.querySelector('img');
  
    const container = el.parentNode;
  
    let expanded = false;
  
    container.addEventListener('click', () => {
      if (expanded) {
        container.classList.remove(...'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50'.split(' '));
        container.classList.add('relative');
      } else {
        container.classList.remove('relative');
        container.classList.add(...'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50'.split(' '));
      }
      expanded = !expanded;
    });
  }

  renderFallback(document.getElementById('lightbox'));
  createLightbox(document.getElementById('lightbox'));
</script>
`;

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Lightbox() {
  const [loading, setLoading] = React.useState(true);
  const [expand, setExpand] = React.useState(false);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div
        className={\`w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg \${expand ? 'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50' : 'relative'}\`}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <img
          alt="Forest"
          src="https://source.unsplash.com/1200x630/?forest"
          width="1200"
          height="630"
          className={\`w-full h-auto transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'}\`}
          onLoad={() => {
            setLoading(false);
          }}
        />
        {loading && <div className="w-full absolute h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Lightbox />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

const PREACT = `
/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';

function Lightbox() {
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div
        className={\`w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg \${expand ? 'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50' : 'relative'}\`}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <img
          alt="Forest"
          src="https://source.unsplash.com/1200x630/?forest"
          width="1200"
          height="630"
          className={\`w-full h-auto transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'}\`}
          onLoad={() => {
            setLoading(false);
          }}
        />
        {loading && <div className="w-full absolute h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<Lightbox />, root);

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

const Lightbox = defineComponent({
  name: 'Lightbox',
  setup () {
    const state = reactive({
      expand: false,
      loading: true,
    });
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div
          className={\`w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg \${state.expand ? 'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50' : 'relative'}\`}
          onClick={() => {
            state.expand = !state.expand;
          }}
        >
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={\`w-full h-auto transition-opacity duration-200 \${state.loading ? 'opacity-0' : 'opacity-100'}\`}
            onLoad={() => {
              state.loading = false;
            }}
          />
          {state.loading && <div className="w-full absolute h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(Lightbox);

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

function Lightbox() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div
        class="w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative"
      >
        <img
          alt="Forest"
          src="https://source.unsplash.com/1200x630/?forest"
          width="1200"
          height="630"
          class="w-full h-auto transition-opacity duration-200 opacity-0"
        />
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

function createLightbox(root) {
  const el = root.querySelector('img');

  const container = el.parentNode;

  let expanded = false;

  container.addEventListener('click', () => {
    if (expanded) {
      container.classList.remove(...'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50'.split(' '));
      container.classList.add('relative');
    } else {
      container.classList.remove('relative');
      container.classList.add(...'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50'.split(' '));
    }
    expanded = !expanded;
  });
}

export default function renderApp(root) {
  render(Lightbox(), root);
  renderFallback(root);
  createLightbox(root);
}
`;

const PAGE: Page = {
  path: 'lightbox',
  title: 'Lightbox',
  code: {
    html: HTML,
    react: REACT,
    preact: PREACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
