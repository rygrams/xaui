import { useMemo } from 'react'
import type { CarouselLayoutConfig, CarouselLayoutResult } from './carousel.type'

const HERO_PEEK_WIDTH = 56

function computeMultiBrowseLayout(
  config: CarouselLayoutConfig
): CarouselLayoutResult {
  const { preferredItemWidth, itemSpacing } = config
  return {
    computedItemWidth: preferredItemWidth,
    snapInterval: preferredItemWidth + itemSpacing,
    pagingEnabled: false,
  }
}

function computeUncontainedLayout(
  config: CarouselLayoutConfig
): CarouselLayoutResult {
  const { preferredItemWidth, itemSpacing } = config
  return {
    computedItemWidth: preferredItemWidth,
    snapInterval: preferredItemWidth + itemSpacing,
    pagingEnabled: false,
  }
}

function computeHeroLayout(config: CarouselLayoutConfig): CarouselLayoutResult {
  const { containerWidth, contentPadding, itemSpacing } = config
  const availableWidth = containerWidth - 2 * contentPadding
  const largeItemWidth = availableWidth - HERO_PEEK_WIDTH - itemSpacing
  return {
    computedItemWidth: Math.max(largeItemWidth, 0),
    snapInterval: Math.max(largeItemWidth + itemSpacing, 1),
    pagingEnabled: false,
  }
}

function computeFullScreenLayout(
  config: CarouselLayoutConfig
): CarouselLayoutResult {
  const { containerWidth } = config
  return {
    computedItemWidth: containerWidth,
    snapInterval: containerWidth,
    pagingEnabled: true,
  }
}

export function useCarouselLayout(
  config: CarouselLayoutConfig
): CarouselLayoutResult {
  return useMemo(() => {
    const layoutMap: Record<
      string,
      (c: CarouselLayoutConfig) => CarouselLayoutResult
    > = {
      'multi-browse': computeMultiBrowseLayout,
      uncontained: computeUncontainedLayout,
      hero: computeHeroLayout,
      'full-screen': computeFullScreenLayout,
    }

    const compute = layoutMap[config.layout] ?? computeMultiBrowseLayout
    return compute(config)
  }, [
    config.layout,
    config.containerWidth,
    config.preferredItemWidth,
    config.itemSpacing,
    config.contentPadding,
  ])
}

export { HERO_PEEK_WIDTH }
