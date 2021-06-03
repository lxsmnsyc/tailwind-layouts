import React from 'react';
import DemoPageShell from '../../DemoPageShell';

const CODE = `
export default function Card() {
  return (
    <div className="m-8 w-1/2 shadow-lg overflow-hidden flex items-start justify-start flex-col border rounded-lg">
      <div className="w-full flex items-center justify-center border-b">
        <img
          src="https://source.unsplash.com/1200x630/?forest"
          width="1200"
          height="630"
          className="w-full h-auto"
        />
      </div>
      <div className="p-4 w-full border-b">
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
  );
}
`;

export default function CardPattern(): JSX.Element {
  return (
    <DemoPageShell
      title="Card"
      code={CODE}
      route="/patterns/card"
    />
  );
}
