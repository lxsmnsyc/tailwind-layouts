import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Card() {
  return html`
    <div class="p-8 w-full min-h-full flex items-center justify-center">
      <div class="w-full h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div class="w-full flex items-center justify-center border-b dark:border-gray-800 relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            class="w-full h-auto transition-opacity duration-200 opacity-0"
          />
        </div>
        <div class="p-4 w-full border-b dark:border-gray-800">
          <span class="text-xl">Lorem Ipsum</span>
          <p class="py-1 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed est viverra ex tincidunt vehicula. Donec pellentesque diam sit amet mi ullamcorper, ac finibus lorem scelerisque.
          </p>
        </div>
        <div class="p-4 w-full flex items-center justify-start flex-row-reverse">
          <button
            type="button"
            class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  `;
}

function Fallback() {
  return html`
    <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
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
  render(Card(), root);
  renderFallback(root);
}
