import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Spacer } from '../../../components/view/spacer'

describe('Spacer', () => {
  it('defaults to flexGrow 1', () => {
    render(<div data-testid="parent"><Spacer /></div>)
    const parent = screen.getByTestId('parent')
    const spacer = parent.firstElementChild as HTMLElement
    expect(spacer.style.flexGrow).toBe('1')
    expect(spacer.style.flexBasis).toBe('0px')
  })

  it('accepts custom flex factor', () => {
    render(<div data-testid="parent"><Spacer flex={2} /></div>)
    const parent = screen.getByTestId('parent')
    const spacer = parent.firstElementChild as HTMLElement
    expect(spacer.style.flexGrow).toBe('2')
  })
})
