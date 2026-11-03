// Recorder glossary. Single source of truth for:
//   - /glossary (page + DefinedTermSet JSON-LD)
//   - the generated public/llms-full.txt (scripts/generate-llms.js)
//
// Keep definitions factual, self-contained (each one should make sense if
// quoted on its own, which is how answer engines use them), and free of
// claims about any person. `learnMore` points to the most relevant lesson page.

export const GLOSSARY_CATEGORIES = [
  'Instruments',
  'Parts of the recorder',
  'Technique',
  'Music and repertoire',
  'Learning',
];

export const glossaryTerms = [
  // ---------- Instruments ----------
  {
    slug: 'soprano-recorder',
    term: 'Soprano (descant) recorder',
    category: 'Instruments',
    definition:
      'The most common recorder and the usual first instrument. It is pitched in C and its lowest note is the C an octave above middle C. It is small, inexpensive, and the standard choice for beginners and for children learning in school.',
    learnMore: { href: '/lessons/beginner-recorder-lessons', label: 'Beginner recorder lessons' },
  },
  {
    slug: 'alto-recorder',
    term: 'Alto (treble) recorder',
    category: 'Instruments',
    definition:
      'A larger recorder pitched in F, with a lowest note of the F above middle C. It is the main solo instrument of the Baroque repertoire, including most sonatas by Handel, Telemann, and Vivaldi, and the usual second recorder after soprano.',
    learnMore: { href: '/lessons/baroque-recorder-lessons', label: 'Baroque recorder lessons' },
  },
  {
    slug: 'tenor-recorder',
    term: 'Tenor recorder',
    category: 'Instruments',
    definition:
      'A recorder pitched in C that sounds an octave below the soprano, with a lowest note of middle C. It is mostly played in recorder consorts and ensembles rather than as a solo instrument.',
  },
  {
    slug: 'bass-recorder',
    term: 'Bass recorder',
    category: 'Instruments',
    definition:
      'A large recorder pitched in F that sounds an octave below the alto, with a lowest note of the F below middle C. It has a curved metal crook (bocal) and is mainly used to play the bass line in a recorder consort.',
  },
  {
    slug: 'sopranino-recorder',
    term: 'Sopranino recorder',
    category: 'Instruments',
    definition:
      'A small, high recorder pitched in F that sounds an octave above the alto. It is used in some Baroque concertos and in recorder ensembles.',
  },
  {
    slug: 'recorder-consort',
    term: 'Recorder consort',
    category: 'Instruments',
    definition:
      'A group of recorders of different sizes (for example soprano, alto, tenor, and bass) playing together. Consort playing is a central tradition of Renaissance music and a popular way for amateur players to make music with others.',
  },

  // ---------- Parts of the recorder ----------
  {
    slug: 'windway',
    term: 'Windway',
    category: 'Parts of the recorder',
    definition:
      'The narrow channel inside the head joint that directs the player’s breath across the labium. Its shape strongly affects tone and response, which is why recorder makers voice the windway carefully.',
  },
  {
    slug: 'labium',
    term: 'Labium',
    category: 'Parts of the recorder',
    definition:
      'The sharp edge in the window of the head joint. The airstream from the windway splits against it, setting the air column in the instrument vibrating and producing sound.',
  },
  {
    slug: 'thumb-hole',
    term: 'Thumb hole',
    category: 'Parts of the recorder',
    definition:
      'The hole on the back of the recorder, covered by the left thumb. Partly uncovering it (thumb pinching or half-holing) is how recorder players reach many notes in the upper register.',
  },
  {
    slug: 'double-holes',
    term: 'Double holes',
    category: 'Parts of the recorder',
    definition:
      'Pairs of small adjacent holes at the bottom of the recorder. Covering one hole of a pair, or both, lets the player sound the semitones (sharps and flats) in the lowest part of the instrument\u2019s range.',
  },
  {
    slug: 'baroque-fingering',
    term: 'Baroque (English) fingering',
    category: 'Parts of the recorder',
    definition:
      'The fingering system used by the great majority of serious recorder players and by most Baroque-style instruments. It is the standard for historical repertoire and is better in tune on chromatic notes than German fingering, so it is what private teachers generally teach.',
    learnMore: { href: '/lessons/baroque-recorder-lessons', label: 'Baroque recorder lessons' },
  },
  {
    slug: 'german-fingering',
    term: 'German fingering',
    category: 'Parts of the recorder',
    definition:
      'An alternative fingering system, common on school recorders, that makes the note F simpler to play at first. The trade-off is that several other notes, especially chromatic ones, are harder to play in tune, so players who continue usually switch to Baroque fingering.',
  },

  // ---------- Technique ----------
  {
    slug: 'finger-chart',
    term: 'Finger chart (fingering chart)',
    category: 'Technique',
    definition:
      'A diagram showing which holes to cover for each note on the recorder. Beginners use one to learn the first notes; it does not replace learning to hear whether a note is in tune.',
    learnMore: { href: '/lessons/beginner-recorder-lessons', label: 'Beginner recorder lessons' },
  },
  {
    slug: 'tonguing',
    term: 'Tonguing (articulation)',
    category: 'Technique',
    definition:
      'Using the tongue, as if saying “tu” or “du”, to start each note cleanly. Tonguing gives the recorder its rhythmic clarity and its range of articulations, from smooth (legato) to crisp (staccato).',
  },
  {
    slug: 'double-tonguing',
    term: 'Double tonguing',
    category: 'Technique',
    definition:
      'Alternating two syllables, usually “tu-ku”, to articulate fast passages that are too quick to tongue with the front of the tongue alone.',
    learnMore: { href: '/lessons/advanced-recorder-lessons', label: 'Advanced recorder lessons' },
  },
  {
    slug: 'breath-control',
    term: 'Breath control',
    category: 'Technique',
    definition:
      'Managing the speed and steadiness of the airstream. The recorder is very sensitive to air: blowing too hard pushes notes sharp and makes the tone harsh, so gentle, steady breath support is the foundation of good tone and intonation.',
  },
  {
    slug: 'cross-fingering',
    term: 'Cross-fingering (fork fingering)',
    category: 'Technique',
    definition:
      'A fingering in which open holes lie between covered ones. Most chromatic notes (sharps and flats) on the recorder are played with cross-fingerings, and many need small adjustments to sound in tune.',
  },
  {
    slug: 'intonation',
    term: 'Intonation',
    category: 'Technique',
    definition:
      'How accurately notes match the intended pitch. On the recorder it depends on breath pressure, fingering choices, and the temperature of the instrument, and developing a good ear for it is part of every level of study.',
  },
  {
    slug: 'flattement',
    term: 'Flattement (finger vibrato)',
    category: 'Technique',
    definition:
      'A Baroque-style vibrato made by shading or lightly moving a finger over a tone hole, which makes the pitch waver slightly. It is an expressive ornament in historically informed playing.',
    learnMore: { href: '/lessons/baroque-recorder-lessons', label: 'Baroque recorder lessons' },
  },
  {
    slug: 'ornamentation',
    term: 'Ornamentation',
    category: 'Technique',
    definition:
      'Embellishments such as trills, mordents, and turns, added to or written into a melody. Ornamentation is central to Baroque style, where performers were expected to decorate repeated material.',
    learnMore: { href: '/lessons/baroque-recorder-lessons', label: 'Baroque recorder lessons' },
  },

  // ---------- Music and repertoire ----------
  {
    slug: 'historically-informed-performance',
    term: 'Historically informed performance (HIP)',
    category: 'Music and repertoire',
    definition:
      'Playing early music with the instruments, pitch, articulation, and ornamentation that research suggests were used in its own period. The recorder is a core instrument of the early-music revival.',
    learnMore: { href: '/lessons/baroque-recorder-lessons', label: 'Baroque recorder lessons' },
  },
  {
    slug: 'divisions',
    term: 'Divisions',
    category: 'Music and repertoire',
    definition:
      'A Renaissance and Baroque form in which a melody or bass line is varied by breaking its long notes into running, faster ones. Division sets are a showpiece for the recorder and a way to learn ornamentation and fluency.',
  },
  {
    slug: 'basso-continuo',
    term: 'Basso continuo',
    category: 'Music and repertoire',
    definition:
      'The accompaniment in most Baroque music: a bass line played by an instrument such as cello or bassoon, with chords filled in by harpsichord, organ, or lute. A recorder sonata is normally played with continuo.',
  },
  {
    slug: 'pitch-standard',
    term: 'Pitch standard (A=440, A=415)',
    category: 'Music and repertoire',
    definition:
      'The frequency a recorder is tuned to. Most recorders are built to A=440 Hz, the modern standard. Some are built to A=415 Hz, about a semitone lower, which is common for playing with Baroque-pitch ensembles.',
  },
  {
    slug: 'play-along',
    term: 'Play-along',
    category: 'Music and repertoire',
    definition:
      'A recording or backing track that a student plays with, in place of an accompanist. Play-alongs are a practical way to practice rhythm, intonation, and ensemble awareness at home.',
    learnMore: { href: '/tutorials', label: 'Free recorder tutorials' },
  },
  {
    slug: 'etude',
    term: 'Etude',
    category: 'Music and repertoire',
    definition:
      'A study piece written to develop one aspect of technique, such as articulation, finger speed, or breath control, while still being musical to play.',
  },

  // ---------- Learning ----------
  {
    slug: 'sight-reading',
    term: 'Sight-reading',
    category: 'Learning',
    definition:
      'Playing a piece of music at first sight, without prior practice. It is built gradually, and recorder lessons commonly teach reading notation and playing together, so students develop it from the first weeks.',
  },
  {
    slug: 'online-recorder-lesson',
    term: 'Online recorder lesson',
    category: 'Learning',
    definition:
      'A live, one-to-one lesson held over video call (for example Zoom). The teacher can see and hear the student’s fingering, posture, and sound in real time, and the student keeps the recording or notes to practice from. All that is needed is a recorder, a device with a camera and microphone, and a stable internet connection.',
    learnMore: { href: '/book-lesson', label: 'Book an online recorder lesson' },
  },
];
