import React from 'react';
import Spinner from './Spinner';

export default function FullLoader(): JSX.Element {
  return (
    <div className="flex-1 w-full h-full flex items-center justify-center">
      <div className="text-blue-500 w-8 h-8">
        <Spinner />
      </div>
    </div>
  );
}
