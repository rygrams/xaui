import { forwardRef } from 'react'
import type { View } from 'react-native'
import { CloseButtonBase } from '../../system/close-button'
import { useXAUITheme } from '../../theme/theme-hooks'
import { closeButtonRecipe } from './close-button.recipe'
import type { CloseButtonProps } from './close-button.type'

/**
 * The way out, on its own.
 *
 * ```tsx
 * <CloseButton onPress={dismiss} accessibilityLabel="Fermer le panneau" />
 *
 * <CloseButton variant="ghost" size="sm" onPress={dismiss} accessibilityLabel="Fermer">
 *   <Icon as={XIcon} />
 * </CloseButton>
 * ```
 *
 * **It is the affordance `Chip`, `Alert`, `Dialog`, `Popover` and `BottomSheet` already
 * have, taken out of their recipes and given its own.** Those five keep theirs — a close
 * inside a component takes that component's colours and that component's scale, resolved
 * once at its root (R5) — and what was missing is this: a dismiss on something the library
 * does not own, a card header, a banner, a sheet of your own.
 *
 * The behaviour is the shared base's, unchanged: it owns its press state, because a cross
 * must be a different target from whatever surrounds it; it grows that target with
 * `hitSlop` rather than growing the glyph; it warns in development without an
 * `accessibilityLabel`, because a cross says "close" to someone who can see it and nothing
 * at all to someone who cannot; and with no children it draws its own cross from two bars a
 * quarter turn apart, so this works in a project that has installed no icon set.
 *
 * What is new is the recipe — a box that follows `size`, a disc that follows `variant`, and
 * a `color` that tints it.
 */
export const CloseButton = forwardRef<View, CloseButtonProps>(function CloseButton(
  { children, variant, size, radius, color, isDisabled = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()

  const selection = { variant, size, radius }
  const styles = closeButtonRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? closeButtonRecipe.tint({ theme, color, selection })
    : undefined

  return (
    <CloseButtonBase
      ref={ref}
      name="CloseButton"
      // The resolution order of §2 ter: the cached recipe, then the uncached tint. The
      // style props and `style` are the base's job — it owns the press state, so it is
      // the only one that can resolve `Pressable`'s function form (R9).
      baseStyle={tint ? [styles.root, tint.root] : styles.root}
      glyphStyle={tint ? [styles.glyph, tint.glyph] : styles.glyph}
      isDisabled={isDisabled}
      // R14 — the vocabulary is destructured above, so what is left is the base's own
      // props plus whatever style keys the caller wrote, and the base resolves those in
      // the right order because it is the one that owns the press state (R9).
      {...props}
      style={style}
    >
      {children}
    </CloseButtonBase>
  )
})

CloseButton.displayName = 'XAUI.CloseButton'
