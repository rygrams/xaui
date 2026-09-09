import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { ListBoxGroupProvider } from './list-box-group.context'
import { listBoxGroupRecipe } from './list-box-group.recipe'
import type { ListBoxGroupProps } from './list-box-group.type'

/**
 * Lists in sections, each under what its rows have in common.
 *
 * ```tsx
 * <ListBoxGroup>
 *   <ListBoxGroup.Section>
 *     <ListBoxGroup.Header>Réseau</ListBoxGroup.Header>
 *     <ListBox>
 *       <ListBox.ItemButton onPress={openWifi}>
 *         <ListBox.ItemTitle>Wi-Fi</ListBox.ItemTitle>
 *       </ListBox.ItemButton>
 *     </ListBox>
 *     <ListBoxGroup.Footer>Le Wi-Fi se coupe en veille.</ListBoxGroup.Footer>
 *   </ListBoxGroup.Section>
 *
 *   <ListBoxGroup.Section>
 *     <ListBoxGroup.Header>Confidentialité</ListBoxGroup.Header>
 *     <ListBox>…</ListBox>
 *   </ListBoxGroup.Section>
 * </ListBoxGroup>
 * ```
 *
 * **It is the settings screen**, and it is a group of `ListBox`s rather than a `ListBox` with
 * headings inside it for one reason: our `ListBox` draws a container and its separators
 * **between its own children**, so a heading placed among the rows would get a hairline
 * above and below it and would sit inside the card it names. Sections are containers side
 * by side; a heading belongs outside them.
 *
 * **Nothing is walked and nothing is counted.** The group publishes two gaps and a type
 * scale; the sections are ordinary children. A `ListBox` on its own, outside any group, is
 * unchanged — which is what lets one section be built out of something that is not a list
 * at all.
 *
 * `variant`, `size`, `radius`, `color` and `hasSeparator` are **defaults handed down** to
 * every `ListBox` inside, and a list that names its own still wins: a settings screen is
 * uniform, and setting `variant` five times is five chances to set it differently.
 * `isDisabled` is the one that is not a default — a disabled group has no live list in it.
 */
export const ListBoxGroupRoot = forwardRef<View, ListBoxGroupProps>(
  function ListBoxGroup(
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

    const styles = listBoxGroupRecipe.resolve({
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
      <ListBoxGroupProvider value={context}>
        {asChild ? (
          <Slot ref={ref} {...rest} style={rootStyle}>
            {children}
          </Slot>
        ) : (
          <View ref={ref} {...rest} style={rootStyle}>
            {children}
          </View>
        )}
      </ListBoxGroupProvider>
    )
  }
)

ListBoxGroupRoot.displayName = 'XAUI.ListBoxGroup.Root'
