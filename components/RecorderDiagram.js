import React, { useId } from 'react';

// Front view of a Baroque-style recorder, held upright: beak and window at the
// top, then the body with seven finger holes, a flared bell at the foot, and the
// thumb hole (which is on the BACK of a real instrument) drawn off to the left.
//
// It is an illustration, rendered to look like a real instrument: turned
// boxwood/maple with grain, a soft highlight down the tube, beaded rings and
// bevelled tone holes.
//
// `holes` is 8 characters: thumb, then holes 1-7 (see data/fingerings.js).
//   '#' covered   '.' open   '/' half covered (one hole of a double pair)
// Holes 6 and 7 are the double holes on a real recorder, drawn as two small
// holes side by side.

const INK = '#2c3e50'; // site text colour, used for covered holes and the label
const EDGE = '#4a3220'; // dark walnut outline for the instrument itself
const W = 100;
const H = 292;
const CX = 50;

// Vertical centres of finger holes 1..7
const HOLE_Y = [94, 118, 142, 178, 202, 228, 252];
const THUMB = { x: 25, y: 84 };

const R_SINGLE = 5.6;
const R_DOUBLE = 3.7;
const DOUBLE_OFFSET = 7.2;

// Outlines (shared by the fill, the grain clip and the highlight)
const HEAD = 'M42 8 Q50 2 58 8 L67 48 L33 48 Z';
const BODY = 'M33 52 L67 52 L64 270 L36 270 Z';
const BELL = 'M35 268 L65 268 Q66 280 71 288 L29 288 Q34 280 35 268 Z';

