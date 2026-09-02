import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  group: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fullWidth: {
    flexShrink: 1,
    flexBasis: 'auto',
    width: '100%',
  },
  radio: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dot: {
    zIndex: 10,
  },
  label: {
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
})
