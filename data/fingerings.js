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
//     '/'  half covered. For holes 6/7: ONE hole of the double pair covered.
//          For the thumb: "pinched", i.e. the thumbnail slid into the hole so it
//          is about half covered (used for the second octave from E).
//
// Two octaves: the low octave (C to B) and the high octave (C to C, which takes
// the player up to the top C). Enharmonic pairs are always written sharp first
// (C♯ / D♭), on every instrument.
//
// Sources: the low octave and most of the high octave are standard Baroque
// soprano fingerings, cross-checked against an independent open dataset
// (the MIT-licensed @pepperhorn/fingering-components recorder.json). Every
// accidental and every pinched-thumb note is still marked `check: true` because
// fork fingerings vary slightly between instruments; confirm before shipping.

const lo = (id, name, alt, holes, check) => ({ id, name, alt, octave: 'low', holes, check });
const hi = (id, name, alt, holes, check) => ({ id: `h-${id}`, name, alt, octave: 'high', holes, check });

export const OCTAVES = [
  { id: 'low', label: 'Low octave', range: 'C to B' },
  { id: 'high', label: 'High octave', range: 'C to C' },
];

export const FINGERINGS = [
  // Low octave
  lo('c',  'C',  null, '########'),
  lo('cs', 'C♯', 'D♭', '#######/', true),
  lo('d',  'D',  null, '#######.'),
  lo('ds', 'D♯', 'E♭', '######/.', true),
  lo('e',  'E',  null, '######..'),
  lo('f',  'F',  null, '#####.##'),
  lo('fs', 'F♯', 'G♭', '####.##.', true),
  lo('g',  'G',  null, '####....'),
  lo('gs', 'G♯', 'A♭', '###.###.', true),
  lo('a',  'A',  null, '###.....'),
  lo('as', 'A♯', 'B♭', '##.##...', true),
  lo('b',  'B',  null, '##......'),

  // High octave (thumb open or pinched)
  hi('c',  'C',  null, '#.#.....'),
  hi('cs', 'C♯', 'D♭', '.##.....', true),
  hi('d',  'D',  null, '..#.....', true),
  hi('ds', 'D♯', 'E♭', '.######.', true),
  hi('e',  'E',  null, '/#####..', true),
  hi('f',  'F',  null, '/####.#.', true),
  hi('fs', 'F♯', 'G♭', '/###.#..', true),
  hi('g',  'G',  null, '/###....', true),
  hi('gs', 'G♯', 'A♭', '/##.#...', true),
  hi('a',  'A',  null, '/##.....', true),
  hi('as', 'A♯', 'B♭', '/###.##.', true),
  hi('b',  'B',  null, '/##.##..', true),
  hi('c2', 'C',  null, '/#..##..', true),
];

// Note names when the same fingering is played on an alto (F instrument).
// Fingering for C sounds F, D sounds G, and so on (a perfect fourth up).
export const TRANSPOSE_TO_F = {
  'C': 'F', 'C♯': 'F♯', 'D♭': 'G♭',
  'D': 'G', 'D♯': 'G♯', 'E♭': 'A♭',
  'E': 'A', 'F': 'B♭', 'F♯': 'B', 'G♭': 'C♭',
  'G': 'C', 'G♯': 'C♯', 'A♭': 'D♭',
  'A': 'D', 'B♭': 'E♭', 'A♯': 'D♯',
  'B': 'E',
};

export const INSTRUMENTS = {
  soprano: { label: 'Soprano / Tenor (C instruments)', short: 'Soprano', names: (n) => n },
  alto: { label: 'Alto / Bass / Sopranino (F instruments)', short: 'Alto', names: (n) => (n in TRANSPOSE_TO_F ? TRANSPOSE_TO_F[n] : n) },
};

export const HOLE_LABELS = ['Thumb', '1', '2', '3', '4', '5', '6', '7'];

/** Plain-text fingering, e.g. F -> "0 123 4–67"; '–' open, '½' half / pinched. */
export function fingeringText(holes) {
  const sym = (c) => (c === '#' ? null : c === '/' ? '½' : '–');
  const thumb = holes[0] === '#' ? '0' : holes[0] === '/' ? '½' : '–';
  const group = (from, to) =>
    holes
      .slice(from, to + 1)
      .split('')
      .map((c, i) => (sym(c) === null ? String(from + i) : sym(c)))
      .join('');
  return `${thumb} ${group(1, 3)} ${group(4, 7)}`;
}
