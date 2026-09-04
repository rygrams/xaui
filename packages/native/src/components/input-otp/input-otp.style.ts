import { Platform, StyleSheet } from 'react-native'

/**
 * The hidden input, and why it is hidden this way.
 *
 * It covers the boxes so a tap anywhere on the row lands on it, which is what makes the
 * keyboard appear without a `Pressable` wrapping everything. It cannot be
 * `display: 'none'` or zero-sized: an input the platform considers invisible is one iOS
 * refuses to focus, and one the autofill heuristics skip — which would cost the
 * `one-time-code` suggestion that is the whole point of the component.
 *
 * iOS keeps a hair of opacity for that reason; Android is happy at zero. Both paint their
 * text transparent so a stray caret or selection never shows through the boxes.
 */
export const inputOTPSheet = StyleSheet.create({
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    color: 'transparent',
    // A caret of our own is drawn in the active box; the platform's would sit wherever
    // the invisible text happens to end.
    ...Platform.select({
      ios: { opacity: 0.02 },
      default: { opacity: 0 },
    }),
  },
})
