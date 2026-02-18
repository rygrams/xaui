import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderTrack: {
    height: 3,
    overflow: 'hidden',
    width: '100%',
  },
  loaderBar: {
    height: 3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  body: {
    flex: 1,
  },
  footer: {
    width: '100%',
  },
  floatingActionWrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabRegular: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  fabSmall: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  fabExtended: {
    width: 'auto',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  fabIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
})
