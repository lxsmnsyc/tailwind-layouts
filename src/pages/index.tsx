import * as card from './card';
import * as feedback from './feedback';
import * as image from './image';
import * as lightbox from './lightbox';
import * as snippet from './snippet';
import * as appWindow from './app-window';
import * as browserWindow from './browser-window';
import * as avatar from './avatar';

interface Page {
  path: string;
  title: string;
  code: string;
}

const PAGES: Record<string, Page> = {
  [card.path]: card,
  [feedback.path]: feedback,
  [image.path]: image,
  [lightbox.path]: lightbox,
  [snippet.path]: snippet,
  [appWindow.path]: appWindow,
  [browserWindow.path]: browserWindow,
  [avatar.path]: avatar,
};

export default PAGES;
