// Deep import — the `system/close-button` barrel pulls the base component in, and a
// recipe only wants the geometry.
import { closeButtonGeometry } from '../../system/close-button/close-button.recipe'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type {
  CloseButtonSize,
  CloseButtonSlot,
  CloseButtonVariant,
} from './close-button.type'

const SLOTS = ['root', 'glyph'] as const

/**
 * The four emphasis levels, and `secondary` is the neutral one — the `Checkbox`'s and the
 * `Radio`'s reading of the word, not the `Button`'s accent-soft. A close button is grey
 * before it is anything else, and the controls it sits beside in a form say grey with
 * `secondary`.
 *
 * **No `bgPressed`.** The press is the shared `PressableFeedback` treatment, because the
 * base owns the press state — a cross must be a different target from the panel around it
 * — and a root that does not know it is pressed cannot resolve a colour for it. Every
 * other close button in the library reads the same way, which is the point.
 */
const VARIANT_TOKENS: Record<CloseButtonVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'default', fg: 'defaultForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

/**
 * The box, and the length of one of the two bars that cross in it.
 *
 * `md` is the `Dialog`'s cross, which is HeroUI's measured: a 32-point square, and a bar
 * long enough to draw a cross about 11 points wide — a bar rotated a quarter turn spans
 * `length / √2` on each axis, so the bar is twice as long as it looks. Keeping that as a
 * **ratio** is what makes it one cross at four sizes rather than four drawings, exactly as
 * the `Radio`'s dot is a ratio of its circle.
 */
const BAR_RATIO = 16 / 32

/** The box's side, in spacing steps — `spacing(8)` is 32 on the base-4 scale. */
const BOXES: Record<CloseButtonSize, number> = { xs: 6, sm: 7, md: 8, lg: 10 }

function sizeAxis(box: number) {
  return (theme: XAUITheme): SlotStyles<CloseButtonSlot> => {
    const side = theme.spacing(box)

    return {
      root: { width: side, height: side, borderRadius: side / 2 },
      glyph: { width: Math.round(side * BAR_RATIO) },
    }
  }
}

export const closeButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    // Centring and the bar's thickness belong to the shared base, not to this recipe, and
    // the two slots below merge into it rather than sitting beside it — a second `glyph`
    // key in the same literal silently replaces the first, and a bar that has lost its
    // height draws nothing at all.
    const shared = closeButtonGeometry(theme)

    return {
      // The stroke does **not** scale with the box. It is the shared thickness the `Chip`,
      // the `Alert` and the `Dialog` all draw their cross at, and a family of crosses that
      // thicken with their container reads as four different marks rather than one.
      root: { ...shared.close, borderWidth: 0, borderCurve: 'continuous' },
      glyph: shared.closeGlyph,
    }
  },

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    glyph: { backgroundColor: colors.fg },
  }),

  variants: {
    size: {
      xs: sizeAxis(BOXES.xs),
      sm: sizeAxis(BOXES.sm),
      md: sizeAxis(BOXES.md),
      lg: sizeAxis(BOXES.lg),
    },

    /** Declared after `size` so it overrides the circle the box radius made. */
    radius: radiusAxis('root'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})
