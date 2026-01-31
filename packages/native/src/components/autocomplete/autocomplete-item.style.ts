import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  itemContent: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
})
