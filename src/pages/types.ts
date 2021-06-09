export type ProjectMode =
  | 'html'
  | 'react'
  | 'preact'
  | 'vue-3'
  | 'lit-html'
  | 'uhtml';

export type Project = {
  [key in ProjectMode]: string;
};

export interface Page {
  path: string;
  title: string;
  code: Project;
}
