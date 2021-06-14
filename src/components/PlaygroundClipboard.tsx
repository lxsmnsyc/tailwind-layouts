import { ClipboardIcon } from '@heroicons/react/solid';
import React from 'react';
import copy from 'copy-to-clipboard';
import { usePlaygroundCurrentCode } from './PlaygroundModel';
import { useEnvironmentState } from './Environment';

export default function PlaygroundClipboard(): JSX.Element {
  const { value: currentCode } = usePlaygroundCurrentCode();
  const environment = useEnvironmentState();

  return (
    <div className="py-4 px-2 flex">
      <button
        type="button"
        onClick={() => {
          copy(currentCode[environment]);
        }}
        className="w-6 h-6 transition-transform transform-gpu hover:scale-110"
        title="Copy to Clipboard"
      >
        <span className="sr-only">Copy to Clipboard</span>
        <ClipboardIcon />
      </button>
    </div>
  );
}
