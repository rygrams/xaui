import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  drawerLeft: {
    top: 0,
    left: 0,
    bottom: 0,
  },
  drawerRight: {
    top: 0,
    right: 0,
    bottom: 0,
  },
  drawerTop: {
    top: 0,
    left: 0,
    right: 0,
  },
  drawerBottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
})
