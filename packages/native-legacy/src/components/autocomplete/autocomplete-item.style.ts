import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: '500',
  },
  description: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
})
