import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: '500',
  },
  description: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.5,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
})
