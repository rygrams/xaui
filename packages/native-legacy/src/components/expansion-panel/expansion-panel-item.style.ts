import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  startContent: {
    flexShrink: 0,
  },
  titleWrapper: {
    flex: 1,
  },
  indicator: {
    flexShrink: 0,
  },
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
    zIndex: -999,
  },
  contentOverflow: {
    overflow: 'hidden',
  },
})
