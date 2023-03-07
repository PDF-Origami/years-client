import Head from "next/head";
import useSWRImmutable from "swr/immutable";
import { preload } from "swr";
import { addMinutes } from "date-fns";
import { useCallback, useEffect, useState } from "react";

import { EventDisplay } from "@/components/EventDisplay";
import { Clock } from "@/components/Clock";
import { Controls } from "@/components/Controls";
import { shuffleArray, timeAsYear } from "@/utils";

const eventFetcher = async (year: string) => {
  let response;
  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?year=${year}`
    );
  } catch (e) {
    return Promise.reject("Failed to fetch");
  }

  const data = await response.json();
  return { ...data, events: shuffleArray(data.events) };
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// When the clock shows this many seconds, prefetch next year's events.
// Randomized to prevent accidental ddos
const prefetchTime = getRandomInt(45, 55);
let timer: NodeJS.Timer;

export default function Home() {
  // State
  const [time, setTime] = useState<Date>(new Date());
  const [paused, setPaused] = useState<boolean>(false);
  const [prefetchedNext, setPrefetchedNext] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);
  const { data } = useSWRImmutable(timeAsYear(time), eventFetcher);

  // Callbacks
  const showNextEvent = useCallback(
    () =>
      setEventIndex((prevIndex) =>
        data?.events?.length > 0 ? (prevIndex + 1) % data.events.length : 0
      ),
    [data]
  );

  const showPreviousEvent = useCallback(() => {
    return setEventIndex((prevIndex) => {
      if (!data?.events?.length) return 0;
      if (prevIndex === 0) return data.events.length - 1;
      return prevIndex - 1;
    });
  }, [data]);

  const togglePause = useCallback(() => setPaused((old) => !old), []);

  // Effects
  useEffect(() => {
    setEventIndex(0);
    setPrefetchedNext(false);
  }, [data]);

  useEffect(() => {
    if (paused) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        const newTime = new Date();
        setTime(newTime);
        if (newTime.getSeconds() > prefetchTime && !prefetchedNext) {
          // Prefetch
          preload(timeAsYear(addMinutes(newTime, 1)), eventFetcher);
          setPrefetchedNext(true);
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, [paused]);

  return (
    <>
      <Head>
        <title>
          {`${timeAsYear(time)} - Years${
            process.env.NODE_ENV === "development" && " (DEV)"
          }`}
        </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen items-center">
        <div className="px-8 max-w-xl w-full flex flex-col items-center gap-8 sm:gap-8">
          <Clock
            year={data?.year}
            yearMatch={data?.yearMatch}
            time={time}
            paused={paused}
            togglePause={togglePause}
          />
          <div
            className={`text-white sm:leading-7 sm:text-lg h-72
                        overflow-y-auto bg-zinc-800 rounded-xl px-5 p-4 w-full 
                        scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-thumb-rounded-lg`}
          >
            {data ? (
              <EventDisplay event={data.events[eventIndex]} />
            ) : (
              <div className="flex flex-col gap-5 animate-pulse py-2">
                <div className="bg-zinc-600 h-4 rounded-full" />
                <div className="bg-zinc-600 h-4 rounded-full" />
                <div className="bg-zinc-600 h-4 rounded-full" />
              </div>
            )}
          </div>

          <Controls
            showNextEvent={showNextEvent}
            showPreviousEvent={showPreviousEvent}
            eventIndex={eventIndex}
            eventCount={data?.events?.length}
          />
        </div>
      </main>
    </>
  );
}
