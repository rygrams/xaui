import { StyleSheet } from 'react-native'

const MIN_WIDTH = 112
const MAX_WIDTH = 280

export const styles = StyleSheet.create({
  container: {
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  denseContainer: {
    height: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
  },
  startContent: {
    width: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endContent: {
    width: 24,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
})
