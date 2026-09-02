import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    overflow: 'hidden',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CAC4D0',
  },
  activeIndicator: {
    width: 24,
    borderRadius: 4,
    backgroundColor: '#49454F',
  },
})
