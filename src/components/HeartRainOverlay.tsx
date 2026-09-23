import React, { useEffect, useRef } from 'react';

interface HeartRainProps {
  density?: number; // Number of active falling hearts
  speedMultiplier?: number;
}

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

const HEART_COLORS = [
  '#c62845', // Signature Red
  '#e63946', // Vibrant Red
  '#ff4d6d', // Sweet Rose
  '#ff758f', // Soft Pink
  '#a11c34', // Deep Crimson
  '#ff8fa3', // Translucent Blush
];

export const HeartRainOverlay: React.FC<HeartRainProps> = ({
  density = 28,
  speedMultiplier = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles uniformly distributed across the screen
    const particles: HeartParticle[] = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 10, // 10px to 22px
        speed: (Math.random() * 1.2 + 0.8) * speedMultiplier,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmplitude: Math.random() * 1.5 + 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.45 + 0.35, // 0.35 to 0.8
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
      });
    }

    // Helper to draw a heart path on the canvas context
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = opacity;
      context.fillStyle = color;

      const scale = size / 24;
      context.beginPath();
      // SVG path for a perfect cute heart normalized to 24x24 box
      // M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z
      const cx = 12 * scale;
      const cy = 12 * scale;
      context.translate(-cx, -cy);

      context.moveTo(12 * scale, 21.35 * scale);
      context.bezierCurveTo(
        5.4 * scale,
        15.36 * scale,
        2 * scale,
        12.28 * scale,
        2 * scale,
        8.5 * scale
      );
      context.bezierCurveTo(
        2 * scale,
        5.42 * scale,
        4.42 * scale,
        3 * scale,
        7.5 * scale,
        3 * scale
      );
      context.bezierCurveTo(
        9.24 * scale,
        3 * scale,
        10.91 * scale,
        3.81 * scale,
        12 * scale,
        5.09 * scale
      );
      context.bezierCurveTo(
        13.09 * scale,
        3.81 * scale,
        14.76 * scale,
        3 * scale,
        16.5 * scale,
        3 * scale
      );
      context.bezierCurveTo(
        19.58 * scale,
        3 * scale,
        22 * scale,
        5.42 * scale,
        22 * scale,
        8.5 * scale
      );
      context.bezierCurveTo(
        22 * scale,
        12.28 * scale,
        18.6 * scale,
        15.36 * scale,
        13.45 * scale,
        20.03 * scale
      );
      context.closePath();
      context.fill();

      context.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sway back and forth gently like a falling petal or leaf
        p.swayOffset += p.swaySpeed;
        const currentX = p.x + Math.sin(p.swayOffset) * (p.swayAmplitude * 12);
        p.y += p.speed;
        p.rotation += p.rotationSpeed;

        // Wrap around when heart reaches bottom
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (currentX < -30) {
          p.x = width + 20;
        } else if (currentX > width + 30) {
          p.x = -20;
        }

        drawHeart(ctx, currentX, p.y, p.size, p.color, p.opacity, p.rotation);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [density, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
