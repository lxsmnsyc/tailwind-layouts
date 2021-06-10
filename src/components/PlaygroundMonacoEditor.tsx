import Editor, { useMonaco } from '@monaco-editor/react';
import React, { useEffect } from 'react';
import { EXTENSIONS, LANGUAGES } from '../pages';
import loadDefinitions from '../utils/load-definitions';
import load from '../utils/monaco/load';
import { useEnvironmentState } from './Environment';
import FullLoader from './FullLoader';
import { usePlaygroundCode, usePlaygroundCurrentCode } from './PlaygroundModel';
import { useDarkPreference } from './ThemeAdapter';

export default function PlaygroundMonacoEditor(): JSX.Element {
  const environment = useEnvironmentState();
  const isDarkMode = useDarkPreference();

  const code = usePlaygroundCode();

  const { value: currentCode, dispatch: setCurrentCode } = usePlaygroundCurrentCode();

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      load(monaco).catch(() => {
        //
      });
    }
  }, [monaco]);

  useEffect(() => {
    if (monaco) {
      loadDefinitions(monaco, currentCode[environment]).catch(() => {
        //
      });
    }
  }, [environment, currentCode, monaco]);

  return (
    <Editor
      path={`file:///${environment}.${EXTENSIONS[environment]}`}
      height="100%"
      language={LANGUAGES[environment]}
      theme={isDarkMode ? 'vs-dark' : 'light'}
      defaultValue={code[environment]}
      // value={state[environment]}
      onChange={(value) => {
        setCurrentCode((prev) => ({
          ...prev,
          [environment]: value,
        }));
      }}
      loading={<FullLoader />}
      options={{
        scrollBeyondLastLine: false,
        colorDecorators: true,
      }}
    />
  );
}
