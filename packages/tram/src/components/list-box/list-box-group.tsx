import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { ListBoxGroupProvider } from './list-box-group.context'
import { listBoxGroupRecipe } from './list-box-group.recipe'
import {
  ListBoxEntranceProvider,
  useEntranceFade,
  useEntranceOwner,
} from './list-box.entrance'
import type { ListBoxGroupProps } from './list-box-group.type'

/**
 * Lists in sections, each under a header — the Metro settings page.
 *
 * ```tsx
 * <ListBoxGroup accent="cobalt">
 *   <ListBoxGroup.Section>
 *     <ListBoxGroup.Header>réseau</ListBoxGroup.Header>
 *     <ListBox>…</ListBox>
 *     <ListBoxGroup.Footer>Le Wi-Fi se coupe en veille.</ListBoxGroup.Footer>
 *   </ListBoxGroup.Section>
 * </ListBoxGroup>
 * ```
 *
 * No fill for the group nor for its sections: a header in the grey over its rows, a gap
 * between two sections, and that is all the grouping there is.
 *
 * `size`, `accent` and `color` are defaults handed down to every
 * `ListBox` inside, whose own props still win; `isDisabled` greys them all. The headers,
 * rows and footers arrive in **one** cascade, read from top to bottom through every
 * section — `hasEntrance={false}` places them.
 */
export const ListBoxGroupRoot = forwardRef<View, ListBoxGroupProps>(
  function ListBoxGroup(
    {
      children,
      size,
      accent,
      color,
      isDisabled = false,
      hasEntrance = true,
      asChild = false,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const entrance = useEntranceOwner(hasEntrance)
    const fade = useEntranceFade(entrance)

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
        size,
        accent,
        color,
        isDisabled,
      }),
      [styles, size, accent, color, isDisabled]
    )

    const rootStyle = [styles.root, styleProps, style]

    return (
      <ListBoxEntranceProvider value={entrance}>
        <ListBoxGroupProvider value={context}>
          {asChild ? (
            <Slot ref={ref} {...rest} style={rootStyle}>
              {children}
            </Slot>
          ) : (
            <Animated.View
              // The animated wrapper types its ref as itself; at runtime it is the host view.
              ref={ref as never}
              {...rest}
              style={[rootStyle, fade]}
            >
              {children}
            </Animated.View>
          )}
        </ListBoxGroupProvider>
      </ListBoxEntranceProvider>
    )
  }
)

ListBoxGroupRoot.displayName = 'XAUI.Tram.ListBoxGroup.Root'
