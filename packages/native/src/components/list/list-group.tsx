import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { ListGroupProvider } from './list-group.context'
import { listGroupRecipe } from './list-group.recipe'
import type { ListGroupProps } from './list-group.type'

/**
 * Lists in sections, each under what its rows have in common.
 *
 * ```tsx
 * <ListGroup>
 *   <ListGroup.Section>
 *     <ListGroup.Header>Réseau</ListGroup.Header>
 *     <List>
 *       <List.ItemButton onPress={openWifi}>
 *         <List.ItemTitle>Wi-Fi</List.ItemTitle>
 *       </List.ItemButton>
 *     </List>
 *     <ListGroup.Footer>Le Wi-Fi se coupe en veille.</ListGroup.Footer>
 *   </ListGroup.Section>
 *
 *   <ListGroup.Section>
 *     <ListGroup.Header>Confidentialité</ListGroup.Header>
 *     <List>…</List>
 *   </ListGroup.Section>
 * </ListGroup>
 * ```
 *
 * **It is the settings screen**, and it is a group of `List`s rather than a `List` with
 * headings inside it for one reason: our `List` draws a container and its separators
 * **between its own children**, so a heading placed among the rows would get a hairline
 * above and below it and would sit inside the card it names. Sections are containers side
 * by side; a heading belongs outside them.
 *
 * **Nothing is walked and nothing is counted.** The group publishes two gaps and a type
 * scale; the sections are ordinary children. A `List` on its own, outside any group, is
 * unchanged — which is what lets one section be built out of something that is not a list
 * at all.
 *
 * `variant`, `size`, `radius`, `color` and `hasSeparator` are **defaults handed down** to
 * every `List` inside, and a list that names its own still wins: a settings screen is
 * uniform, and setting `variant` five times is five chances to set it differently.
 * `isDisabled` is the one that is not a default — a disabled group has no live list in it.
 */
export const ListGroupRoot = forwardRef<View, ListGroupProps>(function ListGroup(
  {
    children,
    variant,
    size,
    radius,
    color,
    hasSeparator,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const styles = listGroupRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const context = useMemo(
    () => ({
      sectionStyle: styles.section,
      headerStyle: styles.header,
      footerStyle: styles.footer,
      variant,
      size,
      radius,
      color,
      hasSeparator,
      isDisabled,
    }),
    [styles, variant, size, radius, color, hasSeparator, isDisabled]
  )

  const rootStyle = [styles.root, styleProps, style]

  return (
    <ListGroupProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {children}
        </View>
      )}
    </ListGroupProvider>
  )
})

ListGroupRoot.displayName = 'XAUI.ListGroup.Root'
