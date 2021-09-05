import { editor } from 'monaco-editor';
import GITHUB_DARK from './themes/github-dark.json?raw';
import GITHUB_LIGHT from './themes/github-light.json?raw';

export interface TMTokenSettings {
  foreground?: string;
  background?: string;
  fontStyle?: string;
}

export interface TMToken {
  name: string;
  scope: string[] | string;
  settings: TMTokenSettings;
}

export interface TMJSON {
  name: string;
  colors: Record<string, string>;
  semanticHighlighting: boolean;
  tokenColors: TMToken[];
}

let LOADED = false;

const githubDark = JSON.parse(GITHUB_DARK) as TMJSON;
const githubLight = JSON.parse(GITHUB_LIGHT) as TMJSON;

function processTokenRules(tokens: TMToken[]): editor.ITokenThemeRule[] {
  const result: editor.ITokenThemeRule[] = [];
  let size = 0;
  for (let i = 0, len = tokens.length; i < len; i += 1) {
    const token = tokens[i];
    const rules = (
      Array.isArray(token.scope)
        ? token.scope
        : token.scope.replace(/^[,]+/, '').replace(/[,]+$/, '').split(',')
    );
    const rlen = rules.length;
    for (let r = 0; r < rlen; r += 1) {
      result[size + r] = {
        token: rules[r],
        fontStyle: token.settings.fontStyle,
        foreground: token.settings.foreground?.substring(1),
        background: token.settings.background?.substring(1),
      }
    }
    size += rlen;
  }
  return result;
}

export default function initThemes(): void {
  if (LOADED) {
    return;
  }
  LOADED = true;

  editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: processTokenRules(githubDark.tokenColors),
    colors: githubDark.colors,
  });

  editor.defineTheme('github-light', {
    base: 'vs',
    inherit: true,
    rules: processTokenRules(githubLight.tokenColors),
    colors: githubLight.colors,
  });
}
