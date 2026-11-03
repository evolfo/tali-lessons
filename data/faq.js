// Single source of truth for the FAQ questions and short answers.
// Used by the FAQPage JSON-LD in pages/faq.js and by the generated
// public/llms-full.txt (scripts/generate-llms.js). The long-form visible
// answers (tables, tips) stay in the page JSX; keep these summaries in sync
// with them. `id` matches the on-page anchor (e.g. /faq#cost).
export const faqs = [
  {
    id: "cost",
    question: "How much do recorder lessons cost?",
    answer: "Tali Rubinstein offers online recorder lessons: $95 for 45 minutes or $105 for 60 minutes. Package bundles provide savings: 5-lesson package $498.75 (5% off), 10-lesson package $976.50 (7% off), 20-lesson package $1,890 (10% off).",
  },
  {
    id: "best-recorder",
    question: "What is the best recorder for beginners?",
    answer: "The best beginner recorders are: Yamaha YRS-23 ($20-25) - excellent plastic soprano recorder; Aulos 203 ($20-30) - warm tone, durable; Mollenhauer Student ($60-100) - wooden option for better sound. Start with a soprano (descant) recorder in C.",
  },
  {
    id: "timeline",
    question: "How long does it take to learn recorder?",
    answer: "Learning timeline: 2-3 weeks for simple melodies, 2-3 months for folk songs and easy classical pieces, 6-12 months for intermediate baroque repertoire, 1-2 years for advanced technique and complex pieces. Daily 15-20 minute practice accelerates progress.",
  },
  {
    id: "difficulty",
    question: "Is recorder hard to learn?",
    answer: "No, the recorder is one of the easiest instruments to start. You can play your first notes in minutes. Basic melodies come within weeks. However, mastering advanced techniques, baroque ornamentation, and professional repertoire requires dedicated practice like any instrument.",
  },
  {
    id: "adults",
    question: "Can adults learn recorder?",
    answer: "Absolutely! Adults often learn recorder faster than children due to better focus and understanding. Many adult beginners play recognizable songs within a month. The recorder is perfect for adults wanting to learn music - it's affordable, portable, and offers beautiful baroque and contemporary repertoire.",
  },
  {
    id: "read-music",
    question: "Do I need to read music to learn recorder?",
    answer: "No prior music reading is required. Recorder lessons teach music reading alongside playing technique. Students start with finger charts and simple notation, gradually building reading skills. Most students read standard notation comfortably within 3-6 months.",
  },
  {
    id: "age",
    question: "What age should you start recorder lessons?",
    answer: "Age 8+ is ideal for recorder lessons. At this age, children have sufficient hand coordination, attention span, and instruction-following ability. Some advanced 7-year-olds can start earlier. Adults can start at any age - it's never too late to learn recorder.",
  },
  {
    id: "online",
    question: "Are online recorder lessons effective?",
    answer: "Yes, online recorder lessons are highly effective. Camera angles show fingerings clearly, demonstrations are up-close, and students can record sessions for practice review. Many students prefer online lessons for convenience, scheduling flexibility, and ability to learn from expert teachers anywhere.",
  },
  {
    id: "practice",
    question: "How often should I practice recorder?",
    answer: "Practice recommendations: Beginners: 15-20 minutes daily; Intermediate: 20-30 minutes daily; Advanced: 30-60 minutes daily. Consistency matters more than duration. Daily short sessions are more effective than one long weekly session. Quality practice with focus beats mindless repetition.",
  },
  {
    id: "styles",
    question: "What styles of music can you play on recorder?",
    answer: "Recorder repertoire includes: Baroque (Handel, Bach, Vivaldi, Telemann), Renaissance (dance music, consort pieces), Folk and traditional songs, Jazz and improvisation, Contemporary classical, Pop arrangements, Latin styles (bossa nova, samba), World music. The recorder is surprisingly versatile!",
  },
  {
    id: "equipment",
    question: "What equipment do I need for recorder lessons?",
    answer: "You need a soprano recorder ($20-100), and for online lessons a computer or tablet with a camera. A music stand ($15-40) and metronome app (free) are recommended but not required. Total startup cost is typically $40-150.",
  },
  {
    id: "transfer",
    question: "Do recorder skills transfer to other instruments?",
    answer: "Yes. Recorder builds music reading (treble clef transfers directly to flute, violin, and oboe), breath control for wind instruments, finger dexterity, ear training, and music theory that apply to any instrument. Many professional flutists, oboists, and clarinetists started on recorder.",
  },
];
