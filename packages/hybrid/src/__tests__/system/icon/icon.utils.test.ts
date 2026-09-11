import { describe, expect, it } from 'vitest'
import { maskStyle, uriOf } from '../../../system/icon/icon.utils'

describe('Icon image tinting', () => {
  it('reads both source forms', () => {
    expect(uriOf('/trash.png')).toBe('/trash.png')
    expect(uriOf({ uri: '/trash.png' })).toBe('/trash.png')
  })

  it('paints the tint through the image and keeps one point one pixel', () => {
    expect(
      maskStyle({ source: '/trash.png', size: 24, tint: '#7c3aed' })
    ).toMatchObject({
      width: '1.5rem',
      height: '1.5rem',
      backgroundColor: '#7c3aed',
      maskImage: 'url("/trash.png")',
      maskSize: 'cover',
      maskRepeat: 'no-repeat',
    })
  })

  it('maps every Native resize mode onto a mask size', () => {
    const sizeFor = (resizeMode: string | undefined) =>
      maskStyle({ source: '/i.png', size: 16, tint: '#000', resizeMode }).maskSize
    expect(sizeFor('contain')).toBe('contain')
    expect(sizeFor('stretch')).toBe('100% 100%')
    expect(sizeFor('center')).toBe('auto')
    expect(sizeFor('unknown')).toBe('cover')
    expect(
      maskStyle({ source: '/i.png', size: 16, tint: '#000', resizeMode: 'repeat' })
        .maskRepeat
    ).toBe('repeat')
  })
})
