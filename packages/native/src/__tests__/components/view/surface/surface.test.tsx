import { describe, it, expect } from 'vitest'
import type {
  SurfaceThemeColor,
  SurfaceProps,
} from '../../../../components/view/surface/surface.type'

describe('Surface Types', () => {
  it('exports SurfaceProps with defaults-friendly fields', () => {
    const props: SurfaceProps = {
      children: 'Content',
    }

    expect(props).toBeDefined()
    expect(props.children).toBe('Content')
  })

  it('supports theme background keys', () => {
    const color: SurfaceThemeColor = 'primary'
    const props: SurfaceProps = {
      children: 'Content',
      themeColor: color,
      padding: 16,
      radius: 'lg',
    }

    expect(props.themeColor).toBe('primary')
    expect(props.padding).toBe(16)
    expect(props.radius).toBe('lg')
  })

  it('supports raw theme background and foreground keys', () => {
    const bg: SurfaceProps = {
      children: 'Background',
      themeColor: 'background',
    }

    const fg: SurfaceProps = {
      children: 'Foreground',
      themeColor: 'foreground',
    }

    expect(bg.themeColor).toBe('background')
    expect(fg.themeColor).toBe('foreground')
  })

  it('supports fullWidth prop', () => {
    const props: SurfaceProps = {
      children: 'Content',
      fullWidth: true,
    }

    expect(props.fullWidth).toBe(true)
  })
})
