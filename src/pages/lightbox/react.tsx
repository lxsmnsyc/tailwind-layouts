import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function Lightbox() {
  const [loading, setLoading] = React.useState(true);
  const [expand, setExpand] = React.useState(false);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div
        className={`w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg ${expand ? 'fixed top-0 left-0 w-screen h-screen p-16 bg-gray-900 bg-opacity-75 rounded-none border-none z-50' : 'relative'}`}
        onClick={() => {
          setExpand(!expand);
        }}
      >
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
        {loading && <div className="w-full absolute h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
      </div>
    </div>
  );
}

export default function renderApp(root: HTMLDivElement): () => void {
  ReactDOM.render(<Lightbox />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}