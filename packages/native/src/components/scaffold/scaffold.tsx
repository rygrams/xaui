import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import { useXUITheme } from '../../core'
import { ScaffoldAppBar } from './scaffold-app-bar'
import { ScaffoldBody } from './scaffold-body'
import { ScaffoldFabButton } from './scaffold-fab-button'
import { ScaffoldFooter } from './scaffold-footer'
import { useLinearLoader } from './scaffold.hook'
import { styles } from './scaffold.style'
import type { ScaffoldBodyProps, ScaffoldProps } from './scaffold.type'

type LinearLoaderProps = {
  themeColor: NonNullable<ScaffoldProps['themeColor']>
}

const LinearLoader: React.FC<LinearLoaderProps> = ({ themeColor }) => {
  const { translateX, barWidth, barColor, trackColor } = useLinearLoader(
    true,
    themeColor
  )

  return (
    <View style={[styles.loaderTrack, { backgroundColor: trackColor }]}>
      <Animated.View
        style={[
          styles.loaderBar,
          {
            width: barWidth,
            backgroundColor: barColor,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  )
}

type SlotType = typeof ScaffoldAppBar | typeof ScaffoldBody | typeof ScaffoldFooter | typeof ScaffoldFabButton

export const Scaffold: React.FC<ScaffoldProps> = ({
  children,
  isLoading = false,
  isRefreshing = false,
  themeColor = 'primary',
  backgroundColor,
  style,
  onRefresh,
  onScroll,
}) => {
  const theme = useXUITheme()
  const bg = backgroundColor ?? theme.colors.background

  const getSlot = useCallback(
    (type: SlotType) =>
      React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === type
      ) as React.ReactElement | undefined,
    [children]
  )

  const appBarChild = getSlot(ScaffoldAppBar)
  const footerChild = getSlot(ScaffoldFooter)
  const fabChild = getSlot(ScaffoldFabButton)

  const bodyChild = (() => {
    const explicit = getSlot(ScaffoldBody)
    if (!explicit) return null
    const injected: ScaffoldBodyProps = {
      isRefreshing,
      themeColor,
      onRefresh,
      onScroll,
      ...(explicit.props as ScaffoldBodyProps),
    }
    return React.cloneElement(explicit, injected)
  })()

  return (
    <View style={[styles.container, { backgroundColor: bg }, style]}>
      {appBarChild}
      {isLoading && <LinearLoader themeColor={themeColor} />}
      {bodyChild}
      {footerChild}
      {fabChild && (
        <View style={styles.floatingActionWrapper} pointerEvents="box-none">
          {fabChild}
        </View>
      )}
    </View>
  )
}
