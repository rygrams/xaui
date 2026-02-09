import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 40,
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  left: {
    left: 0,
    top: 0,
    bottom: 0,
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0,
  },
  floating: {
    margin: 16,
  },
  floatingBottom: {
    marginBottom: 16,
  },
  floatingTop: {
    marginTop: 16,
  },
  elevated: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionsVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  disabledAction: {
    opacity: 0.38,
  },
})
