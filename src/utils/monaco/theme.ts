import { useMonaco } from '@monaco-editor/react';
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
  return tokens.reduce(
    (acc, token) => {
      const rules = (
        Array.isArray(token.scope)
          ? token.scope
          : token.scope.replace(/^[,]+/, '').replace(/[,]+$/, '').split(',')
      );
      return [
        ...acc,
        ...rules.map((rule) => ({
          token: rule,
          fontStyle: token.settings.fontStyle,
          foreground: token.settings.foreground?.substring(1),
          background: token.settings.background?.substring(1),
        })),
      ];
    },
    [] as editor.ITokenThemeRule[],
  );
}

export default function initThemes(
  monaco: NonNullable<ReturnType<typeof useMonaco>>,
): void {
  if (LOADED) {
    return;
  }
  LOADED = true;

  monaco.editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: processTokenRules(githubDark.tokenColors),
    colors: githubDark.colors,
  });

  monaco.editor.defineTheme('github-light', {
    base: 'vs',
    inherit: true,
    rules: processTokenRules(githubLight.tokenColors),
    colors: githubLight.colors,
  });
}
