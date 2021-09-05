import { languages } from 'monaco-editor';
import getRange from '../get-range';
import getSheet from '../get-sheet';
import { validClass } from './classes';

interface Range {
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
}

function createHover(
  range: Range,
  value: string,
): languages.ProviderResult<languages.Hover> {
  if (value.startsWith('dark:')) {
    return {
      contents: [
        {
          value: '**CSS Definition**',
        },
        {
          value: '`darkMode: "media"`',
        },
        {
          value: `\`\`\`css\n${getSheet(value, 'media')}\n\`\`\``,
        },
        {
          value: '`darkMode: "class"`',
        },
        {
          value: `\`\`\`css\n${getSheet(value, 'class')}\n\`\`\``,
        },
      ],
      range,
    };
  }
  return {
    contents: [
      {
        value: '**CSS Definition**',
      },
      {
        value: `\`\`\`css\n${getSheet(value, 'media')}\n\`\`\``,
      },
    ],
    range,
  };
}

let LOADED = false;

export default function initHover(): void {
  if (LOADED) {
    return;
  }
  LOADED = true;

  languages.registerHoverProvider('html', {
    provideHover(model, position) {
      const length = model.getLineLength(position.lineNumber);
      const line = model.getValueInRange({
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: 1,
        endColumn: length + 1,
      });
      const minColumn = getRange(line, position.column - 1, -1) + 1;
      const maxColumn = getRange(line, position.column - 1, 1);
      const word = line.substring(minColumn, maxColumn);
      if (/\s+/.exec(word) || word === '' || !validClass(word)) {
        return null;
      }
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: minColumn + 1,
        endColumn: maxColumn + 1,
      };
      return createHover(range, word);
    },
  });
  languages.registerHoverProvider('typescript', {
    provideHover(model, position) {
      const length = model.getLineLength(position.lineNumber);
      const line = model.getValueInRange({
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: 1,
        endColumn: length + 1,
      });
      const minColumn = getRange(line, position.column - 1, -1) + 1;
      const maxColumn = getRange(line, position.column - 1, 1);
      const word = line.substring(minColumn, maxColumn);
      if (/\s+/.exec(word) || word === '' || !validClass(word)) {
        return null;
      }
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: minColumn + 1,
        endColumn: maxColumn + 1,
      };
      return createHover(range, word);
    },
  });
}
