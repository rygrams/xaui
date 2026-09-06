import { Children, forwardRef, Fragment, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { ListProvider } from './list.context'
import { listRecipe } from './list.recipe'
import type { ListProps } from './list.type'

/**
 * Rows on a ground.
 *
 * ```tsx
 * <List>
 *   <List.Item onPress={openWifi}>
 *     <List.ItemPrefix>
 *       <Icon as={WifiIcon} />
 *     </List.ItemPrefix>
 *     <List.ItemContent>
 *       <List.ItemTitle>Wi-Fi</List.ItemTitle>
 *       <List.ItemDescription>Maison</List.ItemDescription>
 *     </List.ItemContent>
 *     <List.ItemSuffix>
 *       <Switch isSelected={isOn} />
 *     </List.ItemSuffix>
 *   </List.Item>
 * </List>
 * ```
 *
 * **It is the `Accordion` with rows that do not open**, which is why it reads the same
 * ladder, insets its separators the same way and lifts the same one variant. The two will
 * eventually share a container; declaring them apart is what would make a list on a card
 * sit one shade off it, so they at least name the same tokens today.
 *
 * **The separators are the root's**, drawn between the children rather than by them. A row
 * that drew its own would draw one under the last one too, and every list would start by
 * hiding it.
 *
 * **It does not select.** There is no `selectionMode` and no `selectedKeys`: picking one of
 * several things is what `Select` and `Menu` are, and a row that toggles carries the
 * control that toggles it — a `Switch` in its suffix, a `Checkbox` in its prefix. A list
 * that owned a selection would be a second, quieter menu with none of the affordances.
 */
export const ListRoot = forwardRef<View, ListProps>(function List(
  {
    children,
    variant,
    size,
    radius,
    color,
    hasSeparator = true,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const styles = listRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? listRecipe.tint({ theme, color, selection }) : undefined

  const context = useMemo(() => {
    const glyph = StyleSheet.flatten<TextStyle>([styles.prefix, tint?.prefix])

    return {
      separatorStyle: styles.separator,
      itemStyle: styles.item,
      itemPressedStyle: tint
        ? [styles.itemPressed, tint.itemPressed]
        : styles.itemPressed,
      prefixStyle: styles.prefix,
      contentStyle: styles.content,
      titleStyle: tint ? [styles.title, tint.title] : styles.title,
      descriptionStyle: styles.description,
      suffixStyle: styles.suffix,
      // An `Icon` in a prefix or a suffix takes the row's glyph size and the muted colour
      // the recipe put there, so a row's marks match its type without being told to.
      glyph: {
        size: glyph.fontSize,
        color: typeof glyph.color === 'string' ? glyph.color : undefined,
      },
      isDisabled,
    }
  }, [styles, tint, isDisabled])

  // `Children.toArray` rather than `Children.map`: it drops nulls, so a row rendered
  // conditionally cannot leave a hairline hanging where nothing is.
  const items = Children.toArray(children)

  const rows = items.map((child, index) => (
    <Fragment key={index}>
      {child}
      {hasSeparator && index < items.length - 1 ? (
        <View style={styles.separator} />
      ) : null}
    </Fragment>
  ))

  const rootStyle = [styles.root, tint?.root, styleProps, style]

  return (
    <ListProvider value={context}>
      {asChild ? (
        <Slot accessibilityRole="list" {...rest} ref={ref} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View
          // Announced once, by the thing that has the rows. Overridable (R9): a list of
          // one row is a row, and a list used as a container is neither.
          accessibilityRole="list"
          {...rest}
          ref={ref}
          style={rootStyle}
        >
          <View style={styles.container}>{rows}</View>
        </View>
      )}
    </ListProvider>
  )
})

ListRoot.displayName = 'XAUI.List.Root'
