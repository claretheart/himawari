import React, { useEffect, useRef, useState } from 'react';

const COLORS = ['#FFD700', '#FF6B00', '#FF4444', '#FF69B4', '#FFF176', '#80DEEA'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Props {
  onDone: () => void;
  title?: string;
  subtitle?: string;
}

const Fireworks: React.FC<Props> = ({ onDone, title = 'TOMONI全体達成！', subtitle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];

    const launch = (x: number, y: number) => {
      for (let i = 0; i < 90; i++) {
        const angle = (Math.PI * 2 * i) / 90;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 3 + Math.random() * 4,
        });
      }
    };

    const launches: [number, number, number][] = [
      [0.25, 0.35, 0],
      [0.75, 0.30, 400],
      [0.50, 0.20, 800],
      [0.15, 0.55, 1200],
      [0.85, 0.45, 1600],
      [0.40, 0.40, 2000],
      [0.65, 0.25, 2400],
    ];

    const timers = launches.map(([rx, ry, delay]) =>
      setTimeout(() => launch(canvas.width * rx, canvas.height * ry), delay)
    );

    let animId: number;
    let active = true;

    const animate = () => {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= 0.012;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // フォールバック：最大5秒後に終了
    const fallback = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 5000);

    return () => {
      active = false;
      timers.forEach(clearTimeout);
      clearTimeout(fallback);
      cancelAnimationFrame(animId);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            borderRadius: '24px',
            padding: '32px 56px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            textAlign: 'center',
            animation: 'fireworks-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🌻🎆🌻</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e65100', letterSpacing: '2px' }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: '1rem', color: '#6d4c41', marginTop: '8px', fontWeight: 700 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fireworks-pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Fireworks;
