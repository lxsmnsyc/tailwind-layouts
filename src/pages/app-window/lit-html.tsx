import { html, render } from 'https://cdn.skypack.dev/lit-html';

function AppWindow() {
  return html`
    <div class="p-8 w-full h-full flex items-center justify-center">
      <div class="shadow-lg w-full flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div class="w-full flex items-center justify-start relative p-1 border-b dark:border-gray-800">
          <div class="p-1 flex items-center justify-center">
            <div class="bg-red-500 m-1 w-3 h-3 rounded-full"></div>
            <div class="bg-yellow-500 m-1 w-3 h-3 rounded-full"></div>
            <div class="bg-green-500 m-1 w-3 h-3 rounded-full"></div>
          </div>
          <div class="w-full flex items-center justify-center absolute left-0">
            <span class="font-sans text-xs text-gray-500 dark:text-gray-400">Hello World</span>
          </div>
        </div>
        <div class="">
          <div class="p-4">
            <h1>Hello World</h1>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default function renderApp(root: HTMLDivElement): void {
  render(AppWindow(), root);
}
