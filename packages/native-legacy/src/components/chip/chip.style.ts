import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  avatar: {
    marginRight: 4,
  },
  startContent: {
    marginRight: 4,
  },
  endContent: {
    marginLeft: 4,
  },
  closeButton: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 9999,
    marginRight: 6,
  },
  groupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
