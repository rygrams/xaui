import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    borderTopWidth: 1,
  },
  itemPressable: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  indicatorBackground: {
    position: 'absolute',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -10,
  },
  disabled: {
    opacity: 0.5,
  },
})
