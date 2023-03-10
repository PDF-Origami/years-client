import Head from "next/head";
import useSWRImmutable from "swr/immutable";
import { preload } from "swr";
import { addMinutes } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineHourglass } from "react-icons/ai";

import { EventDisplay } from "@/components/EventDisplay";
import { Clock } from "@/components/Clock";
import { Controls } from "@/components/Controls";
import { shuffleArray, timeAsYear } from "@/utils";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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
  const [time, setTime] = useState<Date>();
  const [paused, setPaused] = useState<boolean>(false);
  const [prefetchedNext, setPrefetchedNext] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);
  const { data } = useSWRImmutable(
    timeAsYear(time ?? new Date()),
    eventFetcher
  );

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

  const clockStep = useCallback(() => {
    const newTime = new Date();
    setTime(newTime);
    if (newTime.getSeconds() > prefetchTime && !prefetchedNext) {
      // Prefetch
      preload(timeAsYear(addMinutes(newTime, 1)), eventFetcher);
      setPrefetchedNext(true);
    }
  }, [prefetchedNext]);

  // Effects
  useEffect(() => {
    setTime(new Date());
  }, []);

  useEffect(() => {
    setEventIndex(0);
    setPrefetchedNext(false);
  }, [data]);

  useEffect(() => {
    if (paused) {
      clearInterval(timer);
    } else {
      timer = setInterval(clockStep, 500);
      return () => clearInterval(timer);
    }
  }, [paused, clockStep]);

  return (
    <>
      <Head>
        <title>
          {`${
            time ? Number(timeAsYear(time)) : "Loading..."
          }  - Chronology Clock ${
            process.env.NODE_ENV === "development" ? " (DEV)" : ""
          }`}
        </title>
        <meta
          name="description"
          content="See historical events based on the current time"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-5 px-6 h-screen flex flex-col">
        <Header />
        <div className="flex justify-center h-full items-center">
          <div className="max-w-xl w-full flex flex-col items-center gap-6 sm:gap-8">
            <Clock
              year={data?.year}
              yearMatch={data?.yearMatch}
              time={time}
              paused={paused}
              togglePause={togglePause}
            />
            <div
              className={`text-white sm:leading-7 sm:text-lg h-72
                        overflow-y-auto bg-gray-800 rounded-xl px-5 p-4 w-full 
                        scrollbar-thin scrollbar-thumb-gray-700 scrollbar-thumb-rounded-lg`}
            >
              {data ? (
                <EventDisplay event={data.events[eventIndex]} />
              ) : (
                <div className="flex flex-col gap-5 animate-pulse py-2">
                  <div className="bg-gray-600 h-4 rounded-full" />
                  <div className="bg-gray-600 h-4 rounded-full" />
                  <div className="bg-gray-600 h-4 rounded-full" />
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
        </div>
        <Footer year={data?.year} />
      </main>
    </>
  );
}
