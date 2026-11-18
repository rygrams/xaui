import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { createNodeSlot } from '../../system/node-slot'
import { DialogProvider } from './dialog.context'
import { moveFocusTo } from './dialog.focus'
import { useBanner } from './dialog.hook'
import { dialogRecipe } from './dialog.recipe'
import type { DialogProps } from './dialog.type'

/**
 * A question the page has to be answered before it goes on — the Native `Dialog`'s API,
 * drawn as the Metro `MessageBox`: a banner across the top of the screen, over the page
 * dimmed, which swivels in on its top edge and is sent back up with a swipe.
 * `placement="bottom"` lays it against the foot of the screen instead: it turns on its
 * bottom edge and is swiped back down.
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Trigger asChild>
 *     <Button>supprimer</Button>
 *   </Dialog.Trigger>
 *   <Dialog.Overlay />
 *   <Dialog.Content paddingTop={insets.top + 24}>
 *     <Dialog.Title>supprimer ce document ?</Dialog.Title>
 *     <Dialog.Description>définitif, sans corbeille.</Dialog.Description>
 *     <View style={{ flexDirection: 'row', gap: 12 }}>
 *       <Dialog.Close asChild>
 *         <Button flex={1}>supprimer</Button>
 *       </Dialog.Close>
 *       <Dialog.Close asChild>
 *         <Button flex={1} variant="outline">annuler</Button>
 *       </Dialog.Close>
 *     </View>
 *   </Dialog.Content>
 * </Dialog>
 * ```
 *
 * **The root renders no node.** It holds the open state, the banner's motion and the
 * styles the slots read. `radius` is Native's and draws nothing: a banner has no corner.
 * Nothing is felt as it opens; its buttons have their own haptic.
 */
export function DialogRoot({
  children,
  placement = 'top',
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
}: DialogProps) {
  const theme = useXAUITheme()
  const isStill = useAnimationDisabled()

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [isDismissable, setDismissable] = useState(true)
  const [backdrop] = useState(createNodeSlot)
  const trigger = useRef<View>(null)

  const id = useId()
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`

  const motion = useBanner(isOpen, isStill, placement)
  const styles = dialogRecipe.resolve({ theme, states: { disabled: isDisabled } })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen])

  // Back where it came from, once the banner is asked to go — not on the first render.
  const wasOpen = useRef(isOpen)
  useEffect(() => {
    if (wasOpen.current && !isOpen) moveFocusTo(trigger.current)
    wasOpen.current = isOpen
  }, [isOpen])

  const context = useMemo(
    () => ({
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      triggerStyle: styles.trigger,
      closeStyle: styles.close,
      labelStyle: styles.label,
      isOpen,
      isDisabled,
      placement,
      isStill,
      open,
      close,
      toggle,
      motion,
      isDismissable,
      setDismissable,
      backdrop,
      trigger,
      titleId,
      descriptionId,
    }),
    [
      styles,
      isOpen,
      isDisabled,
      placement,
      isStill,
      open,
      close,
      toggle,
      motion,
      isDismissable,
      backdrop,
      titleId,
      descriptionId,
    ]
  )

  return <DialogProvider value={context}>{children}</DialogProvider>
}

DialogRoot.displayName = 'XAUI.Tram.Dialog.Root'
