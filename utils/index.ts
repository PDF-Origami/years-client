import { lightFormat } from "date-fns";

// Fisher-Yates
export const shuffleArray = <T>(original: T[]): T[] => {
  const arr = original.slice();
  for (let i = arr.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * i);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};

const pattern =
  /^(c\.|January|February|March|April|May|June|July|August|September|October|November|December|Spring|Summer|Fall|Autumn|Winter|\s|\d)+(\s[-–—])/;

export const splitEventText = (text: string) => {
  const match = text.match(pattern);
  const date = match ? match[0] : "";
  const description = text.substring(date.length);
  return [date, description];
};

export const timeAsYear = (time: Date) => lightFormat(time, "HHmm");
