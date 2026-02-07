import React, { useState, useRef, useCallback, useEffect } from 'react'
import type {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
} from 'react-native-reanimated'
import { styles } from './carousel.style'
import { useCarouselLayout } from './carousel.hook'
import { CarouselItem } from './carousel-item'
import { AnimatedCarouselItem } from './animated-carousel-item'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import type { CarouselProps } from './carousel.type'

const DEFAULT_ITEM_WIDTH = 196
const DEFAULT_ITEM_HEIGHT = 205
const DEFAULT_ITEM_SPACING = 8
const DEFAULT_ITEM_SPACING_MULTI_BROWSE = 4
const DEFAULT_CONTENT_PADDING = 16
const DEFAULT_AUTO_PLAY_INTERVAL = 3000

export function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  layout = 'multi-browse',
  itemWidth = DEFAULT_ITEM_WIDTH,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  itemSpacing,
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
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const onActiveItemChangeRef = useRef(onActiveItemChange)
  onActiveItemChangeRef.current = onActiveItemChange

  const scrollX = useSharedValue(0)

  const { borderRadius } = useBorderRadiusStyles(radius)

  const defaultSpacing =
    layout === 'multi-browse'
      ? DEFAULT_ITEM_SPACING_MULTI_BROWSE
      : DEFAULT_ITEM_SPACING
  const resolvedSpacing = itemSpacing ?? defaultSpacing

  const isFullScreen = layout === 'full-screen'
  const effectivePadding = isFullScreen ? 0 : contentPadding
  const effectiveSpacing = isFullScreen ? 0 : resolvedSpacing

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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x
    },
  })

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

  const shouldAnimate = layout === 'multi-browse' || layout === 'hero'

  return (
    <View style={customAppearance?.container} onLayout={handleLayout}>
      <Animated.ScrollView
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
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentOffset={{ x: initialIndex * snapInterval, y: 0 }}
      >
        {data.map((item, index) => {
          const content = renderItem({ item, index })

          if (shouldAnimate) {
            return (
              <AnimatedCarouselItem
                key={keyExtractor ? keyExtractor(item, index) : String(index)}
                index={index}
                scrollX={scrollX}
                width={computedItemWidth}
                height={itemHeight}
                radius={borderRadius}
                spacing={effectiveSpacing}
                isLast={index === data.length - 1}
                customStyle={customAppearance?.item}
                layout={layout}
                snapInterval={snapInterval}
                containerWidth={containerWidth}
                contentPadding={effectivePadding}
              >
                {content}
              </AnimatedCarouselItem>
            )
          }

          return (
            <CarouselItem
              key={keyExtractor ? keyExtractor(item, index) : String(index)}
              width={computedItemWidth}
              height={itemHeight}
              radius={borderRadius}
              spacing={effectiveSpacing}
              isLast={index === data.length - 1}
              customStyle={customAppearance?.item}
            >
              {content}
            </CarouselItem>
          )
        })}
      </Animated.ScrollView>

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
