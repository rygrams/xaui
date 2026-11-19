import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled, warnDev } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { moveFocusTo } from '../../system/move-focus'
import { createNodeSlot } from '../../system/node-slot'
import { BottomSheetProvider } from './bottom-sheet.context'
import { useSheetMotion } from './bottom-sheet.hook'
import { bottomSheetRecipe } from './bottom-sheet.recipe'
import { collapsedExtent } from './bottom-sheet.utils'
import type { BottomSheetProps, SheetState } from './bottom-sheet.type'

/**
 * A surface that comes up from the bottom edge and can be thrown back down — the Native
 * `BottomSheet`'s API, drawn as the Metro sheet: a band the width of the screen in the
 * theme's contrast, white on the dark theme and black on the light one, over the page
 * dimmed. It rises on the Metro curve and is dragged back down, or to a reduced height.
 *
 * ```tsx
 * <BottomSheet>
 *   <BottomSheet.Trigger asChild>
 *     <Button>partager</Button>
 *   </BottomSheet.Trigger>
 *   <BottomSheet.Overlay />
 *   <BottomSheet.Content>
 *     <BottomSheet.Handle />
 *     <BottomSheet.Title>partager</BottomSheet.Title>
 *     <BottomSheet.Description>un lien en lecture seule.</BottomSheet.Description>
 *   </BottomSheet.Content>
 * </BottomSheet>
 * ```
 *
 * **The root renders no node.** It holds the two disclosures — up or gone, and while up
 * full or reduced — the band's motion and the styles the slots read. `radius` is Native's
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
  collapsedHeight,
  isExpanded: controlledExpanded,
  defaultExpanded = true,
  onExpandedChange,
}: BottomSheetProps) {
  const theme = useXAUITheme()
  const isStill = useAnimationDisabled()

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [isExpanded, setExpanded] = useControllableState({
    value: controlledExpanded,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
  })

  const [summaryExtent, setSummaryExtent] = useState<number>()
  const [paddingBottom, setPaddingBottom] = useState(0)
  const [height, setHeight] = useState(0)
  const [isDismissable, setDismissable] = useState(true)
  const [backdrop] = useState(createNodeSlot)
  const trigger = useRef<View>(null)

  const id = useId()
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`

  // The slot wins: a measurement of the content is truer than a number written beside it.
  const collapsed = collapsedExtent(summaryExtent, paddingBottom, collapsedHeight)
  const isCollapsible = collapsed !== undefined
  const shownExpanded = isCollapsible ? isExpanded : true
  const resting: SheetState = isOpen
    ? shownExpanded
      ? 'expanded'
      : 'collapsed'
    : 'closed'

  useEffect(() => {
    if (summaryExtent === undefined || collapsedHeight === undefined) return
    warnDev(
      'Tram BottomSheet: `collapsedHeight` is ignored when a `BottomSheet.Summary` is ' +
        'present — the summary measures where to cut. Remove one of the two.'
    )
  }, [collapsedHeight, summaryExtent])

  const geometry = useMemo(
    () => ({ height, collapsedHeight: collapsed }),
    [height, collapsed]
  )
  const motion = useSheetMotion({ isOpen, isStill, resting, geometry })
  const styles = bottomSheetRecipe.resolve({
    theme,
    states: { disabled: isDisabled },
  })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen])
  const expand = useCallback(() => setExpanded(true), [setExpanded])
  const collapse = useCallback(() => setExpanded(false), [setExpanded])
  const toggleExpanded = useCallback(
    () => setExpanded(!isExpanded),
    [isExpanded, setExpanded]
  )

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
      handleStyle: styles.handle,
      handleBarStyle: styles.handleBar,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      triggerStyle: styles.trigger,
      triggerLabelStyle: styles.triggerLabel,
      closeStyle: styles.close,
      closeLabelStyle: styles.closeLabel,
      closeBarStyle: styles.closeBar,
      isOpen,
      isDisabled,
      isStill,
      dismissThreshold,
      collapsedHeight: collapsed,
      setSummaryExtent,
      setPaddingBottom,
      setHeight,
      isExpanded: shownExpanded,
      isCollapsible,
      resting,
      open,
      close,
      toggle,
      expand,
      collapse,
      toggleExpanded,
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
      collapsed,
      shownExpanded,
      isCollapsible,
      resting,
      open,
      close,
      toggle,
      expand,
      collapse,
      toggleExpanded,
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
