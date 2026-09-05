import { useCallback, useMemo, useState } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { PopoverProvider } from './popover.context'
import { popoverRecipe } from './popover.recipe'
import type { PopoverAnchor, PopoverProps } from './popover.type'

/**
 * A panel anchored to whatever opened it.
 *
 * ```tsx
 * <Popover>
 *   <Popover.Trigger>
 *     <Button>Détails</Button>
 *   </Popover.Trigger>
 *   <Popover.Overlay />
 *   <Popover.Content placement="top">
 *     <Popover.Title>Livraison</Popover.Title>
 *     <Popover.Description>Sous trois jours ouvrés.</Popover.Description>
 *   </Popover.Content>
 * </Popover>
 * ```
 *
 * **The root renders no node.** It holds one piece of state and the styles the slots read.
 * `Popover.Overlay` and `Popover.Content` render into the nearest `PortalHost` rather than
 * where they are written, so their place in the JSX says when they exist, not where they
 * appear.
 *
 * This is the component the `Select` was written before. The anchored positioning, the
 * measuring pass and the entrance keyframes are shared between the two — `Menu`, `SubMenu`
 * and `Tooltip` read the same three.
 */
export function Popover({
  children,
  radius,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
}: PopoverProps) {
  const theme = useXAUITheme()
  const [anchor, setAnchor] = useState<PopoverAnchor | null>(null)

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const styles = popoverRecipe.resolve({
    theme,
    selection: { radius },
    states: { disabled: isDisabled },
  })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(current => !current), [setOpen])

  const context = useMemo(
    () => ({
      triggerStyle: styles.trigger,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      isOpen,
      isDisabled,
      open,
      close,
      toggle,
      anchor,
      setAnchor,
    }),
    [styles, isOpen, isDisabled, open, close, toggle, anchor]
  )

  return <PopoverProvider value={context}>{children}</PopoverProvider>
}

Popover.displayName = 'XAUI.Popover.Root'
