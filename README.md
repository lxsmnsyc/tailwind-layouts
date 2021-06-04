# tailwind-layouts

> A collection of Tailwind Layouts

## Playground

The website includes a client-side playground which allows components to be rendered and tweaked in real-time.

### Editor

`tailwind-layouts` uses [Microsoft's Monaco Editor](https://microsoft.github.io/monaco-editor/) (more specifically, [@monaco-editor/react](https://monaco-react.surenatoyan.com/)) to view and edit the component's code.

### Live Code

`tailwind-layouts` uses [ESBuild](https://esbuild.github.io/) to transform and render the component in real-time. JSX and TypeScript is supported, but the compiled code is transformed into ES2017 for browser compatibility. The compiled code format is also in ESM.

#### CDN Imports

Since the compiled code's format is in ESM, `tailwind-layouts` allows CDN imports. You can check out [Skypack](http://skypack.dev/).

## To be added

- Support for HTML (Vanilla), Vue and other libraries/frameworks
- Add a tool drawer for tweaking Tailwind code through GUI.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
