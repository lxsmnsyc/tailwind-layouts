export const path = 'diagonal-section';

export const title = 'Diagonal Section';

export const code = `
import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function DiagonalSection({ children }) {
  return (
    <div className="relative w-full h-64">
      <div className="absolute left-0 top-0 w-full h-full transform-gpu -skew-y-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
      {children}
    </div>
  );
}

function DiagonalSectionExample() {
  return (
    <div className="py-8 w-full h-full flex items-center justify-center">
      <DiagonalSection>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-xl text-white z-10">Lorem Ipsum</span>
        </div>
      </DiagonalSection>
    </div>
  );
}

export default function renderApp(root) {
  ReactDOM.render(<DiagonalSectionExample />, root);

  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
}
`;
