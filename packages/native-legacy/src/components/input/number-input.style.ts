import { StyleSheet } from 'react-native'

export const numberInputStyles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepperButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  stepperDisabled: {
    opacity: 0.4,
  },
})
