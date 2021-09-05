
import { loadWASM } from 'onigasm';
import onigasm from 'onigasm/lib/onigasm.wasm?url';
// loader.config({
//   paths: {
//     vs: 'https://unpkg.com/monaco-editor/min/vs',
//   },
// });

let LOADED = false

export default async function loadMonaco(): Promise<void> {
  if (!LOADED) {
    LOADED = true;
    await loadWASM(onigasm);
    await Promise.all([
      import('./theme').then((mod) => mod.default()),
      import('./typescript').then((mod) => mod.default()),
      import('./hover').then((mod) => mod.default()),
      import('./suggestions').then((mod) => mod.default()),
    ]);
  }
}
