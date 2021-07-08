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
import button from './button';

import { Project, Page } from './types';

export const ENVIRONMENTS: Project = {
  html: 'HTML',
  react: 'React',
  preact: 'Preact',
  'vue-3': 'Vue 3',
  'lit-html': 'lit-html',
  uhtml: 'uhtml',
  alpinejs: 'Alpine.js',
  'solid-js': 'SolidJS',
};

export const EXTENSIONS: Project = {
  html: 'html',
  react: 'tsx',
  preact: 'tsx',
  'vue-3': 'tsx',
  'lit-html': 'tsx',
  uhtml: 'tsx',
  alpinejs: 'html',
  'solid-js': 'tsx',
};

export const LANGUAGES: Project = {
  html: 'html',
  react: 'typescript',
  preact: 'typescript',
  'vue-3': 'typescript',
  'lit-html': 'typescript',
  uhtml: 'typescript',
  alpinejs: 'html',
  'solid-js': 'typescript',
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
  [button.path]: button,
};

export default PAGES;
