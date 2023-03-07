import { useMemo } from "react";
import { splitEventText } from "@/utils";

type Event = {
  text: string;
  links: {
    positions: number[];
    articles: string[];
  };
};

type EventTextPart = {
  id: number;
  text: string;
  article?: string;
};

type EventDisplayProps = {
  event: Event;
};

// Assemble link positions & hrefs into objects that can be directly rendered as <a> or <span>,
// depending on if .article is defined.
const getParts = ({ text, links }: Event): EventTextPart[] => {
  if (links.positions.length === 0) {
    return [
      {
        id: 0,
        text,
      },
    ];
  }

  const pos = links.positions.slice();
  const articles = links.articles.slice();
  let nextIsLink = pos[0] === 0;
  if (!nextIsLink) {
    pos.unshift(0);
  }
  if (pos[pos.length - 1] !== text.length) {
    pos.push(text.length);
  }

  const parts: EventTextPart[] = [];
  for (let i = 0; i < pos.length - 1; i++) {
    const substring = text.slice(pos[i], pos[i + 1]);
    parts.push({
      id: i,
      text: substring,
      article: nextIsLink ? articles.shift() : undefined,
    });
    nextIsLink = !nextIsLink;
  }
  return parts;
};

export const EventDisplay = ({ event }: EventDisplayProps) => {
  const [date, description] = splitEventText(event.text);
  const links = useMemo(() => {
    const positions = date
      ? event.links.positions.map((x) => x - date.length).filter((x) => x >= 0)
      : event.links.positions;
    return {
      positions,
      articles: event.links.articles.slice(
        Math.ceil((event.links.positions.length - positions.length) / 2)
      ),
    };
  }, [event]);
  const textParts = useMemo(
    () =>
      getParts({
        links,
        text: description,
      }),
    [event]
  );

  return (
    <>
      <span className="text-zinc-400">{date}</span>
      {textParts.map((part) =>
        part.article ? (
          <a
            key={part.id}
            href={`https://en.wikipedia.org/wiki/${part.article}`}
            target="_blank"
            className="text-blue-400"
          >
            {part.text}
          </a>
        ) : (
          <span key={part.id} className="text-white">
            {part.text}
          </span>
        )
      )}
      {/* <span>{description}</span> */}
    </>
  );
};
