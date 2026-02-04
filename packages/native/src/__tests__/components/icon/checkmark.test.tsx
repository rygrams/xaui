import React from 'react'
import { render } from '@testing-library/react-native'
import { CheckmarkIcon } from '../../../components/icon'
import { XUIProvider } from '../../../core'

describe('CheckmarkIcon', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <XUIProvider>{children}</XUIProvider>
  )

  it('renders with default props', () => {
    const { toJSON } = render(<CheckmarkIcon />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders outline variant', () => {
    const { toJSON } = render(<CheckmarkIcon variant="outline" />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders filled variant', () => {
    const { toJSON } = render(<CheckmarkIcon variant="filled" />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders duotone variant', () => {
    const { toJSON } = render(<CheckmarkIcon variant="duotone" />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders with custom size', () => {
    const { toJSON } = render(<CheckmarkIcon size={32} />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders with theme color', () => {
    const { toJSON } = render(<CheckmarkIcon color="primary" />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders with custom RGB color', () => {
    const { toJSON } = render(<CheckmarkIcon color="#FF0000" />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders with animation enabled', () => {
    const { toJSON } = render(<CheckmarkIcon isAnimated />, { wrapper })
    expect(toJSON()).toBeTruthy()
  })

  it('renders all variants with animation', () => {
    const variants: Array<'outline' | 'filled' | 'duotone'> = [
      'outline',
      'filled',
      'duotone',
    ]

    variants.forEach(variant => {
      const { toJSON } = render(<CheckmarkIcon variant={variant} isAnimated />, {
        wrapper,
      })
      expect(toJSON()).toBeTruthy()
    })
  })
})
