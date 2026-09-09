import { Easing, FadeIn, FadeOut } from 'react-native-reanimated'

export const snackbarEntering = FadeIn.duration(220)
  .easing(Easing.out(Easing.cubic))
  .withInitialValues({ opacity: 0, transform: [{ scale: 0.92 }] })

export const snackbarExiting = FadeOut.duration(180)
  .easing(Easing.in(Easing.cubic))
  .withInitialValues({ opacity: 1, transform: [{ scale: 1 }] })
