import { useMonaco } from '@monaco-editor/react';
import colors from 'tailwindcss/colors';

interface Gradient {
  [key: string]: string;
}

interface Colors {
  [key: string]: string | Gradient;
}

export const COLORS: Record<string, string> = (
  Object.entries(colors as unknown as Colors)
    .reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        return {
          ...acc,
          [key]: value,
        };
      }
      return {
        ...acc,
        ...Object.fromEntries(
          Object.entries(value).map(([grade, item]) => [`${key}-${grade}`, item]),
        ),
      };
    }, {} as Record<string, string>)
);

const COLOR_KEYS = Object.keys(COLORS);

export function getColor(className: string): string | undefined {
  const variant = COLOR_KEYS.find((value) => className.endsWith(value));
  if (variant != null) {
    return COLORS[variant];
  }
  return undefined;
}

let LOADED = false;
