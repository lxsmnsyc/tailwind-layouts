import { createSignal } from 'https://cdn.skypack.dev/solid-js';
import { render } from 'https://cdn.skypack.dev/solid-js/web';
import html from 'https://cdn.skypack.dev/solid-js/html';

function Fallback() {
  return html`
    <div
      class="w-full absolute h-full animate-pulse bg-gray-100 dark:bg-gray-900"
    />
  `;
}

function Lightbox() {
  const [loading, setLoading] = createSignal(true);
  const [expand, setExpand] = createSignal(false);

  function onClick() {
    setExpand(!expand());
  }

  function onLoad() {
    setLoading(false);
  }

  return html`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div
        class=${() => `w-full cursor-pointer overflow-hidden flex items-center justify-center filter drop-shadow-lg rounded-lg ${expand() ? 'fixed top-0 left-0 w-screen h-screen p-8 bg-gray-900 bg-opacity-75 rounded-none border-none z-50' : 'relative'}`}
        onClick=${onClick}
      >
        <img
          alt="Forest"
          src="https://source.unsplash.com/1200x630/?forest"
          width="1200"
          height="630"
          class=${() => `w-full h-full object-contain transition-opacity duration-200 ${loading() ? 'opacity-0' : 'opacity-100'}`}
          onLoad=${onLoad}
        />
        ${() => loading() && html`<${Fallback} />`}
      </div>
    </div>
  `;
}

export default function renderApp(root: HTMLDivElement): () => void {
  return render(Lightbox, root);
}
