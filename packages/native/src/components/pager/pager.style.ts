import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  fullscreenContainer: {
    flex: 1,
  },
  fullscreenScrollView: {
    flex: 1,
  },
  page: {
    width: '100%',
  },
  fullscreenPage: {
    flex: 1,
  },
  indicatorContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenIndicatorContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    marginTop: 0,
    zIndex: 1,
    elevation: 1,
  },
  indicator: {
    width: 8,
    height: 8,
    marginHorizontal: 3,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
  },
  activeIndicator: {
    width: 18,
    backgroundColor: '#111827',
  },
})
