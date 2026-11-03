// Recorder fingering data. THIS FILE IS THE THING TALI SHOULD REVIEW.
//
// Baroque (English) fingering, written for a soprano recorder (a "C" instrument).
// Alto, bass and sopranino (the "F" instruments) use the SAME finger patterns
// and sound a fourth lower in name: see TRANSPOSE_TO_F below.
//
// `holes` is 8 characters, in this order:
//   thumb (back of the instrument), then holes 1-7 from the top down
//   (1-3 left hand, 4-7 right hand; 6 and 7 are the double holes)
//     '#'  covered
//     '.'  open
//     '/'  half covered (for holes 6/7: ONE hole of the double pair covered)
//
// `check` marks the entries most likely to need a second look. They are
// accidentals / fork fingerings, which differ slightly between sources and
// instruments, so they should be confirmed before this page ships.
//
// Range: first octave only (low C to high C). Upper-register fingerings
// (thumb pinching, D6 and above) are intentionally left for a follow-up once
// this octave has been signed off.

export const FINGERINGS = [
  { id: 'c',   name: 'C',      alt: null,      octave: 'low',  holes: '########' },
  { id: 'cs',  name: 'C♯', alt: 'D♭', octave: 'low',  holes: '#######/', check: true },
  { id: 'd',   name: 'D',      alt: null,      octave: 'low',  holes: '#######.' },
  { id: 'ds',  name: 'D♯', alt: 'E♭', octave: 'low',  holes: '######.#', check: true },
  { id: 'e',   name: 'E',      alt: null,      octave: 'low',  holes: '######..' },
  { id: 'f',   name: 'F',      alt: null,      octave: 'low',  holes: '#####.##' },
  { id: 'fs',  name: 'F♯', alt: 'G♭', octave: 'low',  holes: '####.##.', check: true },
  { id: 'g',   name: 'G',      alt: null,      octave: 'low',  holes: '####....' },
  { id: 'gs',  name: 'G♯', alt: 'A♭', octave: 'low',  holes: '###.##..', check: true },
  { id: 'a',   name: 'A',      alt: null,      octave: 'low',  holes: '###.....' },
  { id: 'bb',  name: 'B♭', alt: 'A♯', octave: 'low',  holes: '##.##...', check: true },
  { id: 'b',   name: 'B',      alt: null,      octave: 'low',  holes: '##......' },
  { id: 'c2',  name: 'C',      alt: null,      octave: 'high', holes: '#.#.....' },
];

// Note names when the same fingering is played on an alto (F instrument).
// Fingering for C sounds F, D sounds G, and so on (a perfect fourth up).
export const TRANSPOSE_TO_F = {
  'C': 'F', 'C♯': 'F♯', 'D♭': 'G♭',
  'D': 'G', 'D♯': 'G♯', 'E♭': 'A♭',
  'E': 'A', 'F': 'B♭', 'F♯': 'B', 'G♭': 'C♯',
  'G': 'C', 'G♯': 'C♯', 'A♭': 'D♭',
  'A': 'D', 'B♭': 'E♭', 'A♯': 'D♯',
  'B': 'E',
};

export const INSTRUMENTS = {
  soprano: { label: 'Soprano / Tenor (C instruments)', short: 'Soprano', names: (n) => n },
  alto: { label: 'Alto / Bass / Sopranino (F instruments)', short: 'Alto', names: (n) => (n in TRANSPOSE_TO_F ? TRANSPOSE_TO_F[n] : n) },
};

export const HOLE_LABELS = ['Thumb', '1', '2', '3', '4', '5', '6', '7'];

/** Plain-text fingering, e.g. F -> "0 123 4–6 7"; '-' open, '½' half. */
export function fingeringText(holes) {
  const sym = (c) => (c === '#' ? null : c === '/' ? '½' : '–');
  const out = [];
  out.push(holes[0] === '#' ? '0' : '–');
  const group = (from, to) =>
    holes
      .slice(from, to + 1)
      .split('')
      .map((c, i) => (sym(c) === null ? String(from + i) : sym(c)))
      .join('');
  return `${out[0]} ${group(1, 3)} ${group(4, 7)}`;
}
