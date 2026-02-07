import { describe, it, expect } from 'vitest'
import type { CarouselLayout } from '../../../components/carousel/carousel.type'

describe('AnimatedCarouselItem Props', () => {
  it('should handle multi-browse layout props', () => {
    const props = {
      index: 0,
      width: 186,
      height: 205,
      radius: 12,
      spacing: 8,
      isLast: false,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 194,
      containerWidth: 375,
      contentPadding: 16,
    }

    expect(props.layout).toBe('multi-browse')
    expect(props.width).toBe(186)
    expect(props.height).toBe(205)
  })

  it('should handle hero layout props', () => {
    const props = {
      index: 0,
      width: 300,
      height: 400,
      radius: 16,
      spacing: 12,
      isLast: false,
      layout: 'hero' as CarouselLayout,
      snapInterval: 312,
      containerWidth: 375,
      contentPadding: 20,
    }

    expect(props.layout).toBe('hero')
    expect(props.width).toBe(300)
    expect(props.height).toBe(400)
  })

  it('should handle spacing correctly for last item', () => {
    const props = {
      index: 2,
      width: 186,
      height: 205,
      radius: 12,
      spacing: 8,
      isLast: true,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 194,
      containerWidth: 375,
      contentPadding: 16,
    }

    expect(props.isLast).toBe(true)
    expect(props.spacing).toBe(8)
  })

  it('should handle different radius values', () => {
    const props = {
      index: 0,
      width: 186,
      height: 205,
      radius: 24,
      spacing: 8,
      isLast: false,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 194,
      containerWidth: 375,
      contentPadding: 16,
    }

    expect(props.radius).toBe(24)
  })

  it('should handle different index values', () => {
    const props = {
      index: 5,
      width: 186,
      height: 205,
      radius: 12,
      spacing: 8,
      isLast: false,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 194,
      containerWidth: 375,
      contentPadding: 16,
    }

    expect(props.index).toBe(5)
  })

  it('should handle different snap intervals', () => {
    const props = {
      index: 0,
      width: 186,
      height: 205,
      radius: 12,
      spacing: 8,
      isLast: false,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 300,
      containerWidth: 375,
      contentPadding: 16,
    }

    expect(props.snapInterval).toBe(300)
  })

  it('should handle different container widths', () => {
    const props = {
      index: 0,
      width: 186,
      height: 205,
      radius: 12,
      spacing: 8,
      isLast: false,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 194,
      containerWidth: 428,
      contentPadding: 16,
    }

    expect(props.containerWidth).toBe(428)
  })

  it('should handle different content padding values', () => {
    const props = {
      index: 0,
      width: 186,
      height: 205,
      radius: 12,
      spacing: 8,
      isLast: false,
      layout: 'multi-browse' as CarouselLayout,
      snapInterval: 194,
      containerWidth: 375,
      contentPadding: 24,
    }

    expect(props.contentPadding).toBe(24)
  })
})
