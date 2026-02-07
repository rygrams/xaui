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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuItemPressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontWeight: '500',
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  menuItemIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
})
