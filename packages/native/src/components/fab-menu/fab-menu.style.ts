import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  portalRoot: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayPressable: {
    flex: 1,
  },
  portalContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  menuContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 12,
  },
  menuItemChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 20,
    gap: 8,
  },
  menuItemLabel: {
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
})
