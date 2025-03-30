import React, { useEffect, useState } from "react";
import "./SparkleTrail.css";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

interface SparkleTrailProps {
  trigger?: boolean; 
  boundsRef: React.RefObject<HTMLDivElement>;
}

const SparkleTrail: React.FC<SparkleTrailProps> = ({ trigger, boundsRef }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setSparkles((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 300);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boundsRef.current) return;
    const rect = boundsRef.current.getBoundingClientRect();
    addSparkle(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!boundsRef.current) return;
    const touch = e.touches[0];
    const rect = boundsRef.current.getBoundingClientRect();
    addSparkle(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  useEffect(() => {
    if (!trigger) return;

    const interval = setInterval(() => {
      if (!boundsRef.current) return;
      const width = boundsRef.current.offsetWidth;
      const height = boundsRef.current.offsetHeight;

      const x = Math.random() * width;
      const y = Math.random() * height;
      addSparkle(x, y);
    }, 120);

    setTimeout(() => clearInterval(interval), 1200);
  }, [trigger]);

  return (
    <>
      {/* Event handlers wrapper */}
      <div
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="absolute inset-0 z-50 pointer-events-none"
      >
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute text-yellow-400 animate-sparkle"
            style={{
              left: s.x,
              top: s.y,
              fontSize: "1.1rem",
              transform: "translate(-50%, -50%)",
            }}
          >
            {Math.random() > 0.5 ? "🌙" : "✨"}
          </div>
        ))}
      </div>
    </>
  );
};

export default SparkleTrail;
