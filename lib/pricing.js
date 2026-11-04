import { products } from '../data/products'

// Lesson pricing derived from data/products.js (the same file checkout charges
// from), so visible prices, structured data and llms.txt cannot drift apart.
const single45 = products.lesson45_1
const single60 = products.lesson60_1

export const formatUSD = (cents) => {
  const v = cents / 100
  return '$' + (Number.isInteger(v) ? v.toLocaleString('en-US') : v.toLocaleString('en-US', { minimumFractionDigits: 2 }))
}

export const lessonPackages = Object.values(products)
  .filter((p) => /^lesson60_\d+$/.test(p.id) && p.id !== 'lesson60_1')
  .map((p) => {
    const count = Number(p.id.split('_')[1])
    return {
      id: p.id,
      count,
      name: p.name,
      price: p.price,
      perLesson: Math.round(p.price / count),
      discountPercent: Math.round((1 - p.price / (single60.price * count)) * 100),
    }
  })
  .sort((a, b) => a.count - b.count)

export const singleLessons = [
  { id: single45.id, minutes: 45, name: single45.name, price: single45.price },
  { id: single60.id, minutes: 60, name: single60.name, price: single60.price },
]
