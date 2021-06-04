export const path = 'navbar';

export const title = 'Navbar';

export const code = `
export default function Navbar() {
  return (
    <div className="m-8">
      <div className="w-full border dark:border-gray-900 flex items-center justify-between shadow-lg">
        <div className="p-4">
          <a href="#" className="text-xl font-bold">
            Title
          </a>
        </div>
        <div className="flex p-2 text-sm font-semibold">
          <a href="#" className="p-2">
            Page 1
          </a>
          <a href="#" className="p-2">
            Page 2
          </a>
          <a href="#" className="p-2">
            Page 3
          </a>
        </div>
      </div>
    </div>
  );
}
`;
