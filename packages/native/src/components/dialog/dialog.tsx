import { useCallback, useMemo } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { DialogProvider } from './dialog.context'
import { dialogRecipe } from './dialog.recipe'
import type { DialogProps } from './dialog.type'

/**
 * A question the page has to be answered before it goes on.
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Trigger asChild>
 *     <Button variant="danger">Supprimer</Button>
 *   </Dialog.Trigger>
 *   <Dialog.Overlay />
 *   <Dialog.Content>
 *     <Dialog.Title>Supprimer ce document ?</Dialog.Title>
 *     <Dialog.Description>Définitif, sans corbeille.</Dialog.Description>
 *   </Dialog.Content>
 * </Dialog>
 * ```
 *
 * **The root renders no node.** It holds one piece of state and the styles the slots read.
 *
 * It is the `Popover` without an anchor: the same portal, the same context re-provision,
 * the same keyframes — and none of the measuring pass, the host origin or the collision
 * flip, because a centred box has nothing to be measured against.
 */
export function Dialog({
  children,
  radius,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
}: DialogProps) {
  const theme = useXAUITheme()

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const styles = dialogRecipe.resolve({ theme, selection: { radius } })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(current => !current), [setOpen])

  const context = useMemo(
    () => ({
      overlayStyle: styles.overlay,
      panelStyle: styles.panel,
      contentStyle: styles.content,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      isOpen,
      isDisabled,
      open,
      close,
      toggle,
    }),
    [styles, isOpen, isDisabled, open, close, toggle]
  )

  return <DialogProvider value={context}>{children}</DialogProvider>
}

Dialog.displayName = 'XAUI.Dialog.Root'
