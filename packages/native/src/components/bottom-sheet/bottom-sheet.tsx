import { useCallback, useMemo } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { BottomSheetProvider } from './bottom-sheet.context'
import { bottomSheetRecipe } from './bottom-sheet.recipe'
import type { BottomSheetProps } from './bottom-sheet.type'

/**
 * A surface that comes up from the bottom edge and can be thrown back down.
 *
 * ```tsx
 * <BottomSheet>
 *   <BottomSheet.Trigger asChild>
 *     <Button>Partager</Button>
 *   </BottomSheet.Trigger>
 *   <BottomSheet.Overlay />
 *   <BottomSheet.Content>
 *     <BottomSheet.Handle />
 *     <BottomSheet.Title>Partager</BottomSheet.Title>
 *   </BottomSheet.Content>
 * </BottomSheet>
 * ```
 *
 * **The root renders no node.** It holds one piece of state and the styles the slots read.
 *
 * It is built on this library's own peers rather than on `@gorhom/bottom-sheet`, which is
 * what HeroUI wraps. A sheet that slides, springs and dismisses is a pan gesture and a
 * shared value; taking a dependency for that would put a second animation library in every
 * app that installs one component.
 */
export function BottomSheet({
  children,
  radius,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
  dismissThreshold = 0.35,
}: BottomSheetProps) {
  const theme = useXAUITheme()

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const styles = bottomSheetRecipe.resolve({ theme, selection: { radius } })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(current => !current), [setOpen])

  const context = useMemo(
    () => ({
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      handleStyle: styles.handle,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      isOpen,
      isDisabled,
      dismissThreshold,
      open,
      close,
      toggle,
    }),
    [styles, isOpen, isDisabled, dismissThreshold, open, close, toggle]
  )

  return <BottomSheetProvider value={context}>{children}</BottomSheetProvider>
}

BottomSheet.displayName = 'XAUI.BottomSheet.Root'
