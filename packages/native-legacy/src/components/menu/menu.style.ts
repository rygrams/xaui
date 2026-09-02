import { StyleSheet } from 'react-native'

const SCREEN_INDENT = 8
const MENU_GAP = 4

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
    minWidth: 200,
    maxWidth: 320,
  },
})

export const ANIMATION_DURATION = 250
export const MENU_SCREEN_INDENT = SCREEN_INDENT
export const MENU_TRIGGER_GAP = MENU_GAP
