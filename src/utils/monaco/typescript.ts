import { useMonaco } from '@monaco-editor/react';
import { SKYPACK, UNPKG } from '../constants';

let LOADED = false;

export default function initTypescript(monaco: NonNullable<ReturnType<typeof useMonaco>>): void {
  if (LOADED) {
    return;
  }
  LOADED = true;

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
