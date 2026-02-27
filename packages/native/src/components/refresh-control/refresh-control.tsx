import React from 'react'
import { RefreshControl as RNRefreshControl } from 'react-native'
import { useXUITheme } from '../../core'
import type { PullToRefreshProps } from './refresh-control.type'

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  refreshing,
  onRefresh,
  enabled = true,
  themeColor = 'primary',
  color,
  title,
  titleColor,
  progressViewOffset,
  children,
  refreshControlProps,
}) => {
  const theme = useXUITheme()
  const indicatorColor = color ?? theme.colors[themeColor].main
  const indicatorTitleColor = titleColor ?? theme.colors.foreground

  const refreshControl = (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      enabled={enabled}
      colors={[indicatorColor]}
      tintColor={indicatorColor}
      title={title}
      titleColor={indicatorTitleColor}
      progressViewOffset={progressViewOffset}
      {...refreshControlProps}
    />
  )

  return React.cloneElement(children, {
    refreshControl,
  })
}

PullToRefresh.displayName = 'PullToRefresh'
