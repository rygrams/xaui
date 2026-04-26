import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { FractionallySizedBox } from '../../../components/view/fractionally-sized-box'

describe('FractionallySizedBox', () => {
  it('renders with widthFactor as percentage', () => {
    render(<FractionallySizedBox widthFactor={0.5} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.width).toBe('50%')
  })

  it('renders with heightFactor as percentage', () => {
    render(<FractionallySizedBox heightFactor={0.75} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.height).toBe('75%')
  })

  it('renders with both factors', () => {
    render(
      <FractionallySizedBox widthFactor={0.5} heightFactor={0.25} testID="box" />
    )
    const el = screen.getByTestId('box')
    expect(el.style.width).toBe('50%')
    expect(el.style.height).toBe('25%')
  })

  it('renders children', () => {
    render(
      <FractionallySizedBox testID="box">
        <span>hello</span>
      </FractionallySizedBox>
    )
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })

  it('applies style override', () => {
    render(
      <FractionallySizedBox
        widthFactor={0.5}
        style={{ backgroundColor: 'red' }}
        testID="box"
      />
    )
    const el = screen.getByTestId('box')
    expect(el.style.width).toBe('50%')
    expect(el.style.backgroundColor).toBe('red')
  })

  it('applies boxSizing border-box by default', () => {
    render(<FractionallySizedBox testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.boxSizing).toBe('border-box')
  })
})
