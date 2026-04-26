import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Padding } from '../../../components/view/padding'

describe('Padding', () => {
  it('applies uniform padding from number', () => {
    render(<Padding padding={16} testID="box"><span>child</span></Padding>)
    const el = screen.getByTestId('box')
    expect(el.style.padding).toBe('16px')
  })

  it('applies horizontal/vertical padding', () => {
    render(<Padding padding={{ horizontal: 16, vertical: 8 }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.paddingLeft).toBe('16px')
    expect(el.style.paddingRight).toBe('16px')
    expect(el.style.paddingTop).toBe('8px')
    expect(el.style.paddingBottom).toBe('8px')
  })

  it('applies per-side padding', () => {
    render(<Padding padding={{ top: 4, bottom: 8, left: 12, right: 16 }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.paddingTop).toBe('4px')
    expect(el.style.paddingBottom).toBe('8px')
    expect(el.style.paddingLeft).toBe('12px')
    expect(el.style.paddingRight).toBe('16px')
  })

  it('merges custom style', () => {
    render(<Padding padding={8} style={{ backgroundColor: 'red' }} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.backgroundColor).toBe('red')
  })

  it('renders children', () => {
    render(<Padding padding={8} testID="box"><span>hello</span></Padding>)
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
