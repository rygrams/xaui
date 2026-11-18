import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { DialogPress } from './dialog-press'
import { useDialog } from './dialog.context'
import type { DialogCloseProps } from './dialog.type'

/**
 * The way out of the banner — and each of its answers, since answering closes it.
 *
 * ```tsx
 * <Dialog.Close asChild>
 *   <Button flex={1}>supprimer</Button>
 * </Dialog.Close>
 * ```
 *
 * **It draws no cross**, where Native's does when left empty: a `MessageBox` has no
 * corner affordance, it is closed by its buttons. `asChild` makes it one of them; a
 * string is set in `body`. The caller's `onPress` runs first, then the banner closes.
 */
export const DialogClose = forwardRef<View, DialogCloseProps>(function DialogClose(
  { onPress, ...props },
  ref
) {
  const { closeStyle, close } = useDialog()

  const handlePress = useCallback(
    (event: Parameters<NonNullable<DialogCloseProps['onPress']>>[0]) => {
      onPress?.(event)
      close()
    },
    [onPress, close]
  )

  return (
    <DialogPress ref={ref} boxStyle={closeStyle} {...props} onPress={handlePress} />
  )
})

DialogClose.displayName = 'XAUI.Tram.Dialog.Close'
