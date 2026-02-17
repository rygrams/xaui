import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexBasis: 'auto',
    width: '100%',
  },
  noFullWidth: {
    width: undefined,
    alignSelf: 'flex-start',
  },
  snippet: {
    position: 'relative',
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'monospace',
    includeFontPadding: false,
  },
  topInset: {
    paddingTop: 44,
  },
  bottomInset: {
    paddingBottom: 44,
  },
  copyButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  top: {
    top: 8,
  },
  bottom: {
    bottom: 8,
  },
  left: {
    left: 8,
  },
  right: {
    right: 8,
  },
  copyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    includeFontPadding: false,
  },
  disabled: {
    opacity: 0.55,
  },
})
