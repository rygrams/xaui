import { StyleSheet } from 'react-native'

export const SNACKBAR_DEFAULT_DURATION = 4000
export const SNACKBAR_DEFAULT_HORIZONTAL_INSET = 16
export const SNACKBAR_DEFAULT_VERTICAL_INSET = 16
export const SNACKBAR_DEFAULT_SPACING = 8
export const SNACKBAR_DEFAULT_MAX_WIDTH = 640

export const styles = StyleSheet.create({
  stackContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
  },
  stackContent: {
    width: '100%',
    alignSelf: 'center',
  },
  surface: {
    width: '100%',
    minHeight: 48,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  surfaceWithoutActions: {
    paddingRight: 16,
  },
  messageWrapper: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    paddingRight: 8,
  },
  messageWrapperMultiline: {
    paddingVertical: 14,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '400',
  },
  trailingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 9999,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
