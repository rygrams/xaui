import { StyleSheet } from 'react-native'

/**
 * The empty cell that holds the bottom row's free corner open when nothing is composed
 * into it.
 *
 * `flex: 1` and nothing else — no token, which is why it is here rather than in the
 * recipe. Without it the `0` would slide to the start of its row and stop being the middle
 * column, which is the one thing a keypad's layout has to keep.
 */
export const numberPadSheet = StyleSheet.create({
  spacer: { flex: 1 },
})
