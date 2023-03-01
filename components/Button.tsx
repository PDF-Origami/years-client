import { HiArrowRight } from "react-icons/hi";

type ButtonProps = {
  onClick: () => void;
};

export const Button = ({ onClick }: ButtonProps) => {
  return (
    <button
      className={`border-2 border-blue-700 hover:bg-blue-700 
      rounded-full text-white font-medium px-4 py-2 flex items-center gap-1
      focus:outline-none focus-visible:bg-blue-700 select-none`}
      onClick={onClick}
    >
      Next
      <HiArrowRight size="18" />
    </button>
  );
};
