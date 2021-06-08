import React, {
  useState,
  useEffect,
  Suspense,
} from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import ErrorBoundary from './components/ErrorBoundary';
import { useDarkPreference } from './components/ThemeAdapter';
import Compiler from './components/Compiler';
import FullLoader from './components/FullLoader';
import CompilerError from './components/CompilerError';
import { Project } from './pages/types';
import { useEnvironmentState } from './components/Environment';
import loadDefinitions from './utils/load-definitions';
import { SKYPACK, UNPKG } from './utils/constants';

interface DemoPageShellProps {
  title: string;
  code: Project;
}

export default function DemoPageShell(
  { title, code }: DemoPageShellProps,
): JSX.Element {
  const isDarkMode = useDarkPreference();
  const environment = useEnvironmentState();

  const [state, setState] = useState<Project>(code);
  const [error, setError] = useState<Error>();
  const [, setRenderError] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setState(code);
  }, [code]);

  useEffect(() => {
    setError(undefined);
  }, [state]);

  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedState(state);
      setRenderError((prev) => {
        if (prev) {
          setRetryKey((key) => key + 1);
        }
        return false;
      });
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2017,
        allowNonTsExtensions: true,
        typeRoots: [
          SKYPACK,
          UNPKG,
        ],
        jsx: monaco.languages.typescript.JsxEmit.React,
        jsxFactory: 'React.createElement',
        noEmit: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        importHelpers: true,
        esModuleInterop: true,
      });
    }
  }, [monaco]);

  useEffect(() => {
    if (monaco) {
      loadDefinitions(monaco, state[environment]).catch(() => {
        //
      });
    }
  }, [environment, state, monaco]);

  return (
    <div className="overflow-hidden w-full h-screen flex-1 flex items-stretch justify-center flex-col">
      <div className="flex-none flex items-center justify-between border-b dark:border-gray-800">
        <div className="p-4 font-bold text-xl">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="flex-1 flex items-stretch justify-center sm:flex-row flex-col-reverse">
        <div className="flex-1 relative">
          <div className="w-full h-full absolute">
            <Editor
              path="file:///index.tsx"
              height="100%"
              defaultLanguage="typescript"
              theme={isDarkMode ? 'vs-dark' : 'light'}
              defaultValue={code[environment]}
              value={state[environment]}
              onChange={(value) => {
                setState((prev) => ({
                  ...prev,
                  [environment]: value,
                }));
              }}
              loading={<FullLoader />}
              options={{
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>
        <div className="flex-1 border-b dark:border-gray-800 md:border-l relative">
          <div className="w-full h-full absolute overflow-auto">
            <ErrorBoundary
              key={retryKey}
              onError={(err) => {
                setRenderError(true);
                setError(err);
              }}
              fallback={error && <CompilerError error={error} />}
            >
              <Suspense fallback={<FullLoader />}>
                <Compiler
                  title={title}
                  code={debouncedState[environment]}
                  onError={setError}
                />
              </Suspense>
            </ErrorBoundary>
            {
              error && <CompilerError error={error} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
