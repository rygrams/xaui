import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
  },
  noFullWidth: {
    alignSelf: 'flex-start',
  },
  inputContainer: {
    gap: 6,
  },
  label: {
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlinedWrapper: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 0,
  },
  slot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    includeFontPadding: false,
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  helperText: {
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.6,
  },
})
