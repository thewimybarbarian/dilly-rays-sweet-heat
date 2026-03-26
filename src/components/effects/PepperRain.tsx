"use client";

import { useEffect, useRef } from "react";

interface PepperRainProps {
  density?: number;
  speed?: number;
  wind?: number;
  opacity?: number;
}

interface Pepper {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  speed: number;
  wind: number;
}

export default function PepperRain({
  density = 3,
  speed = 2,
  wind = 0.5,
  opacity = 0.3,
}: PepperRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const peppersRef = useRef<Pepper[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number>(0);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load pepper image
    const img = new Image();
    img.src = "/images/pepper.svg";
    imageRef.current = img;

    // Resize canvas to fill viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnPepper = (): Pepper => ({
      x: Math.random() * canvas.width,
      y: -40,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      size: 16 + Math.random() * 20,
      speed: speed * (0.5 + Math.random()),
      wind: wind * (Math.random() - 0.3),
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCountRef.current++;

      // Spawn new peppers every ~10 frames
      if (frameCountRef.current % 10 === 0) {
        for (let i = 0; i < density; i++) {
          peppersRef.current.push(spawnPepper());
        }
      }

      // Update and draw
      peppersRef.current = peppersRef.current.filter((p) => {
        p.y += p.speed;
        p.x += p.wind;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 40) return false;

        if (imageRef.current?.complete) {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(
            imageRef.current,
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
          );
          ctx.restore();
        }

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Wait for image to load before starting animation
    img.onload = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    // Fallback: start anyway if image loads from cache
    if (img.complete) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      peppersRef.current = [];
    };
  }, [density, speed, wind, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
