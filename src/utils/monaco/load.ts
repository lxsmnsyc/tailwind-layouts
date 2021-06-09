import { useMonaco } from '@monaco-editor/react';

export default async function load(
  monaco: NonNullable<ReturnType<typeof useMonaco>>,
): Promise<void> {
  await Promise.all([
    import('./typescript').then((mod) => mod.default(monaco)),
    import('./hover').then((mod) => mod.default(monaco)),
    import('./suggestions').then((mod) => mod.default(monaco)),
  ]);
}
