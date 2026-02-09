import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native'
import { ScrollView, View } from 'react-native'
import { styles } from './pager.style'
import { PagerItem } from './pager-item'
import type { PagerItemProps, PagerProps } from './pager.type'

function clampPage(page: number, max: number) {
  return Math.max(0, Math.min(page, max))
}

type PagerPage = {
  key: string
  content: React.ReactNode
}

function toPages(children: React.ReactNode): PagerPage[] {
  return React.Children.toArray(children).flatMap((child, index) => {
    if (!React.isValidElement<PagerItemProps>(child) || child.type !== PagerItem) {
      return []
    }

    return [
      {
        key: child.key != null ? String(child.key) : `page-${String(index)}`,
        content: child.props.children,
      },
    ]
  })
}

export const Pager: React.FC<PagerProps> = ({
  isFullscreen = false,
  isfullscreen,
  page: controlledPage,
  defaultPage = 0,
  onPageChange,
  swipeEnabled = true,
  showIndicator = true,
  renderIndicator,
  children,
  customAppearance,
}) => {
  const isPagerFullscreen = isFullscreen || isfullscreen === true
  const pages = useMemo(() => toPages(children), [children])
  const maxPage = Math.max(0, pages.length - 1)
  const isControlled = controlledPage !== undefined
  const [internalPage, setInternalPage] = useState(clampPage(defaultPage, maxPage))
  const [containerWidth, setContainerWidth] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const initialScrollAppliedRef = useRef(false)

  const activePage = clampPage(
    isControlled ? controlledPage ?? 0 : internalPage,
    maxPage
  )

  useEffect(() => {
    if (isControlled || pages.length === 0) return

    setInternalPage(prev => clampPage(prev, maxPage))
  }, [isControlled, maxPage, pages.length])

  useEffect(() => {
    if (containerWidth <= 0) return
    if (pages.length <= 1) return

    const x = activePage * containerWidth

    if (!initialScrollAppliedRef.current) {
      initialScrollAppliedRef.current = true
      scrollViewRef.current?.scrollTo({ x, animated: false })
      return
    }

    scrollViewRef.current?.scrollTo({ x, animated: true })
  }, [activePage, containerWidth, pages.length])

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }, [])

  const commitPageChange = useCallback(
    (nextPage: number) => {
      if (!isControlled) {
        setInternalPage(nextPage)
      }
      onPageChange?.(nextPage)
    },
    [isControlled, onPageChange]
  )

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (containerWidth <= 0 || pages.length === 0) return

      const rawPage = Math.round(event.nativeEvent.contentOffset.x / containerWidth)
      const nextPage = clampPage(rawPage, maxPage)

      if (nextPage !== activePage) {
        commitPageChange(nextPage)
      }
    },
    [activePage, commitPageChange, containerWidth, maxPage, pages.length]
  )

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.container,
        isPagerFullscreen && styles.fullscreenContainer,
        customAppearance?.container,
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={swipeEnabled}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        style={[
          isPagerFullscreen && styles.fullscreenScrollView,
          customAppearance?.scrollView,
        ]}
      >
        {pages.map(pagerPage => (
          <View
            key={pagerPage.key}
            style={[
              styles.page,
              isPagerFullscreen && styles.fullscreenPage,
              customAppearance?.page,
              containerWidth > 0 && { width: containerWidth },
            ]}
          >
            {pagerPage.content}
          </View>
        ))}
      </ScrollView>

      {showIndicator && pages.length > 1 && (
        <View
          style={[
            styles.indicatorContainer,
            customAppearance?.indicatorContainer,
            isPagerFullscreen && styles.fullscreenIndicatorContainer,
          ]}
        >
          {pages.map((_, index) => {
            const isActive = index === activePage

            if (renderIndicator) {
              return (
                <React.Fragment key={`indicator-${String(index)}`}>
                  {renderIndicator({ index, isActive, total: pages.length })}
                </React.Fragment>
              )
            }

            return (
              <View
                key={`indicator-${String(index)}`}
                style={[
                  styles.indicator,
                  customAppearance?.indicator,
                  isActive && styles.activeIndicator,
                  isActive && customAppearance?.activeIndicator,
                ]}
              />
            )
          })}
        </View>
      )}
    </View>
  )
}
