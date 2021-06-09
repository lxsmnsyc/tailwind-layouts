/** @jsx h */
import {
  h,
  createApp,
  defineComponent,
  reactive,
} from 'https://cdn.skypack.dev/vue@next/dist/vue.esm-browser.js';

const Lightbox = defineComponent({
  name: 'Lightbox',
  setup () {
    const state = reactive({
      expand: false,
      loading: true,
    });
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center">
        <div
          className={`w-full cursor-pointer overflow-hidden flex items-center justify-center shadow-lg rounded-lg ${state.expand ? 'fixed top-0 left-0 w-screen h-screen p-8 bg-gray-900 bg-opacity-75 rounded-none border-none z-50' : 'relative'}`}
          onClick={() => {
            state.expand = !state.expand;
          }}
        >
          <img
            alt="Forest"
            src="https://source.unsplash.com/1200x630/?forest"
            width="1200"
            height="630"
            className={`w-full h-full object-contain transition-opacity duration-200 ${state.loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => {
              state.loading = false;
            }}
          />
          {state.loading && <div className="w-full absolute h-full animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
      </div>
    );
  }
});

export default function renderApp(root: HTMLDivElement): () => void {
  const app = createApp(Lightbox);

  app.mount(root);

  return () => {
    app.unmount();
  };
}