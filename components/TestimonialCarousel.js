import React, { useEffect, useState } from 'react'

/**
 * Small testimonial rotator. Replaces semantic-ui-carousel-react, whose
 * pre-bundled dist added ~700 KB of JavaScript to the home page.
 *
 * - First slide is server-rendered (good for LCP / crawlers).
 * - Dots are real <button>s with labels; choosing one stops auto-rotation.
 * - Auto-rotation is skipped for users who prefer reduced motion.
 */
const TestimonialCarousel = ({ elements, duration = 9000 }) => {
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || elements.length < 2) return undefined
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % elements.length), duration)
    return () => clearInterval(id)
  }, [auto, elements.length, duration])

  return (
    <div className="ui fluid card carousel-container">
      <div className="content carousel" aria-live={auto ? 'off' : 'polite'}>
        <div className="carousel-slide" key={index}>
          {elements[index].render()}
        </div>
        <div className="carousel-indicators" role="group" aria-label="Choose a testimonial">
          {elements.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`carousel-dot${i === index ? ' is-active' : ''}`}
              aria-label={`Show testimonial ${i + 1} of ${elements.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => {
                setAuto(false)
                setIndex(i)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
