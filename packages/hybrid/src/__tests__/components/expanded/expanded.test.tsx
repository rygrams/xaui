import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Expanded } from '../../../components/view/expanded'

describe('Expanded', () => {
  it('defaults to flex 1', () => {
    render(<Expanded testID="box" />)
    expect(screen.getByTestId('box').style.flexGrow).toBe('1')
  })

  it('accepts custom flex factor', () => {
    render(<Expanded flex={2} testID="box" />)
    expect(screen.getByTestId('box').style.flexGrow).toBe('2')
  })

  it('renders children', () => {
    render(<Expanded testID="box"><span>hello</span></Expanded>)
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
