export const path = 'image';

export const title = 'Image';

export const code = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Image() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-3/4 overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={\`w-full h-auto transition-opacity duration-300 \${loading ? 'opacity-0' : 'opacity-100'} \`}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {loading && <div className="absolute w-full h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
        <div className="w-full p-2 flex items-center justify-center">
          <span className="text-xs">Source: Unsplash</span>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<Image />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;
