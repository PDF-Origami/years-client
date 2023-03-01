import { Button } from "./Button";
import { EventCount } from "./EventCount";
import { PreviousButton } from "./PreviousButton";

type ControlsProps = {
  showPreviousEvent: () => void;
  showNextEvent: () => void;
  eventIndex: number;
  eventCount?: number;
};

export const Controls = ({
  showNextEvent,
  showPreviousEvent,
  eventCount,
  eventIndex,
}: ControlsProps) => (
  <div className="grid grid-cols-3 justify-items-center items-center">
    <PreviousButton onClick={showPreviousEvent} />
    <EventCount index={eventIndex} count={eventCount} />
    <Button onClick={showNextEvent} />
  </div>
);
