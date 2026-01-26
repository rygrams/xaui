import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  startContent: {
    marginRight: 4,
  },
  endContent: {
    marginLeft: 4,
  },
  spinner: {
    marginHorizontal: 4,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
})
