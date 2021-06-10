/* eslint-disable no-param-reassign */
import { getHighlighter, setCDN } from 'shiki';
import React, { useRef } from 'react';
import Interweave from 'interweave';
import { useDarkPreference } from './ThemeAdapter';
import createResource from '../utils/create-resource';
import { useEnvironmentState } from './Environment';
import { EXTENSIONS } from '../pages';
import { usePlaygroundCurrentCode } from './PlaygroundModel';

setCDN('https://unpkg.com/shiki/');

const highlighterDarkResource = createResource(() => getHighlighter({
  theme: 'github-dark',
  langs: [
    'html',
    'tsx',
  ],
}));
const highlighterLightResource = createResource(() => getHighlighter({
  theme: 'github-light',
  langs: [
    'html',
    'tsx',
  ],
}));

export default function PlaygroundCodejarEditor(): JSX.Element {
  const highLightDark = highlighterDarkResource.read();
  const highlightLight = highlighterLightResource.read();

  const container = useRef<HTMLDivElement | null>(null);

  const isDarkMode = useDarkPreference();
  const environment = useEnvironmentState();

  const {
    value: currentCode,
  } = usePlaygroundCurrentCode();

  return (
    <div
      className="w-full h-full flex editor whitespace-pre"
      ref={container}
    >
      <Interweave
        content={
          isDarkMode
            ? highLightDark.codeToHtml(currentCode[environment], EXTENSIONS[environment])
            : highlightLight.codeToHtml(currentCode[environment], EXTENSIONS[environment])
        }
      />
    </div>
  );
}
