import { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { FabMenuProvider } from './fab-menu.context'
import { fabMenuRecipe } from './fab-menu.recipe'
import type { FabMenuAnchor, FabMenuProps } from './fab-menu.type'

/**
 * A FAB that opens the two or three things it could have been.
 *
 * ```tsx
 * <FabMenu>
 *   <FabMenu.Trigger placement="bottom-end" accessibilityLabel="Nouveau">
 *     <Fab.Icon as={PlusIcon} />
 *   </FabMenu.Trigger>
 *   <FabMenu.Overlay />
 *   <FabMenu.Content>
 *     <FabMenu.Item onPress={compose}>Nouveau message</FabMenu.Item>
 *     <FabMenu.Item onPress={label}>Nouveau libellé</FabMenu.Item>
 *     <FabMenu.Item onPress={folder}>Nouveau dossier</FabMenu.Item>
 *   </FabMenu.Content>
 * </FabMenu>
 * ```
 *
 * **The FAB does not move when the menu opens**, and that is the whole reason this exists
 * rather than the legacy one. That component re-rendered its FAB *inside* the portal, at
 * the portal's own bottom-end inset, so a FAB that had been sitting anywhere else jumped
 * across the screen at the moment it was pressed. Here the trigger is never re-parented:
 * it measures itself and the actions are positioned against that rectangle, which is the
 * `Select`'s and the `Menu`'s machinery, unchanged.
 *
 * **It is not a `Menu`.** A menu is one surface with rows inside it; these are separate
 * pills with air between them. A panel dropping out of a field is that field's list of
 * answers and belongs to its edge — a FAB floats over the page, so there is no edge for
 * its actions to belong to and each one carries its own.
 *
 * **The root renders no node.** It holds the disclosure, the anchor and the styles the
 * slots read. `FabMenu.Trigger` is the FAB and keeps its own `ref`.
 *
 * For a list of actions dropping out of a control that is not a FAB, that is `Menu`.
 */
export function FabMenu({
  children,
  size = 'md',
  radius,
  color,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
}: FabMenuProps) {
  const theme = useXAUITheme()
  const [anchor, setAnchor] = useState<FabMenuAnchor | null>(null)

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const selection = { size, radius }
  const styles = fabMenuRecipe.resolve({ theme, selection })
  // A spent action dims itself, which the root cannot see — so the root resolves that face
  // too and the pill picks. R5 stays intact: no slot touches the recipe. The second call
  // is a cache hit.
  const spent = fabMenuRecipe.resolve({
    theme,
    selection,
    states: { disabled: true },
  })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color ? fabMenuRecipe.tint({ theme, color, selection }) : undefined

  const open = useCallback(() => {
    if (!isDisabled) setOpen(true)
  }, [isDisabled, setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => {
    if (!isDisabled) setOpen(current => !current)
  }, [isDisabled, setOpen])

  const context = useMemo(() => {
    const itemLabelStyle = tint
      ? [styles.itemLabel, tint.itemLabel]
      : styles.itemLabel
    // A mark inside a pill takes the word's colour and one step above its size, the ladder
    // every icon slot in this library walks.
    const label = StyleSheet.flatten<TextStyle>(itemLabelStyle)

    return {
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      itemStyle: tint ? [styles.item, tint.item] : styles.item,
      itemDisabledStyle: spent.item,
      itemLabelStyle,
      glyph: {
        size: label.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot hand
        // to a third-party component expecting a string.
        color: typeof label.color === 'string' ? label.color : undefined,
      },
      size,
      isOpen,
      isDisabled,
      open,
      close,
      toggle,
      anchor,
      setAnchor,
    }
  }, [styles, spent, tint, size, isOpen, isDisabled, open, close, toggle, anchor])

  return <FabMenuProvider value={context}>{children}</FabMenuProvider>
}

FabMenu.displayName = 'XAUI.FabMenu.Root'
