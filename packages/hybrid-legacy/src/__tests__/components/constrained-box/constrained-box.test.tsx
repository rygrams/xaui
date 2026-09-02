import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ConstrainedBox } from '../../../components/view/constrained-box'

describe('ConstrainedBox', () => {
  it('renders with min/max constraints', () => {
    render(
      <ConstrainedBox
        constraints={{
          minWidth: 100,
          maxWidth: 300,
          minHeight: 50,
          maxHeight: 200,
        }}
        testID="box"
      />
    )
    const el = screen.getByTestId('box')
    expect(el.style.minWidth).toBe('100px')
    expect(el.style.maxWidth).toBe('300px')
    expect(el.style.minHeight).toBe('50px')
    expect(el.style.maxHeight).toBe('200px')
  })

  it('renders children', () => {
    render(
      <ConstrainedBox constraints={{}} testID="box">
        <span>hello</span>
      </ConstrainedBox>
    )
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })

  it('applies style override', () => {
    render(
      <ConstrainedBox
        constraints={{ minWidth: 100 }}
        style={{ backgroundColor: 'red' }}
        testID="box"
      />
    )
    const el = screen.getByTestId('box')
    expect(el.style.minWidth).toBe('100px')
    expect(el.style.backgroundColor).toBe('red')
  })

  it('applies boxSizing border-box by default', () => {
    render(<ConstrainedBox constraints={{}} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.boxSizing).toBe('border-box')
  })
})
