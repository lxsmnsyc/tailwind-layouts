import React from 'react';
import DemoPageShell from '../../DemoPageShell';

const CODE = `
export default function Image() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="m-8 flex items-center justify-center flex-col">
      <div className="w-full overflow-hidden flex items-center justify-center shadow-lg rounded-lg relative">
        <img
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
  );
}
`;

export default function ImagePattern(): JSX.Element {
  return (
    <DemoPageShell
      title="Image"
      code={CODE}
      route="/patterns/image"
    />
  );
}
