import { splitEventText } from "@/utils";

type EventType = {
  text: string;
};

type EventProps = {
  event?: EventType;
  year?: number;
};

export const Event = ({ event, year }: EventProps) => {
  const divClasses = `text-white sm:leading-7 sm:text-lg h-72
    overflow-y-auto bg-zinc-800 rounded-xl px-5 p-4 w-full 
    scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-thumb-rounded-lg`;

  if (event && year) {
    const [date, description] = splitEventText(event.text);
    return (
      <div className="flex flex-col items-center w-full gap-3">
        <div className={divClasses}>
          <span className="text-zinc-400">{date}</span>
          <span>{description}</span>
        </div>
      </div>
    );
  }

  return <div className={divClasses} />;
};
