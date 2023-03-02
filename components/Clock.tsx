import { timeAsYear } from "@/utils";
import { HiArrowDown } from "react-icons/hi";
import { Progress } from "./Progress";
import { Time } from "./Time";

type ClockProps = {
  yearMatch?: string;
  year?: number;
  time: Date;
};

export const Clock = ({ time, year, yearMatch }: ClockProps) => {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-3 relative">
        <Time time={time} yearMatch={yearMatch} />
        <Progress />
      </div>
      <p className="text-white text-2xl">
        <HiArrowDown />
      </p>
      <p className="text-white text-2xl sm:text-3xl">
        {year ? <span>{year} </span> : <span>???? </span>}
        <span className="text-zinc-100 font-medium text-xl sm:text-2xl">
          CE
        </span>
      </p>
      {yearMatch && yearMatch !== "full" && (
        <span className="text-zinc-300 text-xs">
          (No events found for {timeAsYear(time)})
        </span>
      )}
    </div>
  );
};