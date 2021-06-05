export const path = 'diagonal-section';

export const title = 'Diagonal Section';

export const code = `
function DiagonalSection({ children }) {
  return (
    <div className="relative w-full h-64">
      <div className="absolute left-0 top-0 w-full h-full transform-gpu -skew-y-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
      {children}
    </div>
  );
}

export default function DiagonalSectionExample() {
  return (
    <div className="py-8 w-full h-full flex items-center justify-center">
      <DiagonalSection>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-xl text-white z-10">Lorem Ipsum</span>
        </div>
      </DiagonalSection>
    </div>
  );
}
`;
