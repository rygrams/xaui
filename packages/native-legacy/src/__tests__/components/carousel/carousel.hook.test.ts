import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useCarouselLayout,
  HERO_PEEK_WIDTH,
} from '../../../components/carousel/carousel.hook'
import type { CarouselLayoutConfig } from '../../../components/carousel/carousel.type'

describe('useCarouselLayout', () => {
  const baseConfig: CarouselLayoutConfig = {
    layout: 'multi-browse',
    containerWidth: 375,
    preferredItemWidth: 186,
    itemSpacing: 8,
    contentPadding: 16,
  }

  describe('multi-browse layout', () => {
    it('returns preferred item width as computed width', () => {
      const { result } = renderHook(() => useCarouselLayout(baseConfig))

      expect(result.current.computedItemWidth).toBe(186)
    })

    it('computes snap interval as itemWidth + spacing', () => {
      const { result } = renderHook(() => useCarouselLayout(baseConfig))

      expect(result.current.snapInterval).toBe(186 + 8)
    })

    it('does not enable paging', () => {
      const { result } = renderHook(() => useCarouselLayout(baseConfig))

      expect(result.current.pagingEnabled).toBe(false)
    })

    it('respects custom item width', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        preferredItemWidth: 240,
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.computedItemWidth).toBe(240)
      expect(result.current.snapInterval).toBe(248)
    })

    it('respects custom spacing', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        itemSpacing: 16,
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.snapInterval).toBe(186 + 16)
    })
  })

  describe('uncontained layout', () => {
    it('returns preferred item width as computed width', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'uncontained',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.computedItemWidth).toBe(186)
    })

    it('computes snap interval as itemWidth + spacing', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'uncontained',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.snapInterval).toBe(194)
    })

    it('does not enable paging', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'uncontained',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.pagingEnabled).toBe(false)
    })
  })

  describe('hero layout', () => {
    it('computes large item width from container minus peek', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'hero',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      const availableWidth = 375 - 2 * 16
      const expectedWidth = availableWidth - HERO_PEEK_WIDTH - 8

      expect(result.current.computedItemWidth).toBe(expectedWidth)
    })

    it('computes snap interval for hero items', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'hero',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      const availableWidth = 375 - 2 * 16
      const expectedWidth = availableWidth - HERO_PEEK_WIDTH - 8

      expect(result.current.snapInterval).toBe(expectedWidth + 8)
    })

    it('does not enable paging', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'hero',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.pagingEnabled).toBe(false)
    })

    it('clamps item width to minimum 0 for small containers', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'hero',
        containerWidth: 50,
        contentPadding: 20,
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.computedItemWidth).toBeGreaterThanOrEqual(0)
    })

    it('clamps snap interval to minimum 1', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'hero',
        containerWidth: 50,
        contentPadding: 20,
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.snapInterval).toBeGreaterThanOrEqual(1)
    })
  })

  describe('full-screen layout', () => {
    it('uses full container width as item width', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'full-screen',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.computedItemWidth).toBe(375)
    })

    it('sets snap interval to container width', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'full-screen',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.snapInterval).toBe(375)
    })

    it('enables paging', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'full-screen',
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.pagingEnabled).toBe(true)
    })

    it('adapts to different container widths', () => {
      const config: CarouselLayoutConfig = {
        ...baseConfig,
        layout: 'full-screen',
        containerWidth: 768,
      }
      const { result } = renderHook(() => useCarouselLayout(config))

      expect(result.current.computedItemWidth).toBe(768)
      expect(result.current.snapInterval).toBe(768)
    })
  })

  describe('layout updates', () => {
    it('recalculates when container width changes', () => {
      const { result, rerender } = renderHook(
        (props: CarouselLayoutConfig) => useCarouselLayout(props),
        { initialProps: { ...baseConfig, layout: 'full-screen' as const } }
      )

      expect(result.current.computedItemWidth).toBe(375)

      rerender({
        ...baseConfig,
        layout: 'full-screen' as const,
        containerWidth: 414,
      })

      expect(result.current.computedItemWidth).toBe(414)
    })

    it('recalculates when layout changes', () => {
      const { result, rerender } = renderHook(
        (props: CarouselLayoutConfig) => useCarouselLayout(props),
        { initialProps: baseConfig }
      )

      expect(result.current.pagingEnabled).toBe(false)

      rerender({ ...baseConfig, layout: 'full-screen' })

      expect(result.current.pagingEnabled).toBe(true)
    })
  })
})
