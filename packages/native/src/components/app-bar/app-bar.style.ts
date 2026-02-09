import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  floatingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  appBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  docked: {
    width: '100%',
    borderRadius: 0,
  },
  floating: {
    width: '92%',
    borderRadius: 9999,
    alignSelf: 'center',
  },
  startContent: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  endContent: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    minWidth: 40,
  },
})
