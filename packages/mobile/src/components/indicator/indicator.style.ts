import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
})
