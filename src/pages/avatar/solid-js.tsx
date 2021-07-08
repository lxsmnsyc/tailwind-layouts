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

function Avatar(props) {
  const [loading, setLoading] = createSignal(true);

  function onLoad() {
    setLoading(false);
  }

  return html`
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src=${props.src}
        width="256"
        height="256"
        class=${() => `w-full h-auto transition-opacity duration-200 ${loading() ? 'opacity-0' : 'opacity-100'}`}
        onLoad=${onLoad}
      />
      ${() => loading() && html`<${Fallback} />`}
    </div>
  `;
}

function AvatarDemo() {
  return html`
    <div class="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
      <div class="w-32 h-32 m-1">
        <${Avatar} src="https://source.unsplash.com/256x256" />
      </div>
      <div class="w-24 h-24 m-1">
        <${Avatar} src="https://source.unsplash.com/256x256" />
      </div>
      <div class="w-16 h-16 m-1">
        <${Avatar} src="https://source.unsplash.com/256x256" />
      </div>
      <div class="w-12 h-12 m-1">
        <${Avatar} src="https://source.unsplash.com/256x256" />
      </div>
      <div class="w-8 h-8 m-1">
        <${Avatar} src="https://source.unsplash.com/256x256" />
      </div>
      <div class="w-4 h-4 m-1">
        <${Avatar} src="https://source.unsplash.com/256x256" />
      </div>
    </div>
  `;
}

export default function renderApp(root: HTMLDivElement): () => void {
  return render(AvatarDemo, root);
}
