import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Flex } from '../../../components/view/flex'

describe('Flex', () => {
  it('renders as row with flexDirection row', () => {
    render(<Flex direction="horizontal" testID="box" />)
    expect(screen.getByTestId('box').style.flexDirection).toBe('row')
  })

  it('renders as column with flexDirection column', () => {
    render(<Flex direction="vertical" testID="box" />)
    expect(screen.getByTestId('box').style.flexDirection).toBe('column')
  })

  it('applies spaceBetween justifyContent', () => {
    render(<Flex direction="horizontal" mainAxisAlignment="spaceBetween" testID="box" />)
    expect(screen.getByTestId('box').style.justifyContent).toBe('space-between')
  })

  it('applies stretch alignItems', () => {
    render(<Flex direction="horizontal" crossAxisAlignment="stretch" testID="box" />)
    expect(screen.getByTestId('box').style.alignItems).toBe('stretch')
  })

  it('applies gap', () => {
    render(<Flex direction="horizontal" gap={16} testID="box" />)
    expect(screen.getByTestId('box').style.gap).toBe('16px')
  })

  it('reverses direction', () => {
    render(<Flex direction="horizontal" reversed testID="box" />)
    expect(screen.getByTestId('box').style.flexDirection).toBe('row-reverse')
  })

  it('applies wrap', () => {
    render(<Flex direction="horizontal" wrap testID="box" />)
    expect(screen.getByTestId('box').style.flexWrap).toBe('wrap')
  })

  it('renders children', () => {
    render(<Flex direction="horizontal" testID="box"><span>hi</span></Flex>)
    expect(screen.getByTestId('box').textContent).toBe('hi')
  })
})
