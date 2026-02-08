import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    position: 'absolute',
  },
  spotlightHalo: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  highlightContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    gap: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  description: {
    fontSize: 27,
    fontWeight: '400',
    opacity: 0.86,
    lineHeight: 35,
  },
  actionPressable: {
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
})