const RecorderDiagram = ({ holes, label, width = 84 }) => {
  const uid = useId().replace(/:/g, '');
  const id = (n) => `${n}-${uid}`;
  const [thumb, ...fronts] = holes.split('');

  // A tone hole: bevelled rim, empty ring when open, solid pad when covered.
  const hole = (key, cx, cy, r, closed) => (
    <g key={key}>
      {/* soft shadow around the rim so the hole sits in the wood */}
      <circle cx={cx} cy={cy} r={r + 1.6} fill="#5b3b1c" opacity="0.28" />
      {closed ? (
        <>
          <circle cx={cx} cy={cy} r={r} fill={INK} stroke="#1b2733" strokeWidth="1.2" />
          <ellipse cx={cx - r * 0.3} cy={cy - r * 0.35} rx={r * 0.38} ry={r * 0.26} fill="#fff" opacity="0.22" />
        </>
      ) : (
        <>
          <circle cx={cx} cy={cy} r={r} fill={`url(#${id('bore')})`} stroke={INK} strokeWidth="1.6" />
          <path d={`M ${cx - r + 1} ${cy - 0.4} A ${r - 1} ${r - 1} 0 0 1 ${cx + r - 1} ${cy - 0.4}`} fill="none" stroke="#5b3b1c" strokeOpacity="0.35" strokeWidth="1.1" strokeLinecap="round" />
        </>
      )}
    </g>
  );

  // A turned bead/ring around the tube, with a highlight and a shadow line.
  const ring = (y, x, w, h = 5) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2.2" fill={`url(#${id('ring')})`} stroke={EDGE} strokeWidth="1.1" />
      <line x1={x + 2} y1={y + 1.2} x2={x + w - 2} y2={y + 1.2} stroke="#fff" strokeOpacity="0.45" strokeWidth="0.7" />
      <line x1={x + 2} y1={y + h - 1} x2={x + w - 2} y2={y + h - 1} stroke="#000" strokeOpacity="0.25" strokeWidth="0.7" />
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={(width * H) / W}
      role="img"
      aria-label={label}
      style={{ display: 'block', margin: '0 auto' }}
    >
      <defs>
        {/* boxwood/maple, shaded across the tube so it reads as a cylinder */}
        <linearGradient id={id('wood')} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#a8773f" />
          <stop offset="0.14" stopColor="#d6a967" />
          <stop offset="0.38" stopColor="#f2d9a6" />
          <stop offset="0.62" stopColor="#e3c088" />
          <stop offset="0.88" stopColor="#bd8a50" />
          <stop offset="1" stopColor="#8d6232" />
        </linearGradient>
        {/* darker turned rings */}
        <linearGradient id={id('ring')} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6d4724" />
          <stop offset="0.35" stopColor="#a8773f" />
          <stop offset="0.55" stopColor="#c99a60" />
          <stop offset="1" stopColor="#5e3d1e" />
        </linearGradient>
        {/* open tone hole: reads as an empty ring (light centre, soft inner shadow) */}
        <radialGradient id={id('bore')} cx="0.5" cy="0.6" r="0.62">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="0.7" stopColor="#f6ecd6" />
          <stop offset="1" stopColor="#c9b48f" />
        </radialGradient>
        {/* glossy highlight streak down the tube */}
        <linearGradient id={id('gloss')} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* window interior: dark bore falling away */}
        <linearGradient id={id('window')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1c130b" />
          <stop offset="1" stopColor="#4a3523" />
        </linearGradient>
        {/* wood grain: stretched noise, running along the tube */}
        <filter id={id('grain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55 0.035" numOctaves="2" seed="7" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.36  0 0 0 0 0.22  0 0 0 0 0.09  0 0 0 1.5 -0.55"
          />
        </filter>
        <clipPath id={id('shape')}>
          <path d={HEAD} />
          <path d={BODY} />
          <path d={BELL} />
        </clipPath>
      </defs>

      {/* contact shadow so it sits on the card */}
      <ellipse cx="52" cy="290" rx="24" ry="2.2" fill="#000" opacity="0.14" />

      {/* Wood fill for head, body and bell */}
      <g strokeLinejoin="round">
        <path d={HEAD} fill={`url(#${id('wood')})`} />
        <path d={BODY} fill={`url(#${id('wood')})`} />
        <path d={BELL} fill={`url(#${id('wood')})`} />
      </g>

      {/* Grain and gloss, clipped to the instrument */}
      <g clipPath={`url(#${id('shape')})`}>
        <rect x="26" y="0" width="48" height={H} filter={`url(#${id('grain')})`} opacity="0.55" />
        <rect x="38" y="0" width="7" height={H} fill={`url(#${id('gloss')})`} />
      </g>

      {/* Outlines */}
      <g fill="none" stroke={EDGE} strokeWidth="1.8" strokeLinejoin="round">
        <path d={HEAD} />
        <path d={BODY} />
        <path d={BELL} />
      </g>

      {/* Beak: lip at the tip and the sloped cut the player's mouth sits on */}
      <path d="M43 9.5 Q50 4.6 57 9.5 L58.4 18 Q50 21 41.6 18 Z" fill="#5e3d1e" opacity="0.55" />
      <path d="M45.5 10.2 Q50 7.6 54.5 10.2" fill="none" stroke="#1c130b" strokeWidth="1.3" strokeLinecap="round" />

      {/* Block ring where the beak meets the head */}
      {ring(46, 31, 38)}

      {/* Window and labium (the sharp edge the air splits on) */}
      <rect x="41" y="57" width="18" height="13" rx="2.4" fill={`url(#${id('window')})`} stroke={EDGE} strokeWidth="1.2" />
      <path d="M41 70 L59 70 L59 73.4 Q50 79 41 73.4 Z" fill="#f2d9a6" stroke={EDGE} strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="43" y1="71.6" x2="57" y2="71.6" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.7" />

      {/* Joint ring between the middle joint and the foot */}
      {ring(211.5, 33.2, 33.6)}

      {/* Flared bell at the foot */}
      {ring(284.5, 29.5, 41, 5.5)}

      {/* Thumb hole (back of the instrument), with a short pointer to the body */}
      <line x1={THUMB.x + 6} y1={THUMB.y} x2="34" y2={THUMB.y} stroke={INK} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.55" />
      {hole('thumb', THUMB.x, THUMB.y, 5.6, thumb === '#')}
      <text x={THUMB.x} y={THUMB.y - 9} fontSize="9" fontWeight="700" textAnchor="middle" fill={INK} opacity="0.75">
        T
      </text>

      {/* Finger holes 1-5: single; 6-7: double pair */}
      {fronts.map((c, i) => {
        const n = i + 1;
        const y = HOLE_Y[i];
        if (n <= 5) return hole(n, CX, y, R_SINGLE, c === '#');
        // '/' covers only one hole of the pair
        const leftClosed = c === '#' || c === '/';
        const rightClosed = c === '#';
        return (
          <g key={n}>
            {hole(`${n}l`, CX - DOUBLE_OFFSET, y, R_DOUBLE, leftClosed)}
            {hole(`${n}r`, CX + DOUBLE_OFFSET, y, R_DOUBLE, rightClosed)}
          </g>
        );
      })}
    </svg>
  );
};

export default RecorderDiagram;
