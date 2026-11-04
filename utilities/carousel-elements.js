import React from 'react'
import { testimonials } from '../data/testimonials'

// Testimonial text lives in data/testimonials.js (also feeds structured data and llms-full.txt).
const elements = testimonials.map(({ quote, author, country }) => ({
  render: () => (
    <>
      <h3>"{quote}"</h3>
      <h4>- {author} ({country})</h4>
    </>
  ),
}))

export default elements
