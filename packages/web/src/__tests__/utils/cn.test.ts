import { describe, it, expect } from 'vitest'
import { cn } from '../../utils/cn'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center')
  })

  it('should handle conditional classes', () => {
    const isBlock = true
    const isHidden = false
    expect(cn('flex', isBlock && 'p-4', isHidden && 'hidden')).toBe('flex p-4')
  })

  it('should merge tailwind classes and resolve conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('should handle arrays and objects', () => {
    expect(cn(['flex', 'p-4'], { hidden: false, 'items-center': true })).toBe(
      'flex p-4 items-center'
    )
  })
})
