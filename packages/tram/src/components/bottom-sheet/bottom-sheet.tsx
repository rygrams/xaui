import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { moveFocusTo } from '../../system/move-focus'
import { createNodeSlot } from '../../system/node-slot'
import { BottomSheetProvider } from './bottom-sheet.context'
import { useSheetMotion } from './bottom-sheet.hook'
import { bottomSheetRecipe } from './bottom-sheet.recipe'
import type { BottomSheetProps } from './bottom-sheet.type'

/**
 * A surface that comes up from the bottom edge and can be thrown back down — the Native
 * `BottomSheet`'s API, drawn as the Metro sheet: a band the width of the screen in the
 * theme's contrast, white on the dark theme and black on the light one, over the page
 * dimmed. It rises on the Metro curve to the height of its content, and is dragged back
 * down.
 *
 * ```tsx
 * <BottomSheet>
 *   <BottomSheet.Trigger asChild>
 *     <Button>partager</Button>
 *   </BottomSheet.Trigger>
 *   <BottomSheet.Overlay />
 *   <BottomSheet.Content>
 *     <BottomSheet.Title>partager</BottomSheet.Title>
 *     <BottomSheet.Close accessibilityLabel="fermer" />
 *     <BottomSheet.Description>un lien en lecture seule.</BottomSheet.Description>
 *   </BottomSheet.Content>
 * </BottomSheet>
 * ```
 *
 * **The root renders no node.** It holds the disclosure — up or gone — the band's motion
 * and the styles the slots read. One height: no handle, no reduced state. `radius` is Native's
 * and draws nothing: the band has no corner. Nothing is felt as it opens; what is put on
 * it has its own haptic.
 */
export function BottomSheetRoot({
  children,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
  dismissThreshold = 0.35,
}: BottomSheetProps) {
  const theme = useXAUITheme()
  const isStill = useAnimationDisabled()

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [height, setHeight] = useState(0)
  const [isDismissable, setDismissable] = useState(true)
  const [backdrop] = useState(createNodeSlot)
  const trigger = useRef<View>(null)

  const id = useId()
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`

  const motion = useSheetMotion({ isOpen, isStill, measured: height })
  const styles = bottomSheetRecipe.resolve({
    theme,
    states: { disabled: isDisabled },
  })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen])

  // Back where it came from, once the band is asked to go — not on the first render.
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
      triggerLabelStyle: styles.triggerLabel,
      closeStyle: styles.close,
      closeLabelStyle: styles.closeLabel,
      closeCornerStyle: styles.closeCorner,
      closeBarStyle: styles.closeBar,
      isOpen,
      isDisabled,
      isStill,
      dismissThreshold,
      setHeight,
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
      isStill,
      dismissThreshold,
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

  return <BottomSheetProvider value={context}>{children}</BottomSheetProvider>
}

BottomSheetRoot.displayName = 'XAUI.Tram.BottomSheet.Root'
