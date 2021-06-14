import { ClipboardCheckIcon, ClipboardIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { usePlaygroundCurrentCode } from './PlaygroundModel';
import { useEnvironmentState } from './Environment';
import Toast from './Toast';

export default function PlaygroundClipboard(): JSX.Element {
  const { value: currentCode } = usePlaygroundCurrentCode();
  const environment = useEnvironmentState();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
    return undefined;
  }, [copied]);

  return (
    <div className="py-4 px-2 flex">
      <button
        type="button"
        onClick={() => {
          copy(currentCode[environment]);
          setCopied(true);

          toast.custom((t) => (
            <Toast
              message="Copied to clipboard!"
              show={t.visible}
            />
          ), {
            duration: 2000,
          });
        }}
        className="w-6 h-6 transition-transform transform-gpu hover:scale-110"
        title="Copy to Clipboard"
      >
        <span className="sr-only">Copy to Clipboard</span>
        {
          copied
            ? <ClipboardCheckIcon />
            : <ClipboardIcon />
        }
      </button>
    </div>
  );
}
