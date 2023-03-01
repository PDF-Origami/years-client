type EventCountProps = {
  index: number;
  count?: number;
};

export const EventCount = ({ index, count }: EventCountProps) => (
  <div className="text-white text-sm">
    <span>{index + 1}</span>
    <span>/</span>
    <span>{count ?? "?"}</span>
  </div>
);
