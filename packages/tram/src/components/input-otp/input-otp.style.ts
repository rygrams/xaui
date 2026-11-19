import { Platform, StyleSheet } from 'react-native'

/**
 * The hidden input, and why it is hidden this way — Native's reasoning, unchanged.
 *
 * It covers the boxes so a tap anywhere on the row lands on it and opens the keyboard. It
 * cannot be `display: 'none'` or zero-sized: iOS refuses to focus an input it considers
 * invisible, and the autofill heuristics skip it — which would cost the `one-time-code`
 * suggestion. iOS keeps a hair of opacity for that reason; elsewhere zero. The text is
 * transparent so a stray selection never shows through the boxes.
 */
export const inputOTPSheet = StyleSheet.create({
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    color: 'transparent',
    ...Platform.select({
      ios: { opacity: 0.02 },
      default: { opacity: 0 },
    }),
  },
})
