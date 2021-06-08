/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';

function Image() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={`w-full h-auto transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'} `}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
        <div className="w-full p-2 flex items-center justify-center">
          <span className="text-xs">Source: Unsplash</span>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  const result = render(<Image />, root);

  return () => {
    render(null, root, result);
  };
}
