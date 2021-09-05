import { languages } from 'monaco-editor';
import { SKYPACK, UNPKG } from '../constants';

let LOADED = false;

export default function initTypescript(): void {
  if (LOADED) {
    return;
  }
  LOADED = true;

  languages.typescript.typescriptDefaults.setCompilerOptions({
    target: languages.typescript.ScriptTarget.ES2017,
    allowNonTsExtensions: true,
    typeRoots: [
      SKYPACK,
      UNPKG,
    ],
    jsx: languages.typescript.JsxEmit.React,
    jsxFactory: 'React.createElement',
    noEmit: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    module: languages.typescript.ModuleKind.ESNext,
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    importHelpers: true,
    esModuleInterop: true,
  });
}
