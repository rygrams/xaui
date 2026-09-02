import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Align } from '../../../components/view/align'

describe('Align', () => {
  it('renders with center alignment', () => {
    render(<Align alignment="center" testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.justifyContent).toBe('center')
    expect(el.style.alignItems).toBe('center')
  })

  it('renders with topLeft alignment', () => {
    render(<Align alignment="topLeft" testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.justifyContent).toBe('flex-start')
    expect(el.style.alignItems).toBe('flex-start')
  })

  it('renders with bottomRight alignment', () => {
    render(<Align alignment="bottomRight" testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.justifyContent).toBe('flex-end')
    expect(el.style.alignItems).toBe('flex-end')
  })

  it('merges custom style', () => {
    render(
      <Align alignment="center" style={{ backgroundColor: 'red' }} testID="box" />
    )
    expect(screen.getByTestId('box').style.backgroundColor).toBe('red')
  })

  it('renders children', () => {
    render(
      <Align alignment="center" testID="box">
        <span>hello</span>
      </Align>
    )
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
