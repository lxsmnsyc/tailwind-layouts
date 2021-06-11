import { loader, useMonaco } from '@monaco-editor/react';

loader.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor/min/vs',
  },
});

type Monaco = NonNullable<ReturnType<typeof useMonaco>>;

export default async function loadMonaco(): Promise<Monaco> {
  const monaco = await loader.init();
  await Promise.all([
    import('./theme').then((mod) => mod.default(monaco)),
    import('./typescript').then((mod) => mod.default(monaco)),
    import('./hover').then((mod) => mod.default(monaco)),
    import('./suggestions').then((mod) => mod.default(monaco)),
  ]);
  return monaco;
}
