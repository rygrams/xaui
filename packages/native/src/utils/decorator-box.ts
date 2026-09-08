import type { ViewStyle } from 'react-native'
import type { XAUITheme } from '../theme/theme.type'

/**
 * What `FieldGroup.Prefix` and `FieldGroup.Suffix` share — everything but the edge they
 * are pinned to. They are taken **out of flow** and laid over the field, which is what
 * lets the box stay the field node itself: no wrapper borrows its border, its fill and
 * its radius, so a `FieldGroup` and a bare field cannot drift apart. The field clears
 * them by their measured width.
 *
 * `zIndex` is not decoration: the prefix is written before the field, so without it the
 * field's own fill paints over the glyph.
 *
 * **And `zIndex` alone is not enough on Android**, which is why the elevation is here too.
 * `primary` is the one variant that lifts its field — `theme.shadows.field`, which carries
 * an `elevation` — and an elevated sibling holds a *native* Z that a React `zIndex` does
 * not outrank: the field ends up over the decorator in the order Android hit-tests, and a
 * `TextInput` swallows the touch. The symptom is a suffix that is plainly visible and does
 * nothing, on `primary` and nowhere else — a `NumberField`'s stepper pair, a reveal toggle,
 * a clear button.
 *
 * A step above the field's own rather than a number written here, so the two cannot drift.
 * It draws no shadow of its own: Android takes an elevation shadow from the view's outline
 * and a decorator has no background to give it one.
 */
export const decoratorBox = (theme: XAUITheme): ViewStyle => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  elevation: theme.shadows.field.elevation + 1,
})
