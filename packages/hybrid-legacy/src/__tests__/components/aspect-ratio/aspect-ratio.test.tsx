import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { AspectRatio } from '../../../components/view/aspect-ratio'

describe('AspectRatio', () => {
  it('renders with aspect ratio', () => {
    render(<AspectRatio ratio={16 / 9} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.aspectRatio).toBe('1.7777777777777777')
  })

  it('renders children', () => {
    render(
      <AspectRatio ratio={1} testID="box">
        <span>hello</span>
      </AspectRatio>
    )
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })

  it('applies clip overflow hidden', () => {
    render(<AspectRatio ratio={1} clip testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.overflow).toBe('hidden')
  })

  it('applies visible overflow by default', () => {
    render(<AspectRatio ratio={1} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.overflow).toBe('visible')
  })

  it('applies style override', () => {
    render(<AspectRatio ratio={1} style={{ backgroundColor: 'red' }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.backgroundColor).toBe('red')
  })

  it('applies boxSizing border-box by default', () => {
    render(<AspectRatio ratio={1} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.boxSizing).toBe('border-box')
  })
})
