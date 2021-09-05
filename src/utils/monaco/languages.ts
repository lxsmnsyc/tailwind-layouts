import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import * as monaco from 'monaco-editor';
import cssDefinition from './languages/css.json?url';
import htmlDefinition from './languages/html.json?url';
import javascriptDefinition from './languages/javascript.json?url';
import jsxDefinition from './languages/jsx.json?url';
import svelteDefinition from './languages/svelte.json?url';
import typescriptDefinition from './languages/typescript.json?url';
import tsxDefinition from './languages/tsx.json?url';
import vueDefinition from './languages/vue.json?url';

const grammars = new Map();
grammars.set('css', 'source.css');
grammars.set('html', 'text.html.basic');
// grammars.set('javascript', 'source.js');
grammars.set('javascript', 'source.js.jsx');
// grammars.set('jsx', 'source.js.jsx');
// grammars.set('svelte', 'source.svelte');
// grammars.set('tsx', 'source.tsx');
// grammars.set('typescript', 'source.ts');
grammars.set('typescript', 'source.tsx');
// grammars.set('vue', 'source.vue');

const inverseGrammars: Record<string, string> = {
  'source.css': 'css',
  'text.html.basic': 'html',
  'source.js': 'jsx',
  // 'source.js': 'javascript',
  'source.js.jsx': 'jsx',
  // 'source.svelte': 'svelte',
  'source.tsx': 'tsx',
  // 'source.ts': 'typescript',
  // 'source.vue': 'vue',
};


function createRegistry(): Registry {
  return new Registry({
    getGrammarDefinition: async (scopeName) => {
      console.log(scopeName);
      switch (inverseGrammars[scopeName]) {
        case 'css': return {
          format: 'json',
          content: await (await fetch(cssDefinition)).text(),
        };
        case 'html': return {
          format: 'json',
          content: await (await fetch(htmlDefinition)).text(),
        };
        case 'jsx': return {
          format: 'json',
          content: await (await fetch(jsxDefinition)).text(),
        };
        case 'svelte': return {
          format: 'json',
          content: await (await fetch(svelteDefinition)).text(),
        };
        case 'typescript': return {
          format: 'json',
          content: await (await fetch(typescriptDefinition)).text(),
        };
        case 'tsx': return {
          format: 'json',
          content: await (await fetch(tsxDefinition)).text(),
        };
        case 'vue': return {
          format: 'json',
          content: await (await fetch(vueDefinition)).text(),
        };
        case 'javascript':
        default: return {
          format: 'json',
          content: await (await fetch(javascriptDefinition)).text(),
        };
      }
    },
  });
}

let LOADED = false;

export default async function loadLanguages(
  editor: monaco.editor.ICodeEditor,
): Promise<void> {
  if (LOADED) {
    return;
  }
  LOADED = true;
  console.log('WIRED');
  await wireTmGrammars(
    monaco,
    createRegistry(),
    grammars,
    editor,
  );
}