import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import { AppBar } from '../app-bar/app-bar'
import type { ScaffoldAppBarProps } from './scaffold.type'

export const ScaffoldAppBar: React.FC<ScaffoldAppBarProps> = ({
  children,
  variant = 'docked',
  elevation = 0,
  themeColor = 'default',
  style,
  onBack,
}) => {
  const theme = useXUITheme()

  return (
    <AppBar variant={variant} elevation={elevation} themeColor={themeColor} style={style}>
      {onBack && (
        <Pressable onPress={onBack} style={styles.backButton}>
          <ArrowBackIcon size={24} color={withOpacity(theme.colors.foreground, 0.75)} />
        </Pressable>
      )}
      <View style={styles.childrenWrapper}>{children}</View>
    </AppBar>
  )
}

const styles = StyleSheet.create({
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
    marginRight: 4,
  },
  childrenWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
