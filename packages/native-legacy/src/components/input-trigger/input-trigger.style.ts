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
  fileTrigger: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filePlusButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileContent: {
    textAlign: 'center',
  },
  fileCustomContent: {
    alignItems: 'center',
  },
  fileSelectedContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  content: {
    flex: 1,
    padding: 0,
  },
  helperText: {
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.6,
  },
})
