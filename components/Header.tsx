import { AiOutlineHourglass, AiOutlineInfoCircle } from "react-icons/ai";

export function Header() {
  return (
    <div className="flex justify-between">
      <div className="text-zinc-200 font-medium flex items-center">
        Chronology
        <AiOutlineHourglass size={22} />
        Clock
      </div>
    </div>
  );
}
