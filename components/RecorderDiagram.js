import React, { useId } from 'react';

// Front view of a Baroque-style recorder, held upright: beak and window at the
// top, then the body with seven finger holes, a flared bell at the foot, and the
// thumb hole (which is on the BACK of a real instrument) drawn off to the left.
//
// `holes` is 8 characters: thumb, then holes 1-7 (see data/fingerings.js).
//   '#' covered   '.' open   '/' half covered (one hole of a double pair)
// Holes 6 and 7 are the double holes on a real recorder, drawn as two small
// holes side by side.

const INK = '#2c3e50'; // site text colour, used for outlines and covered holes
const W = 100;
const H = 292;
const CX = 50;

// Vertical centres of finger holes 1..7
const HOLE_Y = [94, 118, 142, 178, 202, 228, 252];
const THUMB = { x: 26, y: 84 };

const R_SINGLE = 5.6;
const R_DOUBLE = 3.7;
const DOUBLE_OFFSET = 7.2;

const RecorderDiagram = ({ holes, label, width = 84 }) => {
  const uid = useId().replace(/:/g, '');
  const wood = `wood-${uid}`;
  const rim = `rim-${uid}`;
  const [thumb, ...fronts] = holes.split('');

  const hole = (key, cx, cy, r, closed) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r={r} fill={closed ? INK : '#fffaf0'} stroke={INK} strokeWidth="1.6" />
      {/* a little depth so an open hole reads as a hole, not a blank */}
      {!closed && <circle cx={cx} cy={cy} r={r - 2.2} fill="#8a6a45" opacity="0.28" />}
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
        {/* turned-wood shading across the width of the tube */}
        <linearGradient id={wood} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d9b47d" />
          <stop offset="0.3" stopColor="#f6e6c6" />
          <stop offset="0.65" stopColor="#ebcf9f" />
          <stop offset="1" stopColor="#c99a60" />
        </linearGradient>
        <linearGradient id={rim} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#9c6f3d" />
          <stop offset="0.4" stopColor="#c99a60" />
          <stop offset="1" stopColor="#8a5f33" />
        </linearGradient>
      </defs>

      {/* Head joint: beak narrowing to the top */}
      <path d="M42 8 Q50 2 58 8 L67 48 L33 48 Z" fill={`url(#${wood})`} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {/* windway slit at the very tip of the beak */}
      <path d="M45.5 9 Q50 6.6 54.5 9" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />

      {/* Block ring where the beak meets the head */}
      <rect x="31" y="46" width="38" height="6" rx="2" fill={`url(#${rim})`} stroke={INK} strokeWidth="1.6" />

      {/* Body (middle joint then foot), gently tapering toward the foot */}
      <path d="M33 52 L67 52 L64 270 L36 270 Z" fill={`url(#${wood})`} stroke={INK} strokeWidth="2" strokeLinejoin="round" />

      {/* Window and labium (the sharp edge the air splits on) */}
      <rect x="42" y="58" width="16" height="12" rx="2" fill={INK} opacity="0.88" />
      <path d="M42 70 L58 70 L58 73 Q50 78 42 73 Z" fill="#f6e6c6" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />

      {/* Joint ring between the middle joint and the foot */}
      <rect x="33.4" y="212" width="33.2" height="5" rx="2" fill={`url(#${rim})`} stroke={INK} strokeWidth="1.4" />

      {/* Flared bell at the foot */}
      <path d="M35 268 L65 268 Q66 280 71 288 L29 288 Q34 280 35 268 Z" fill={`url(#${wood})`} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <rect x="30" y="285" width="40" height="5" rx="2" fill={`url(#${rim})`} stroke={INK} strokeWidth="1.6" />

      {/* Thumb hole (back of the instrument), with a short pointer to the body */}
      <line x1={THUMB.x + 6} y1={THUMB.y} x2="34" y2={THUMB.y} stroke={INK} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
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
