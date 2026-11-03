import React from 'react';

// Front view of a recorder: thumb hole (back of the instrument) at the top
// left, then holes 1-7 down the body. Holes 6 and 7 are drawn as double holes.
const R = 9; // single hole radius
const R2 = 5.5; // double-hole radius

const Hole = ({ cx, cy, r, state }) => (
  <circle
    cx={cx}
    cy={cy}
    r={r}
    fill={state === 'closed' ? '#2c3e50' : '#fff'}
    stroke="#2c3e50"
    strokeWidth="2"
  />
);

const RecorderDiagram = ({ holes, label, width = 84 }) => {
  const [thumb, ...fronts] = holes.split('');
  const ys = [38, 66, 94, 128, 156, 184, 212]; // holes 1..7
  const state = (c) => (c === '#' ? 'closed' : 'open');
  const h = 252;

  return (
    <svg
      viewBox={`0 0 84 ${h}`}
      width={width}
      height={(width * h) / 84}
      role="img"
      aria-label={label}
      style={{ display: 'block', margin: '0 auto' }}
    >
      <rect x="22" y="6" width="40" height="236" rx="14" fill="#f6efe4" stroke="#2c3e50" strokeWidth="2" />
      {/* thumb hole sits on the back; drawn offset to the left with a T label */}
      <Hole cx={14} cy={20} r={R - 2} state={state(thumb)} />
      <text x="14" y="9" fontSize="9" textAnchor="middle" fill="#7f8c8d">T</text>
      {fronts.map((c, i) => {
        const hole = i + 1;
        const y = ys[i];
        if (hole <= 5) return <Hole key={hole} cx={42} cy={y} r={R} state={state(c)} />;
        // double holes: '/' covers only one hole of the pair
        const left = c === '#' || c === '/' ? 'closed' : 'open';
        const right = c === '#' ? 'closed' : 'open';
        return (
          <g key={hole}>
            <Hole cx={34} cy={y} r={R2} state={left} />
            <Hole cx={50} cy={y} r={R2} state={right} />
          </g>
        );
      })}
    </svg>
  );
};

export default RecorderDiagram;
