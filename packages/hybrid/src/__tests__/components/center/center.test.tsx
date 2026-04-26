import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Center } from '../../../components/view/center'

describe('Center', () => {
  it('renders with center alignment', () => {
    render(<Center testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.justifyContent).toBe('center')
    expect(el.style.alignItems).toBe('center')
  })

  it('merges custom style', () => {
    render(<Center style={{ backgroundColor: 'blue' }} testID="box" />)
    expect(screen.getByTestId('box').style.backgroundColor).toBe('blue')
  })

  it('renders children', () => {
    render(<Center testID="box"><span>hello</span></Center>)
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
