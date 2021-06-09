import { html, render } from 'https://cdn.skypack.dev/uhtml';

function Fallback() {
  return html`
    <div class="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900">
    </div>
  `;
}

function Lightbox() {
  return html`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div
        class="w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative"
      >
        <img
          alt="Forest"
          src="https://source.unsplash.com/1200x630/?forest"
          width="1200"
          height="630"
          class="w-full h-full object-contain transition-opacity duration-200 opacity-0"
        />
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

function createLightbox(root: HTMLDivElement) {
  const el = root.querySelector('img');

  if (!el) {
    return;
  }
  const container = el.parentElement;
  if (!container) {
    return;
  }
  let expanded = false;

  container.addEventListener('click', () => {
    if (expanded) {
      container.classList.remove(...'fixed top-0 left-0 w-screen h-screen p-8 bg-gray-900 bg-opacity-75 rounded-none border-none z-50'.split(' '));
      container.classList.add('relative');
    } else {
      container.classList.remove('relative');
      container.classList.add(...'fixed top-0 left-0 w-screen h-screen p-8 bg-gray-900 bg-opacity-75 rounded-none border-none z-50'.split(' '));
    }
    expanded = !expanded;
  });
}

export default function renderApp(root: HTMLDivElement): void {
  render(root, Lightbox());
  renderFallback(root);
  createLightbox(root);
}
