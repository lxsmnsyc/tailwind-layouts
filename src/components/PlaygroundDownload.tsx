import { DocumentDownloadIcon } from '@heroicons/react/solid';
import React from 'react';
import { EXTENSIONS } from '../pages';
import { useEnvironmentState } from './Environment';
import { usePlaygroundCurrentCode, usePlaygroundId } from './PlaygroundModel';

export default function PlaygroundDownload(): JSX.Element {
  const title = usePlaygroundId();
  const { value: currentCode } = usePlaygroundCurrentCode();
  const environment = useEnvironmentState();

  const filename = `${title}.${EXTENSIONS[environment]}`;

  const encodedJs = encodeURIComponent(currentCode[environment]);
  const dataUri = `data:text/javascript;charset=utf-8,${encodedJs}`;

  return (
    <div className="py-4 px-2">
      <a
        href={dataUri}
        className=""
        download={filename}
        title={`Download '${filename}'`}
      >
        <div className="w-6 h-6 transition-transform transform-gpu hover:scale-110">
          <DocumentDownloadIcon />
        </div>
      </a>
    </div>
  );
}
