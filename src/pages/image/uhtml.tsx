import { html, render } from 'https://cdn.skypack.dev/uhtml';

function Fallback() {
  return html`
    <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
    </div>
  `;
}

function Image() {
  return html`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full flex items-center justify-center flex-col">
        <div class="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            class="w-full h-auto transition-opacity duration-200 opacity-0"
          />
        </div>
        <div class="w-full p-2 flex items-center justify-center">
          <span class="text-xs">Source: Unsplash</span>
        </div>
      </div>
    </div>
  `;
}

function renderFallback(root: HTMLDivElement) {
  root.querySelectorAll('img').forEach((el) => {
    const parent = el.parentElement;
    if (!el.complete && parent) {
      const fallback = document.createElement('div');

      render(fallback, Fallback());

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
  render(root, Image());
  renderFallback(root);
}
