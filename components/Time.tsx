import { lightFormat } from "date-fns";
import { useEffect, useState } from "react";

type TimeProps = {
  yearMatch?: string;
};

export function Time({ yearMatch }: TimeProps) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center">
      <span
        className={`${
          yearMatch == "last2" ? "text-zinc-500" : "text-white"
        } text-6xl sm:text-7xl`}
      >
        {lightFormat(new Date(time), "HH")}
      </span>
      <span className="text-zinc-500 text-5xl sm:text-6xl">:</span>
      <span className="text-white text-6xl sm:text-7xl">
        {lightFormat(new Date(time), "mm")}
      </span>
    </div>
  );
}
