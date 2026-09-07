import { createRecipe } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { NumberFieldSlot } from './number-field.type'

const SLOTS = ['stepButton', 'stepGlyph', 'stepExhausted'] as const

/**
 * The two stepper buttons, and nothing else.
 *
 * Everything the field itself wears — the box, the border, the label, the help text, the
 * focus and the error — is the `TextField`'s recipe, resolved once on the root below.
 * What is genuinely new here is a mark the library draws itself, so a project that has
 * installed no icon set still gets a plus and a minus.
 *
 * The glyph's **length** follows the same ladder `FieldGroup.Icon` walks — one step above
 * the field's own type, because a mark the size of the text beside it reads as smaller
 * than that text. Its **thickness** is the close button's, for the same reason that one is
 * written once: two marks of different weights in the same field read as two icon sets.
 */
const GLYPHS: Record<Size, FontSizeKey> = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl',
}

function sizeAxis(size: Size) {
  return (theme: XAUITheme): SlotStyles<NumberFieldSlot> => {
    const side = theme.fontSizes[GLYPHS[size]]

    return {
      stepButton: { width: side, height: side },
      stepGlyph: { width: side },
    }
  }
}

export const numberFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    stepButton: { alignItems: 'center', justifyContent: 'center' },
    // Absolute, because the plus is this bar and a second one a quarter turn from it, and
    // the two have to overlap at the centre rather than stack.
    stepGlyph: {
      position: 'absolute',
      height: theme.borderWidth.default * 1.5,
      borderRadius: theme.borderWidth.default,
      backgroundColor: theme.colors.foreground,
    },
    // Not a state on the button: the two buttons run out of room at different ends of the
    // range, so which one is spent is the slot's own question and not the root's.
    stepExhausted: { opacity: theme.opacity.disabled },
  }),

  variants: {
    size: {
      xs: sizeAxis('xs'),
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },
  },

  states: {
    disabled: theme => ({ stepButton: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { size: 'md' },
})
