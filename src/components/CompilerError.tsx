import React from 'react';

interface CompilerErrorProps {
  error?: Error;
}

export default function CompilerError({ error }: CompilerErrorProps): JSX.Element {
  if (error == null) {
    return <></>;
  }
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75">
      <div className="flex items-center justify-center">
        <div className="m-4 w-3/4 p-4 font-mono rounded-lg bg-red-500 text-white">
          <div className="mb-2">
            <span className="text-lg">{`${error.name}: ${error.message}`}</span>
          </div>
          <p className="p-2 overflow-x-scroll bg-gray-900 rounded-lg whitespace-pre">
            {error.stack}
          </p>
        </div>
      </div>
    </div>
  );
}
