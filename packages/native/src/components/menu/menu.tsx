import { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { MenuProvider } from './menu.context'
import { menuRecipe } from './menu.recipe'
import type { MenuAnchor, MenuItemVariant, MenuProps } from './menu.type'

const VARIANTS = ['default', 'danger'] as const

/**
 * A list of actions, anchored to whatever opened it.
 *
 * ```tsx
 * <Menu>
 *   <Menu.Trigger asChild>
 *     <Button variant="tertiary">Actions</Button>
 *   </Menu.Trigger>
 *   <Menu.Overlay />
 *   <Menu.Content>
 *     <Menu.Item onPress={rename}>
 *       <Menu.ItemTitle>Renommer</Menu.ItemTitle>
 *     </Menu.Item>
 *     <Menu.Item variant="danger" onPress={remove}>
 *       <Menu.ItemTitle>Supprimer</Menu.ItemTitle>
 *     </Menu.Item>
 *   </Menu.Content>
 * </Menu>
 * ```
 *
 * **The root renders no node**, and its positioning is the `Popover`'s — the same measuring
 * pass, the same host origin, the same keyframes. What is a menu's own is the row: a list
 * of actions where one of them can be the destructive one.
 */
export function Menu({
  children,
  radius,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
}: MenuProps) {
  const theme = useXAUITheme()
  const [anchor, setAnchor] = useState<MenuAnchor | null>(null)

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const selection = { radius }
  const styles = menuRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  // A row owns its own press state, which the root cannot see, so the root resolves both
  // faces and each row picks. R5 stays intact: no slot touches the recipe.
  const pressed = menuRecipe.resolve({ theme, selection, states: { pressed: true } })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(current => !current), [setOpen])

  const context = useMemo(() => {
    // Both intents resolved up front. A row picks one; nothing re-resolves per row, which
    // is what keeps a menu of forty actions the same cost as a menu of two.
    const byVariant = <T,>(read: (variant: MenuItemVariant) => T) =>
      Object.fromEntries(VARIANTS.map(v => [v, read(v)])) as Record<
        MenuItemVariant,
        T
      >

    const title = byVariant(
      variant =>
        menuRecipe.resolve({ theme, selection: { ...selection, variant } }).itemTitle
    )

    return {
      triggerStyle: styles.trigger,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      labelStyle: styles.label,
      separatorStyle: styles.separator,
      groupStyle: styles.group,
      itemStyle: styles.item,
      itemPressedStyle: pressed.item,
      itemTitleStyle: title,
      itemDescriptionStyle: styles.itemDescription,
      itemIndicatorStyle: styles.itemIndicator,
      glyph: byVariant(variant => {
        const flat = StyleSheet.flatten<TextStyle>([title[variant]])
        return {
          size: flat.fontSize,
          // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
          // hand to a third-party component expecting a string.
          color: typeof flat.color === 'string' ? flat.color : undefined,
        }
      }),
      isOpen,
      isDisabled,
      open,
      close,
      toggle,
      anchor,
      setAnchor,
    }
    // `radius` rather than `selection`, which is a fresh object on every render.
  }, [
    styles,
    pressed,
    theme,
    radius,
    isOpen,
    isDisabled,
    open,
    close,
    toggle,
    anchor,
  ])

  return <MenuProvider value={context}>{children}</MenuProvider>
}

Menu.displayName = 'XAUI.Menu.Root'
