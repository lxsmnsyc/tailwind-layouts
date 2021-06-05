export const path = 'card';

export const title = 'Card';

export const code = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Card() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-center border-b dark:border-gray-800">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className="w-full h-auto"
          />
        </div>
        <div className="p-4 w-full border-b dark:border-gray-800">
          <span className="text-xl">Lorem Ipsum</span>
          <p className="py-1 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed est viverra ex tincidunt vehicula. Donec pellentesque diam sit amet mi ullamcorper, ac finibus lorem scelerisque.
          </p>
        </div>
        <div className="p-4 w-full flex items-center justify-start flex-row-reverse">
          <button
            type="button"
            className="text-purple-500 hover:text-purple-400"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Card />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;
