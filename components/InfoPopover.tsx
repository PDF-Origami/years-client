import { Popover } from "@headlessui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiX } from "react-icons/hi";

export function InfoPopover() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`text-zinc-200 flex items-center gap-1 sm:gap-[6px] text-sm sm:text-base 
            rounded-full px-3 py-1`}
          >
            {<AiOutlineInfoCircle className="text-lg sm:text-xl" />}

            {"What is this?"}
          </Popover.Button>

          <Popover.Panel
            className={`absolute top-10 sm:top-11 right-0 [width:min(384px,80vw)] z-10 
          bg-gray-800 shadow-lg rounded-xl text-white px-6 py-4
          `}
          >
            I often look at the time and notice that it matches the year of a
            well-known historical event, like 14:53 (fall of Constantinople). I
            thought it&apos;d be fun to turn this concept into a web app, using
            events from Wikipedia. Enjoy!
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
