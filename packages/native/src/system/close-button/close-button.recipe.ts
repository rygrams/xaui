import type { SlotStyle } from '../recipe'
import type { XAUITheme } from '../../theme/theme.type'

/** The two slots a component publishes for a `CloseButton`: its box and one cross bar. */
export type CloseButtonSlots = { close: SlotStyle; closeGlyph: SlotStyle }

/**
 * The cross's own geometry, for the `base` of any recipe that hosts a `CloseButton`:
 *
 * ```ts
 * base: theme => ({ ...closeButtonBase(theme), root: { … } })
 * ```
 *
 * The bar's thickness and the box's centring belong to the button rather than to the
 * component around it, so they are written once here. What stays in the recipe is what is
 * genuinely the component's: the size of the box and the length of the bar, both of which
 * follow that component's own scale.
 *
 * Two bars are rendered, rotated a quarter turn apart, which is why only one is described
 * and why it is positioned absolutely — they overlap at the centre of the box.
 */
export function closeButtonBase(theme: XAUITheme): CloseButtonSlots {
  return {
    close: { alignItems: 'center', justifyContent: 'center' },
    closeGlyph: {
      position: 'absolute',
      height: theme.borderWidth.default * 1.5,
      borderRadius: theme.borderWidth.default,
    },
  }
}
