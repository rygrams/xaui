import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SizedBox } from '../../../components/view/sized-box'

describe('SizedBox', () => {
  it('renders with explicit width and height', () => {
    render(<SizedBox width={100} height={80} testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.width).toBe('100px')
    expect(el.style.height).toBe('80px')
  })

  it('renders expanded (flex: 1)', () => {
    render(<SizedBox expand testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.flexGrow).toBe('1')
    expect(el.style.alignSelf).toBe('stretch')
  })

  it('renders shrunk (width/height: 0)', () => {
    render(<SizedBox shrink testID="box" />)
    const el = screen.getByTestId('box')
    expect(el.style.width).toBe('0px')
    expect(el.style.height).toBe('0px')
  })

  it('renders children', () => {
    render(<SizedBox testID="box"><span>hello</span></SizedBox>)
    expect(screen.getByTestId('box').textContent).toBe('hello')
  })
})
