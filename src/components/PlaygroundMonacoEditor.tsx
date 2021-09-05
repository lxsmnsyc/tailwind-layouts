import { editor, Uri } from 'monaco-editor';
import React, { useEffect, useState } from 'react';
import { EXTENSIONS, LANGUAGES } from '../pages';
import createResource from '../utils/create-resource';
import loadDefinitions from '../utils/load-definitions';
import loadLanguages from '../utils/monaco/languages';
import loadMonaco from '../utils/monaco/load';
import { useEnvironmentState } from './Environment';
import { usePlaygroundCode, usePlaygroundCurrentCode, usePlaygroundId } from './PlaygroundModel';
import { useDarkPreference } from './ThemeAdapter';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';

(window as any).MonacoEnvironment = {
  getWorker(_moduleId: unknown, label: string) {
    switch (label) {
      case 'css':
        return new cssWorker();
      case 'typescript':
      case 'javascript':
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
};

// export default function PlaygroundMonacoEditor(): JSX.Element {
//   const monaco = monacoResource.read();

//   const environment = useEnvironmentState();
//   const isDarkMode = useDarkPreference();

//   const id = usePlaygroundId();
//   const code = usePlaygroundCode();

//   const { value: currentCode, dispatch: setCurrentCode } = usePlaygroundCurrentCode();

//   useEffect(() => {
//     if (monaco) {
//       loadDefinitions(monaco, currentCode[environment]).catch(() => {
//         //
//       });
//     }
//   }, [environment, currentCode, monaco]);

//   useEffect(() => () => {
//     monaco.editor.getModels().forEach((model) => {
//       model.dispose();
//     });
//   }, [monaco]);

//   return (
//     <Editor
//       path={`file:///${id}/${environment}.${EXTENSIONS[environment]}`}
//       height="100%"
//       language={LANGUAGES[environment]}
//       defaultValue={code[environment]}
//       // value={state[environment]}
//       onChange={(value) => {
//         setCurrentCode((prev) => ({
//           ...prev,
//           [environment]: value,
//         }));
//       }}
//       onMount={(editor) => {
//         loadLanguages(editor).catch((err) => {
//           console.error(err);
//         });
//       }}
//       loading={<FullLoader />}
//       options={{
//         scrollBeyondLastLine: false,
//         colorDecorators: true,
//       }}
//     />
//   );
// }
const monacoResource = createResource(loadMonaco);

export default function PlaygroundMonacoEditor(): JSX.Element {
  monacoResource.read();

  const environment = useEnvironmentState();
  const isDarkMode = useDarkPreference();

  const id = usePlaygroundId();
  const code = usePlaygroundCode();

  const { value: currentCode, dispatch: setCurrentCode } = usePlaygroundCurrentCode();

  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const [instance, setInstance] = useState<editor.ICodeEditor>();

  useEffect(() => {
    if (root) {
      const editorInstance = editor.create(root, {
        automaticLayout: true,
        scrollBeyondLastLine: false,
        colorDecorators: true,
      });

      setInstance(editorInstance);

      return () => {
        editorInstance.dispose();
      };
    }
    return undefined;
  }, [root]);

  useEffect(() => {
    if (instance) {
      const timeout = setTimeout(() => {
        loadLanguages(instance).catch(() => {
          //
        });
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
    return undefined;
  }, [instance])

  useEffect(() => {
    if (instance) {
      const disposable = instance.onDidChangeModelContent(() => {
        setCurrentCode((prev) => ({
          ...prev,
          [environment]: instance.getValue(),
        }));
      });

      return () => {
        disposable.dispose();
      };
    }
    return undefined;
  }, [instance, environment]);

  useEffect(() => {
    editor.setTheme(isDarkMode ? 'github-dark' : 'github-light');
  }, [isDarkMode]);

  useEffect(() => {
    if (instance) {
      const path = `file:///${id}/${environment}.${EXTENSIONS[environment]}`;
      const parsed = Uri.parse(path);
      let currentModel = editor.getModel(parsed);
  
      if (!currentModel) {
        currentModel = editor.createModel(
          code[environment],
          LANGUAGES[environment],
          parsed,
        );
      }
  
      instance.setModel(currentModel);
    }
  }, [environment, instance, id]);

  useEffect(() => {
    loadDefinitions(currentCode[environment]).catch(() => {
      //
    });
  }, [currentCode, environment]);

  useEffect(() => () => {
    const models = editor.getModels();
    for (let i = 0, len = models.length; i < len; i += 1) {
      models[i].dispose();
    }
  }, []);

  return (
    <div className="w-full h-full" ref={setRoot} />
  );
}