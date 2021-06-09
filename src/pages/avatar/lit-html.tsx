
import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Fallback() {
  return html`
    <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
    </div>
  `;
}

function Avatar(src) {
  return html`
    <div class="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        alt="Avatar"
        src=${src}
        width="256"
        height="256"
        class="w-full h-auto transition-opacity duration-200 opacity-0"
      />
    </div>
  `;
}

function AvatarDemo() {
  return html`
    <div class="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
      <div class="w-32 h-32 m-1">
        ${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-24 h-24 m-1">
        ${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-16 h-16 m-1">
        ${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-12 h-12 m-1">
        ${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-8 h-8 m-1">
        ${Avatar('https://source.unsplash.com/256x256')}
      </div>
      <div class="w-4 h-4 m-1">
        ${Avatar('https://source.unsplash.com/256x256')}
      </div>
    </div>
  `;
}

function renderFallback(root: HTMLDivElement) {
  root.querySelectorAll('img').forEach((el) => {
    const parent = el.parentElement;
    if (!el.complete && parent) {
      const fallback = document.createElement('div');

      render(Fallback(), fallback);

      parent.appendChild(fallback);

      el.addEventListener('load', () => {
        el.classList.remove('opacity-0');
        el.classList.add('opacity-100');

        parent.removeChild(fallback);
      });
    } else {
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
    }
  });
}

export default function renderApp(root: HTMLDivElement): void {
  render(AvatarDemo(), root);
  renderFallback(root);
}
