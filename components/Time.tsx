import { lightFormat } from "date-fns";

type TimeProps = {
  time?: Date;
  yearMatch?: string;
};

export function Time({ time, yearMatch }: TimeProps) {
  return (
    <div className="flex items-center">
      <span
        className={`${
          yearMatch == "last2" ? "text-zinc-500" : "text-white"
        } text-6xl sm:text-7xl`}
      >
        {time ? lightFormat(new Date(time), "HH") : "??"}
      </span>
      <span className="text-zinc-500 text-5xl sm:text-6xl">:</span>
      <span className="text-white text-6xl sm:text-7xl">
        {time ? lightFormat(new Date(time), "mm") : "??"}
      </span>
    </div>
  );
}
