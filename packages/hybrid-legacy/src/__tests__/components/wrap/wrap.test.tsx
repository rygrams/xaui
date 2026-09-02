import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Wrap } from '../../../components/view/wrap'

describe('Wrap', () => {
  it('defaults to horizontal row with wrap', () => {
    render(<Wrap testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.flexDirection).toBe('row')
    expect(el.style.flexWrap).toBe('wrap')
  })

  it('renders vertical direction', () => {
    render(<Wrap direction="vertical" testID="box" />)
    expect(screen.getByTestId('box').style.flexDirection).toBe('column')
  })

  it('applies spacing as columnGap', () => {
    render(<Wrap spacing={8} testID="box" />)
    expect(screen.getByTestId('box').style.columnGap).toBe('8px')
  })

  it('applies runSpacing as rowGap', () => {
    render(<Wrap runSpacing={12} testID="box" />)
    expect(screen.getByTestId('box').style.rowGap).toBe('12px')
  })

  it('renders children', () => {
    render(<Wrap testID="box"><span>chip</span></Wrap>)
    expect(screen.getByTestId('box').textContent).toBe('chip')
  })
})
