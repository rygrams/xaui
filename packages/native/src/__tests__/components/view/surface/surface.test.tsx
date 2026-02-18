import { describe, it, expect } from 'vitest'
import type {
  SurfaceBackgroundColor,
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
    const color: SurfaceBackgroundColor = 'primary'
    const props: SurfaceProps = {
      children: 'Content',
      backgroundColor: color,
      padding: 16,
      radius: 'lg',
      fullWidth: true,
    }

    expect(props.backgroundColor).toBe('primary')
    expect(props.padding).toBe(16)
    expect(props.radius).toBe('lg')
    expect(props.fullWidth).toBe(true)
  })

  it('supports raw theme background and foreground keys', () => {
    const bg: SurfaceProps = {
      children: 'Background',
      backgroundColor: 'background',
    }

    const fg: SurfaceProps = {
      children: 'Foreground',
      backgroundColor: 'foreground',
    }

    expect(bg.backgroundColor).toBe('background')
    expect(fg.backgroundColor).toBe('foreground')
  })
})
