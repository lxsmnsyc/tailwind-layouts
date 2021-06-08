import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Navbar() {
  return html`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="w-full border dark:border-gray-800 flex items-center justify-between shadow-lg">
        <div class="p-4">
          <a href="#" class="text-xl font-bold">
            Title
          </a>
        </div>
        <div class="flex p-2 text-sm font-semibold">
          <a href="#" class="p-2">
            Page 1
          </a>
          <a href="#" class="p-2">
            Page 2
          </a>
          <a href="#" class="p-2">
            Page 4
          </a>
        </div>
      </div>
    </div>
  `;
}

export default function renderApp(root) {
  render(Navbar(), root);
}
