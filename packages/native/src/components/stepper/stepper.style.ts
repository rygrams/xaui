import { StyleSheet } from 'react-native'

/**
 * The two static corrections, neither of which depends on a token.
 *
 * `hidden` is how the rail ends: the first step's incoming line and the last step's
 * outgoing one are drawn transparent rather than dropped, because a horizontal step keeps
 * its indicator centred by having a line on both sides of it — removing one would slide
 * every end circle off its label.
 *
 * `flush` takes the run-off space back from the last vertical step. That padding exists to
 * give the line somewhere to run; under the last step there is no line and no next step,
 * only trailing whitespace.
 */
export const sheet = StyleSheet.create({
  hidden: { backgroundColor: 'transparent' },
  flush: { paddingBottom: 0 },
})
