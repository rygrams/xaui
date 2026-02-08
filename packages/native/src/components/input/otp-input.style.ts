import { StyleSheet } from 'react-native'

export const otpStyles = StyleSheet.create({
  container: {
    gap: 6,
  },
  fullWidth: {
    width: '100%',
  },
  segmentContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  segment: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  segmentText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  securedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  label: {
    fontWeight: '500',
  },
  helperText: {
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.6,
  },
})
