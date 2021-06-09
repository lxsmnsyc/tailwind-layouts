import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Card() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="p-8 w-full min-h-full flex items-center justify-center">
      <div className="w-full h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
        <div className="w-full flex items-center justify-center border-b dark:border-gray-800 relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={`w-full h-auto transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
        <div className="p-4 w-full border-b dark:border-gray-800">
          <span className="text-xl">Lorem Ipsum</span>
          <p className="py-1 text-sm">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Fusce sed est viverra ex tincidunt vehicula.
            Donec pellentesque diam sit amet mi ullamcorper,
            ac finibus lorem scelerisque.
          </p>
        </div>
        <div className="p-4 w-full flex items-center justify-start flex-row-reverse">
          <button
            type="button"
            className="bg-gray-800 py-2 px-4 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root: HTMLDivElement): () => void {
  ReactDOM.render(<Card />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}