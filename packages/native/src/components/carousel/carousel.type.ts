import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { Radius } from '../../types'

export type CarouselLayout = 'multi-browse' | 'uncontained' | 'hero' | 'full-screen'

export type CarouselCustomAppearance = {
  container?: ViewStyle
  item?: ViewStyle
  indicatorContainer?: ViewStyle
  indicator?: ViewStyle
  activeIndicator?: ViewStyle
}

export type CarouselProps<T> = {
  data: T[]
  renderItem: (info: { item: T; index: number }) => ReactNode
  keyExtractor?: (item: T, index: number) => string
  layout?: CarouselLayout
  itemWidth?: number
  itemHeight?: number
  itemSpacing?: number
  contentPadding?: number
  radius?: Radius
  showIndicator?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  initialIndex?: number
  onActiveItemChange?: (index: number) => void
  customAppearance?: CarouselCustomAppearance
}

export type CarouselItemProps = {
  children: ReactNode
  width: number
  height: number
  radius: number
  spacing: number
  isLast: boolean
  customStyle?: ViewStyle
}

export type CarouselLayoutConfig = {
  layout: CarouselLayout
  containerWidth: number
  preferredItemWidth: number
  itemSpacing: number
  contentPadding: number
}

export type CarouselLayoutResult = {
  computedItemWidth: number
  snapInterval: number
  pagingEnabled: boolean
}
