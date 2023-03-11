import { AiOutlineHourglass, AiOutlineInfoCircle } from "react-icons/ai";
import { InfoPopover } from "./InfoPopover";

export function Header() {
  return (
    <div className="flex justify-between">
      <div className="text-zinc-200 font-medium flex items-center">
        Chronology
        <AiOutlineHourglass size={22} />
        Clock
      </div>
      <InfoPopover />
      {/* <p className="text-zinc-200 flex items-center gap-1 sm:gap-[6px] text-sm sm:text-base">
        <AiOutlineInfoCircle className="text-lg sm:text-xl" />
        What is this?
      </p> */}
    </div>
  );
}
