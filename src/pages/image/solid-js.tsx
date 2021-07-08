import { createSignal } from 'https://cdn.skypack.dev/solid-js';
import { render } from 'https://cdn.skypack.dev/solid-js/web';
import html from 'https://cdn.skypack.dev/solid-js/html';

function Fallback() {
  return html`
    <div
      class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900"
    />
  `;
}

function Image() {
  const [loading, setLoading] = createSignal(true);

  function onLoad() {
    setLoading(false);
  }

  return html`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full flex items-center justify-center flex-col">
        <div class="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            class=${() => `w-full h-auto transition-opacity duration-200 ${loading() ? 'opacity-0' : 'opacity-100'} `}
            onLoad=${onLoad}
          />
          ${() => loading() && html`<${Fallback} />`}
        </div>
        <div class="w-full p-2 flex items-center justify-center">
          <span class="text-xs">Source: Unsplash</span>
        </div>
      </div>
    </div>
  `;
}

export default function renderApp(root: HTMLDivElement): () => void {
  return render(Image, root);
}
