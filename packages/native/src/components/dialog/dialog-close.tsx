import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { CloseButtonBase } from '../../system/close-button'
import { useDialog } from './dialog.context'
import type { DialogCloseProps } from './dialog.type'

/**
 * The way out of the dialog, in either of the two shapes one takes.
 *
 * ```tsx
 * <Dialog.Content>
 *   <Dialog.Close alignSelf="flex-end" accessibilityLabel="Fermer" />
 *   <Dialog.Title>Supprimer ce document ?</Dialog.Title>
 *   <Dialog.Close asChild>
 *     <Button variant="danger">Supprimer</Button>
 *   </Dialog.Close>
 * </Dialog.Content>
 * ```
 *
 * **Empty, it draws a cross** — the shared `CloseButtonBase`'s, from two bars, so the corner
 * affordance exists in a project that has installed no icon set. Given children, or
 * `asChild`, it is whatever the dismissal actually says. Both close the dialog, which is
 * the only thing this file adds to the shared button.
 *
 * It places itself nowhere. `alignSelf`, or `position: 'absolute'` with a `top` and an
 * `end`, are the caller's call, because a title with room beside it and one without want
 * different answers (R4).
 */
export const DialogClose = forwardRef<View, DialogCloseProps>(function DialogClose(
  { asChild = false, onPress, ...props },
  ref
) {
  const { close, closeStyle, closeGlyphStyle } = useDialog()

  const handlePress = useCallback(
    (event: Parameters<NonNullable<DialogCloseProps['onPress']>>[0]) => {
      onPress?.(event)
      close()
    },
    [close, onPress]
  )

  return (
    <CloseButtonBase
      ref={ref}
      name="Dialog.Close"
      asChild={asChild}
      // The cross's box is 32 points square with a circular corner; a `Button` handed to
      // `asChild` has a height and a shape of its own, and would be squashed into that
      // one. The glyph style is safe either way — nothing renders the bars.
      baseStyle={asChild ? undefined : closeStyle}
      glyphStyle={closeGlyphStyle}
      onPress={handlePress}
      {...props}
    />
  )
})

DialogClose.displayName = 'XAUI.Dialog.Close'
