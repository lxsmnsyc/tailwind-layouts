import card from './card';
import feedback from './feedback';
import image from './image';
import lightbox from './lightbox';
import snippet from './snippet';
import appWindow from './app-window';
import browserWindow from './browser-window';
import avatar from './avatar';
import diagonalSection from './diagonal-section';
import notification from './notification';
import navbar from './navbar';
import tag from './tag';

import { Project, Page } from './types';

export const ENVIRONMENTS: Project = {
  react: 'React',
  'vue-3': 'Vue 3',
  'lit-html': 'lit-html',
};

const PAGES: Record<string, Page> = {
  [card.path]: card,
  [feedback.path]: feedback,
  [image.path]: image,
  [lightbox.path]: lightbox,
  [snippet.path]: snippet,
  [appWindow.path]: appWindow,
  [browserWindow.path]: browserWindow,
  [avatar.path]: avatar,
  [diagonalSection.path]: diagonalSection,
  [notification.path]: notification,
  [navbar.path]: navbar,
  [tag.path]: tag,
};

export default PAGES;
