import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Margin } from '../../../components/view/margin'

describe('Margin', () => {
  it('applies uniform margin from number', () => {
    render(<Margin margin={16} testID="box"><span>child</span></Margin>)
    const el = screen.getByTestId('box')
    expect(el.style.margin).toBe('16px')
  })

  it('applies horizontal/vertical margin', () => {
    render(<Margin margin={{ horizontal: 16, vertical: 8 }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.marginLeft).toBe('16px')
    expect(el.style.marginRight).toBe('16px')
    expect(el.style.marginTop).toBe('8px')
    expect(el.style.marginBottom).toBe('8px')
  })

  it('applies per-side margin', () => {
    render(<Margin margin={{ top: 4, bottom: 8, left: 12, right: 16 }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.marginTop).toBe('4px')
    expect(el.style.marginBottom).toBe('8px')
    expect(el.style.marginLeft).toBe('12px')
    expect(el.style.marginRight).toBe('16px')
  })

  it('merges custom style', () => {
    render(<Margin margin={8} style={{ backgroundColor: 'blue' }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.backgroundColor).toBe('blue')
  })

  it('renders children', () => {
    render(<Margin margin={8} testID="box"><span>hello</span></Margin>)
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
