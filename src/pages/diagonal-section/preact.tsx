/** @jsx h */
import { h, render } from 'https://cdn.skypack.dev/preact';

function DiagonalSection() {
  return (
    <div className="py-8 w-full h-full flex items-center justify-center">
      <div className="relative w-full h-64">
        <div className="absolute left-0 top-0 w-full h-full transform-gpu -skew-y-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-xl text-white z-10">Lorem Ipsum</span>
        </div>
      </div>
    </div>
  );
}

export default function renderApp(root: HTMLDivElement): () => void {
  const result = render(<DiagonalSection />, root);

  return () => {
    render(null, root, result);
  };
}
