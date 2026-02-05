import React, { useMemo, useRef } from 'react'
import {
  ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import { MasonryGrid } from './masonry-grid'
import { MasonryGridItem } from './masonry-grid-item'
import type { MasonryGridBuilderProps } from './masonry-grid-builder.type'

const resolveMasonryData = <T,>(
  data: readonly T[] | undefined,
  itemCount: number | undefined
) => {
  if (data) return data
  if (!itemCount || itemCount <= 0) return []
  return Array.from({ length: itemCount }, (_, index) => index as T)
}

export const MasonryGridBuilder = <T,>({
  data,
  itemCount,
  renderItem,
  itemBuilder,
  keyExtractor,
  columns = 2,
  spacing,
  rowSpacing,
  columnSpacing,
  style,
  columnStyle,
  onEndReached,
  onEndReachedThreshold = 0.1,
  header,
  footer,
  scrollEnabled,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  bounces,
  onScroll,
}: MasonryGridBuilderProps<T>) => {
  const resolvedData = useMemo(
    () => resolveMasonryData(data, itemCount),
    [data, itemCount]
  )

  const resolvedKeyExtractor = useMemo(() => {
    if (keyExtractor) return keyExtractor
    return (_: T, index: number) => `masonry-${index}`
  }, [keyExtractor])

  const resolvedRenderer = useMemo(() => {
    if (renderItem) return renderItem
    if (itemBuilder)
      return ({ item, index }: { item: T; index: number }) =>
        itemBuilder({ item, index })
    return undefined
  }, [renderItem, itemBuilder])

  const lastEndReachedHeight = useRef(0)

  if (!resolvedRenderer) return null

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    onScroll?.(event)
    if (!onEndReached) return

    const { layoutMeasurement, contentOffset, contentSize } =
      event.nativeEvent
    if (!layoutMeasurement?.height) return

    const distanceFromEnd =
      contentSize.height - (layoutMeasurement.height + contentOffset.y)
    const threshold = onEndReachedThreshold * layoutMeasurement.height

    if (
      distanceFromEnd <= threshold &&
      contentSize.height !== lastEndReachedHeight.current
    ) {
      lastEndReachedHeight.current = contentSize.height
      onEndReached()
    }
  }

  return (
    <ScrollView
      scrollEventThrottle={16}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      bounces={bounces}
      onScroll={handleScroll}
    >
      {header}
      <MasonryGrid
        columns={columns}
        spacing={spacing}
        rowSpacing={rowSpacing}
        columnSpacing={columnSpacing}
        style={[{ width: '100%' }, style]}
        columnStyle={columnStyle}
      >
        {resolvedData.map((item, index) => (
          <MasonryGridItem key={resolvedKeyExtractor(item, index)}>
            {resolvedRenderer({ item, index })}
          </MasonryGridItem>
        ))}
      </MasonryGrid>
      {footer}
    </ScrollView>
  )
}

MasonryGridBuilder.displayName = 'MasonryGridBuilder'
