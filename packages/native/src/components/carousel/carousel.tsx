import React, { useState, useRef, useCallback, useEffect } from 'react'
import type {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView as ScrollViewType,
} from 'react-native'
import { ScrollView, View } from 'react-native'
import { styles } from './carousel.style'
import { useCarouselLayout } from './carousel.hook'
import { CarouselItem } from './carousel-item'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import type { CarouselProps } from './carousel.type'

const DEFAULT_ITEM_WIDTH = 186
const DEFAULT_ITEM_HEIGHT = 205
const DEFAULT_ITEM_SPACING = 8
const DEFAULT_CONTENT_PADDING = 16
const DEFAULT_AUTO_PLAY_INTERVAL = 3000

export function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  layout = 'multi-browse',
  itemWidth = DEFAULT_ITEM_WIDTH,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  itemSpacing = DEFAULT_ITEM_SPACING,
  contentPadding = DEFAULT_CONTENT_PADDING,
  radius = 'lg',
  showIndicator = false,
  autoPlay = false,
  autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
  initialIndex = 0,
  onActiveItemChange,
  customAppearance,
}: CarouselProps<T>) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const scrollRef = useRef<ScrollViewType>(null)
  const onActiveItemChangeRef = useRef(onActiveItemChange)
  onActiveItemChangeRef.current = onActiveItemChange

  const { borderRadius } = useBorderRadiusStyles(radius)

  const isFullScreen = layout === 'full-screen'
  const effectivePadding = isFullScreen ? 0 : contentPadding
  const effectiveSpacing = isFullScreen ? 0 : itemSpacing

  const { computedItemWidth, snapInterval, pagingEnabled } = useCarouselLayout({
    layout,
    containerWidth,
    preferredItemWidth: itemWidth,
    itemSpacing: effectiveSpacing,
    contentPadding: effectivePadding,
  })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }, [])

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (snapInterval <= 0) return
      const offsetX = event.nativeEvent.contentOffset.x
      const newIndex = Math.round(offsetX / snapInterval)
      const clampedIndex = Math.max(0, Math.min(newIndex, data.length - 1))
      setActiveIndex(clampedIndex)
      onActiveItemChangeRef.current?.(clampedIndex)
    },
    [snapInterval, data.length]
  )

  useEffect(() => {
    if (!autoPlay || data.length <= 1) return
    if (containerWidth <= 0 || snapInterval <= 0) return

    const timer = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = (prev + 1) % data.length
        scrollRef.current?.scrollTo({ x: nextIndex * snapInterval, animated: true })
        onActiveItemChangeRef.current?.(nextIndex)
        return nextIndex
      })
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlay, autoPlayInterval, data.length, snapInterval, containerWidth])

  if (containerWidth <= 0) {
    return <View style={customAppearance?.container} onLayout={handleLayout} />
  }

  return (
    <View style={customAppearance?.container} onLayout={handleLayout}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={pagingEnabled ? undefined : snapInterval}
        pagingEnabled={pagingEnabled}
        decelerationRate="fast"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: effectivePadding },
        ]}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentOffset={{ x: initialIndex * snapInterval, y: 0 }}
      >
        {data.map((item, index) => (
          <CarouselItem
            key={keyExtractor ? keyExtractor(item, index) : String(index)}
            width={computedItemWidth}
            height={itemHeight}
            radius={borderRadius}
            spacing={effectiveSpacing}
            isLast={index === data.length - 1}
            customStyle={customAppearance?.item}
          >
            {renderItem({ item, index })}
          </CarouselItem>
        ))}
      </ScrollView>

      {showIndicator && data.length > 1 && (
        <View
          style={[styles.indicatorContainer, customAppearance?.indicatorContainer]}
        >
          {data.map((_, index) => (
            <View
              key={`indicator-${String(index)}`}
              style={[
                styles.indicator,
                customAppearance?.indicator,
                activeIndex === index && styles.activeIndicator,
                activeIndex === index && customAppearance?.activeIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}
