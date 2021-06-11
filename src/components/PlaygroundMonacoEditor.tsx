import Editor from '@monaco-editor/react';
import React, { useEffect } from 'react';
import { EXTENSIONS, LANGUAGES } from '../pages';
import createResource from '../utils/create-resource';
import loadDefinitions from '../utils/load-definitions';
import loadMonaco from '../utils/monaco/load';
import { useEnvironmentState } from './Environment';
import FullLoader from './FullLoader';
import { usePlaygroundCode, usePlaygroundCurrentCode, usePlaygroundId } from './PlaygroundModel';
import { useDarkPreference } from './ThemeAdapter';

const monacoResource = createResource(loadMonaco);

export default function PlaygroundMonacoEditor(): JSX.Element {
  const monaco = monacoResource.read();

  const environment = useEnvironmentState();
  const isDarkMode = useDarkPreference();

  const id = usePlaygroundId();
  const code = usePlaygroundCode();

  const { value: currentCode, dispatch: setCurrentCode } = usePlaygroundCurrentCode();

  useEffect(() => {
    if (monaco) {
      loadDefinitions(monaco, currentCode[environment]).catch(() => {
        //
      });
    }
  }, [environment, currentCode, monaco]);

  useEffect(() => () => {
    monaco.editor.getModels().forEach((model) => {
      model.dispose();
    });
  }, [monaco]);

  return (
    <Editor
      path={`file:///${id}/${environment}.${EXTENSIONS[environment]}`}
      height="100%"
      language={LANGUAGES[environment]}
      theme={isDarkMode ? 'github-dark' : 'github-light'}
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
