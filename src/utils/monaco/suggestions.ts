import { useMonaco } from '@monaco-editor/react';
import { languages } from 'monaco-editor';
import getRange from '../get-range';
import getSheet from '../get-sheet';
import CLASSES from './classes';
import { getColor } from './colors';

interface Range {
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
}

const SUGGESTIONS: languages.CompletionItem[] = CLASSES.map((className) => ({
  label: className,
  kind: getColor(className) ? 19 : 14,
  insertText: className,
  documentation: {
    value: `**CSS Definition**\n\`\`\`css\n${getSheet(className, 'media')}\n\`\`\``,
  },
  range: {
    startLineNumber: 1,
    endLineNumber: 1,
    startColumn: 1,
    endColumn: 1,
  },
}));

function createSuggestions(
  range: Range,
): languages.CompletionItem[] {
  return SUGGESTIONS.map((item) => ({
    ...item,
    range,
  }));
}

let LOADED = false;

export default function initSuggestions(monaco: NonNullable<ReturnType<typeof useMonaco>>): void {
  if (LOADED) {
    return;
  }
  LOADED = true;

  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems(model, position) {
      const length = model.getLineLength(position.lineNumber);
      const line = model.getValueInRange({
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: 1,
        endColumn: length + 1,
      });
      const minColumn = getRange(line, position.column - 1, -1);
      const maxColumn = getRange(line, position.column - 1, 1);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: minColumn,
        endColumn: maxColumn + 1,
      };
      return {
        suggestions: createSuggestions(range),
      };
    },
  });
  monaco.languages.registerCompletionItemProvider('typescript', {
    provideCompletionItems(model, position) {
      const length = model.getLineLength(position.lineNumber);
      const line = model.getValueInRange({
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: 1,
        endColumn: length + 1,
      });
      const minColumn = getRange(line, position.column - 1, -1);
      const maxColumn = getRange(line, position.column - 1, 1);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: minColumn,
        endColumn: maxColumn + 1,
      };
      return {
        suggestions: createSuggestions(range),
      };
    },
  });
}
