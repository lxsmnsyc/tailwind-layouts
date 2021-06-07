export type ProjectMode =
| 'react'
| 'preact'
| 'vue-3'
| 'lit-html';

export type Project = {
  [key in ProjectMode]: string;
};

export interface Page {
  path: string;
  title: string;
  code: Project;
}
