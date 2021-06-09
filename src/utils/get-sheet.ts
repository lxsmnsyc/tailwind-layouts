import { create } from 'twind';
import { virtualSheet } from 'twind/sheets';
import cssbeautify from './beautify-css';

export default function getSheet(classes: string, darkMode: 'media' | 'class'): string {
  const sheet = virtualSheet();
  const { tw } = create({
    preflight: false,
    sheet,
    darkMode,
  });
  tw(classes);
  return cssbeautify(sheet.target.join('\n'));
}
