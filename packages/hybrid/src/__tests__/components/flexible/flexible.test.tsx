import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Flexible } from '../../../components/view/flexible'

describe('Flexible', () => {
  it('defaults to loose fit with flexGrow 1', () => {
    render(<Flexible testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.flexGrow).toBe('1')
    expect(el.style.flexBasis).toBe('auto')
  })

  it('tight fit uses flex shorthand', () => {
    render(<Flexible fit="tight" flex={2} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.flexGrow).toBe('2')
  })

  it('accepts custom flex factor in loose mode', () => {
    render(<Flexible flex={3} testID="box" />)
    expect(screen.getByTestId('box').style.flexGrow).toBe('3')
  })

  it('renders children', () => {
    render(<Flexible testID="box"><span>hello</span></Flexible>)
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
