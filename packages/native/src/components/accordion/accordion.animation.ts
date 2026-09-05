import { Easing, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'

/**
 * How the panel opens.
 *
 * There is no measured height anywhere in this component: the content is mounted or it is
 * not, and Reanimated's layout transition animates the row's height between the two.
 * Measuring it ourselves would mean a hidden pass on every open, and a panel whose
 * content grows afterwards — an image loading, a list filling — would be stuck at the
 * height it had when it was measured.
 *
 * HeroUI's spring, and stiffer than the chevron's: 1600 against 1000. A height is a
 * bigger distance than a rotation, and at the chevron's stiffness the same damping makes
 * a long panel take almost half a second to settle.
 */
export const LAYOUT = LinearTransition.springify()
  .damping(140)
  .stiffness(1600)
  .mass(4)

const CONTENT_MS = 200

/**
 * The content fades rather than sliding. The height is already moving underneath it, and
 * two things travelling at once reads as the panel fighting itself.
 */
export const contentEntering = FadeIn.duration(CONTENT_MS).easing(
  Easing.out(Easing.ease)
)
export const contentExiting = FadeOut.duration(CONTENT_MS).easing(
  Easing.in(Easing.ease)
)
