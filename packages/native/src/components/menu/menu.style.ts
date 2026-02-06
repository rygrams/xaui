import { StyleSheet } from 'react-native'

const SCREEN_INDENT = 8

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  menuContainer: {
    position: 'absolute',
    paddingVertical: 8,
    minWidth: 112,
    maxWidth: 280,
  },
})

export const ANIMATION_DURATION = 250
export const MENU_SCREEN_INDENT = SCREEN_INDENT
