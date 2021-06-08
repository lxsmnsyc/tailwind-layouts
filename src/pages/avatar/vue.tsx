/** @jsx h */
import {
  h,
  createApp,
  defineComponent,
  reactive,
  toRefs,
} from 'https://cdn.skypack.dev/vue@next/dist/vue.esm-browser.js';

const Avatar = defineComponent({
  name: 'Avatar',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const { src } = toRefs(props);
    const state = reactive({
      loading: true,
    });
    return () => (
      <div className="relative rounded-full w-full h-full overflow-hidden shadow">
        <img
          alt="Avatar"
          src={src.value}
          width="256"
          height="256"
          className={`w-full h-auto transition-opacity duration-200 ${state.loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => {
            state.loading = false;
          }}
        />
        {state.loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
      </div>
    );
  }
});

const AvatarDemo = defineComponent({
  name: 'AvatarDemo',
  setup () {
    return () => (
      <div className="p-8 w-full h-full flex items-center justify-center flex-row flex-wrap">
        <div className="w-32 h-32 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-24 h-24 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-16 h-16 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-12 h-12 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-8 h-8 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
        <div className="w-4 h-4 m-1">
          <Avatar src="https://source.unsplash.com/256x256" />
        </div>
      </div>
    );
  }
});

export default function renderApp(root) {
  const app = createApp(AvatarDemo);

  app.mount(root);

  return () => {
    app.unmount();
  };
}
