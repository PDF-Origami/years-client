type PreviousButtonProps = {
  onClick: () => void;
};

export const PreviousButton = ({ onClick }: PreviousButtonProps) => {
  return (
    <button
      className="text-white text-sm text-right justify-self-end select-none"
      onClick={onClick}
    >
      Previous
    </button>
  );
};
