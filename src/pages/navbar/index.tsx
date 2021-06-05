export const path = 'navbar';

export const title = 'Navbar';

export const code = `
export default function Navbar() {
  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full border dark:border-gray-800 flex items-center justify-between shadow-lg">
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
