import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ActivityIndicator } from '../../../components/indicator/indicator'

vi.mock('../../../core', async importOriginal => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await importOriginal<any>()
  return {
    ...actual,
    useXUITheme: () => ({
      colors: {
        primary: { main: '#1976d2', background: '#e3f2fd' },
      },
    }),
  }
})

describe('ActivityIndicator Web', () => {
  it('should render circular variant by default', () => {
    const { container } = render(<ActivityIndicator />)
    const divElements = container.querySelectorAll('div')
    expect(divElements.length).toBeGreaterThan(0)
  })

  it('should render linear variant when prop set', () => {
    const { container } = render(<ActivityIndicator variant="linear" />)
    const svg = container.querySelector('svg')
    const div = container.querySelector('div[role="progressbar"]')

    expect(svg).toBeFalsy()
    expect(div).toBeTruthy()
  })

  it('should forward props to circular indicator', () => {
    const { container } = render(<ActivityIndicator variant="circular" size={60} />)
    const divElements = container.querySelectorAll('div')
    expect(divElements.length).toBeGreaterThan(0)
  })

  it('should forward props to linear indicator', () => {
    const { container } = render(<ActivityIndicator variant="linear" size={10} />)
    const div = container.querySelector('div[role="progressbar"]')
    expect(div).toBeTruthy()
  })
})
