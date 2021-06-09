import { html, render } from 'https://cdn.skypack.dev/lit-html';

function Button() {
  return html` 
    <div class="p-8 w-full h-full flex items-center justify-center flex-col">
      <div class="flex items-center justify-start">
        <div class="m-2">
          <button
            type="button"
            class="bg-gray-800 py-1 px-2 text-white rounded text-sm hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="bg-gray-800 py-3 px-6 text-lg text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Button
          </button>
        </div>
      </div>
      <div class="flex items-center justify-start">
        <div class="m-2">
          <button
            type="button"
            class="py-1 px-2 rounded text-sm transition-colors duration-200 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="py-2 px-4 rounded-lg transition-colors duration-200 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
        <div class="m-2">
          <button
            type="button"
            class="py-3 px-6 text-lg rounded-lg transition-colors duration-200 text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  `;
}

export default function renderApp(root: HTMLDivElement): void {
  render(Button(), root);
}
