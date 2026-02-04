'use client';

import React from 'react';

type PaintSplashProps = {
  className?: string;
  style?: React.CSSProperties;
  color?: string;          // main paint color
  intensity?: number;      // 0..1 (opacity/strength)
  seed?: number;           // optional fixed seed to keep splash identical across renders
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generates a blobby “splash” path by varying radius around a circle
function makeSplashPath(rand: () => number, cx: number, cy: number) {
  const points = 28;               // more = smoother
  const baseR = 120;
  const wobble = 20;               // how spiky/irregular
  const angleStep = (Math.PI * 2) / points;

  const radii = Array.from({ length: points }, (_, i) => {
    // mix of smooth + spiky variation
    const smooth = Math.sin(i * 1.7) * 0.35 + Math.cos(i * 0.9) * 0.25;
    const spike = (rand() - 0.5) * 1.0;
    return baseR + wobble * (0.55 * smooth + 0.45 * spike);
  });

  // Convert polar points to cartesian and build a smooth closed path (Catmull-Rom-ish via quadratic)
  const pts = radii.map((r, i) => {
    const a = i * angleStep;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });

  // Start path
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length + 1; i++) {
    const p0 = pts[(i - 1) % pts.length];
    const p1 = pts[i % pts.length];
    const mx = ((p0.x + p1.x) / 2).toFixed(2);
    const my = ((p0.y + p1.y) / 2).toFixed(2);
    d += ` Q ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} ${mx} ${my}`;
  }
  d += ' Z';
  return d;
}

function makeDroplets(rand: () => number) {
  const droplets: Array<{ cx: number; cy: number; r: number; o: number }> = [];
  const count = 10 + Math.floor(rand() * 10);

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = 145 + rand() * 70;  // outside main splash
    const cx = 200 + Math.cos(angle) * dist;
    const cy = 200 + Math.sin(angle) * dist;
    const r = 4 + rand() * 18;
    const o = 0.35 + rand() * 0.55;
    droplets.push({ cx, cy, r, o });
  }
  return droplets;
}

export const PaintSplash: React.FC<PaintSplashProps> = ({
  className,
  style,
  color = '#15FF00',
  intensity = 0.75,
  seed,
}) => {
  const uid = React.useId();

  // Create a stable seed:
  // - if seed prop provided: use it
  // - else derive from uid (string) deterministically
  const derivedSeed = React.useMemo(() => {
    if (typeof seed === 'number') return seed >>> 0;
    // quick string hash from uid
    let h = 2166136261;
    for (let i = 0; i < uid.length; i++) {
      h ^= uid.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }, [seed, uid]);

  const rand = React.useMemo(() => mulberry32(derivedSeed), [derivedSeed]);

  const splashPath = React.useMemo(() => makeSplashPath(rand, 200, 200), [rand]);
  const droplets = React.useMemo(() => makeDroplets(rand), [rand]);

  const splashId = `splash-${uid}`;
  const maskId = `mask-${uid}`;
  const gradId = `grad-${uid}`;
  const edgeId = `edge-${uid}`;
  const gritId = `grit-${uid}`;

  return (
    <div className={`pointer-events-none absolute ${className ?? ''}`} style={style}>
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ opacity: intensity }}
      >
        <defs>
          {/* Paint shading */}
          <radialGradient id={gradId} cx="38%" cy="35%" r="70%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="55%" stopColor={color} stopOpacity="0.75" />
            <stop offset="100%" stopColor={color} stopOpacity="0.25" />
          </radialGradient>

          {/* Rough edges: turbulence + displacement */}
          <filter id={edgeId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="3"
              seed={derivedSeed % 999}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
            {/* slight soften */}
            <feGaussianBlur stdDeviation="0.35" />
          </filter>

          {/* Grit texture to overlay inside splash */}
          <filter id={gritId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed={(derivedSeed * 3) % 999}
              result="grain"
            />
            <feColorMatrix in="grain" type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.55 0" />
          </filter>

          {/* Mask keeps grit inside paint only */}
          <mask id={maskId}>
            <rect width="400" height="400" fill="black" />
            <path d={splashPath} fill="white" />
            {droplets.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="white" />
            ))}
          </mask>
        </defs>

        {/* Main splash body */}
        <g filter={`url(#${edgeId})`}>
          <path id={splashId} d={splashPath} fill={`url(#${gradId})`} />
          {droplets.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color} opacity={d.o} />
          ))}
        </g>

        {/* Darker pooled areas / depth (subtle) */}
        <g opacity="0.22" filter={`url(#${edgeId})`}>
          <path
            d={splashPath}
            fill="black"
            transform="translate(6 10)"
          />
        </g>

        {/* Grit overlay inside the paint */}
        <g mask={`url(#${maskId})`} style={{ mixBlendMode: 'overlay' }} opacity="0.35">
          <rect width="400" height="400" filter={`url(#${gritId})`} />
        </g>

        {/* Tiny highlight specks */}
        <g opacity="0.22">
          {Array.from({ length: 18 }).map((_, i) => {
            const a = rand() * Math.PI * 2;
            const dist = 30 + rand() * 120;
            const cx = 200 + Math.cos(a) * dist;
            const cy = 200 + Math.sin(a) * dist;
            const r = 1 + rand() * 3;
            return <circle key={i} cx={cx} cy={cy} r={r} fill="white" />;
          })}
        </g>
      </svg>
    </div>
  );
};
