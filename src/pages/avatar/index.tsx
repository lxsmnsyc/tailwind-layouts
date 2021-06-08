import { Page } from '../types';

const HTML = `
<div id="avatar" class="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
  <div class="w-32 h-32 m-1">
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src="https://source.unsplash.com/256x256"
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  </div>
  <div class="w-24 h-24 m-1">
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src="https://source.unsplash.com/256x256"
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  </div>
  <div class="w-16 h-16 m-1">
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src="https://source.unsplash.com/256x256"
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  </div>
  <div class="w-12 h-12 m-1">
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src="https://source.unsplash.com/256x256"
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  </div>
  <div class="w-8 h-8 m-1">
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src="https://source.unsplash.com/256x256"
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  </div>
  <div class="w-4 h-4 m-1">
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src="https://source.unsplash.com/256x256"
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
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

  renderFallback(document.getElementById('avatar'));
</script>
`;

const REACT = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Avatar({ src }) {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src={src}
        width="256"
        height="256"
        className={\`w-full h-auto transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'} \`}
        onLoad={() => {
          setLoading(false);
        }}
      />
      {loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
      <div className="w-32 h-32 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-24 h-24 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-16 h-16 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-12 h-12 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-8 h-8 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-4 h-4 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<AvatarDemo />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;

const PREACT = `
/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';

function Avatar({ src }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src={src}
        width="256"
        height="256"
        className={\`w-full h-auto transition-opacity duration-200 \${loading ? 'opacity-0' : 'opacity-100'} \`}
        onLoad={() => {
          setLoading(false);
        }}
      />
      {loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
      <div className="w-32 h-32 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-24 h-24 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-16 h-16 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-12 h-12 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-8 h-8 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-4 h-4 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<AvatarDemo />, root);

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
  toRefs,
} from 'https://cdn.skypack.dev/vue@3.0.11/dist/vue.esm-browser.js';

const Avatar = defineComponent({
  name: 'Avatar',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const { src } = toRefs(props);
    const state = reactive({
      loading: true,
    });
    return () => (
      <div className="relative rounded-full w-full h-full overflow-hidden shadow">
        <img
          alt="Avatar"
          src={src.value}
          width="256"
          height="256"
          className={\`w-full h-auto transition-opacity duration-200 \${state.loading ? 'opacity-0' : 'opacity-100'} \`}
          onLoad={() => {
            state.loading = false;
          }}
        />
        {state.loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
      </div>
    );
  }
});

const AvatarDemo = defineComponent({
  name: 'AvatarDemo',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
        <div className="w-32 h-32 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-24 h-24 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-16 h-16 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-12 h-12 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-8 h-8 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-4 h-4 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(AvatarDemo);

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

function Avatar(src) {
  return html\`
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src=\${src}
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  \`;
}

function AvatarDemo() {
  return html\`
    <div class="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
      <div class="w-32 h-32 m-1">
        \${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-24 h-24 m-1">
        \${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-16 h-16 m-1">
        \${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-12 h-12 m-1">
        \${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-8 h-8 m-1">
        \${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-4 h-4 m-1">
        \${Avatar('https://source.unsplash.com/256x256')}
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
  render(AvatarDemo(), root);
  renderFallback(root);
}
`;

const PAGE: Page = {
  path: 'avatar',
  title: 'Avatar',
  code: {
    html: HTML,
    react: REACT,
    preact: PREACT,
    'vue-3': VUE_3,
    'lit-html': LIT_HTML,
  },
};

export default PAGE;
