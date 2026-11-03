import React from 'react'
import Link from 'next/link'

// A real link styled as a Semantic UI button. (It used to be a <button>
// nested inside an <a>, which is invalid HTML and made the link's accessible
// name differ from its visible text.)
const LessonButton = () => (
  <Link href="/book-bundle" className="ui primary button lesson-button">
    Book a Lesson Now
  </Link>
)

export default LessonButton
