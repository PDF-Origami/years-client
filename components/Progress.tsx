import { useCallback, useEffect, useRef, useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";

const drawProgress = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, 32, 32);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#3f3f46"; // zinc-700
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#3b82f6"; // blue-500
  ctx.beginPath();
  const date = new Date();
  const ms = date.getSeconds() * 1000 + date.getMilliseconds();
  const endAngle = ms * ((2 * Math.PI) / 60000) - Math.PI / 2;
  ctx.arc(16, 16, 14, -Math.PI / 2, endAngle);
  ctx.stroke();
};

let req = 0;

type ProgressProps = {
  paused: boolean;
  togglePause: () => void;
};

export const Progress = ({ paused, togglePause }: ProgressProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const step = useCallback(
    (timestamp: number) => {
      if (!ctx) return;
      drawProgress(ctx);
      req = window.requestAnimationFrame(step);
    },
    [ctx]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCtx(ctx);
  }, []);

  useEffect(() => {
    if (paused && req) {
      window.cancelAnimationFrame(req);
      req = 0;
    } else if (ctx) {
      req = window.requestAnimationFrame(step);
    }
  }, [paused, ctx, step]);

  return (
    <div className="absolute -right-11 w-8 h-8">
      <canvas
        ref={canvasRef}
        className="absolute"
        id="canvas"
        width={32}
        height={32}
      />
      <button
        onClick={togglePause}
        className={`absolute text-white top-[8px] ${
          paused ? "left-[9px]" : "left-[8px]"
        }`}
        title={paused ? "Unpause" : "Pause"}
      >
        {paused ? <HiPlay /> : <HiPause />}
      </button>
    </div>
  );
};
