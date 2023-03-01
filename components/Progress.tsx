import { useEffect, useRef, useState } from "react";

const drawProgress = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, 20, 20);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#374151";
  ctx.beginPath();
  ctx.arc(10, 10, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#2563eb";
  ctx.beginPath();
  const date = new Date();
  const ms = date.getSeconds() * 1000 + date.getMilliseconds();
  const endAngle = ms * ((2 * Math.PI) / 60000) - Math.PI / 2;
  ctx.arc(10, 10, 8, -Math.PI / 2, endAngle);
  ctx.stroke();
};

export const Progress = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCtx(ctx);
  }, []);

  useEffect(() => {
    if (ctx) {
      window.requestAnimationFrame(step);
    }
  }, [ctx]);

  const step = (timestamp: number) => {
    if (!ctx) return;
    drawProgress(ctx);
    window.requestAnimationFrame(step);
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute -right-8"
      id="canvas"
      width={20}
      height={20}
    />
  );
};
