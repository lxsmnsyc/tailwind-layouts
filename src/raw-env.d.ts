declare module 'https://cdn.skypack.dev/react' {
  import React from 'react';

  export = React;
}

declare module 'https://cdn.skypack.dev/react-dom' {
  export * from 'react-dom';
  export { default } from 'react-dom';
}

declare module 'https://cdn.skypack.dev/preact' {
  import preact from 'preact';

  export = preact;
}

declare module 'https://cdn.skypack.dev/preact/hooks' {
  export * from 'preact/hooks';
  export { default } from 'preact/hooks';
}

declare module 'https://cdn.skypack.dev/vue@next/dist/vue.esm-browser.js' {
  export * from 'vue';
  export { default } from 'vue';
}

declare module 'https://cdn.skypack.dev/lit-html' {
  export * from 'lit-html';
  export { default } from 'lit-html';
}
