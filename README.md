# tailwind-layouts

![Untitled](https://user-images.githubusercontent.com/4783372/120806881-f4943380-c579-11eb-883f-30f9eeb4cefd.png)

> A collection of [Tailwind](https://tailwindcss.com) Layouts

## Playground

The website includes a client-side playground which allows components to be rendered and tweaked in real-time.

### Editor

`tailwind-layouts` uses [Microsoft's Monaco Editor](https://microsoft.github.io/monaco-editor/) (more specifically, [@monaco-editor/react](https://monaco-react.surenatoyan.com/)) to view and edit the component's code.

### Live Code

`tailwind-layouts` uses [ESBuild](https://esbuild.github.io/) to transform and render the component in real-time. JSX and TypeScript is supported, but the compiled code is transformed into ES2017 for browser compatibility. The compiled code format is also in ESM.

Since Tailwind only generates classes during build-time, `tailwind-layouts` instead uses [`twind`](https://twind.dev/) to generate classes on runtime, as well as add support for JIT.

#### CDN Imports

Since the compiled code's format is in ESM, `tailwind-layouts` allows CDN imports. You can check out [Skypack](http://skypack.dev/).

### Environments

`tailwind-layouts` currently supports the following implementations:

- [React](https://reactjs.org/)
- [Preact](https://preactjs.com/)
- [Vue 3](https://v3.vuejs.org/)
- [`lit-html`](http://lit-html.polymer-project.org/)

Upcoming implemenations:

- Vanilla JS
- Inferno
- Vue 2

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
