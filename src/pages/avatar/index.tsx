export const path = 'avatar';

export const title = 'Avatar';

export const code = `
function Avatar({ src }) {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative rounded-full w-full h-full overflow-hidden shadow">
      <img
        src={src}
        width="256"
        height="256"
        className={\`w-full h-auto transition-opacity duration-300 \${loading ? 'opacity-0' : 'opacity-100'} \`}
        onLoad={() => {
          setLoading(false);
        }}
      />
      {loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
    </div>
  );
}

export default function AvatarDemo() {
  return (
    <div className="m-8 flex items-center justify-center flex-row">
      <div className="w-32 h-32 m-1">
        <Avatar src="https://source.unsplash.com/256x256" />
      </div>
      <div className="w-16 h-16 m-1">
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
`;
