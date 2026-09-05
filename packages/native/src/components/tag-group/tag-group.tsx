import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TagGroupProvider } from './tag-group.context'
import { tagGroupRecipe } from './tag-group.recipe'
import { nextSelection } from './tag-group.utils'
import type { TagGroupProps } from './tag-group.type'

const EMPTY: readonly string[] = []

/**
 * A wrapping set of tags you can turn on, and take off.
 *
 * ```tsx
 * <TagGroup selectionMode="multiple" onRemove={forget}>
 *   <TagGroup.List>
 *     <TagGroup.Item id="fr">
 *       Français
 *       <TagGroup.ItemRemoveButton />
 *     </TagGroup.Item>
 *   </TagGroup.List>
 * </TagGroup>
 * ```
 *
 * **This is not a row of `Chip`s.** A chip is a piece of metadata that is always the same;
 * a tag is a piece of metadata you can turn on, take off, or both. The selection state and
 * the removal are the component — the pill around them is the least of it.
 */
export const TagGroupRoot = forwardRef<View, TagGroupProps>(function TagGroup(
  {
    children,
    variant,
    size,
    radius,
    color,
    selectionMode = 'none',
    selectedKeys: controlledKeys,
    defaultSelectedKeys,
    onSelectionChange,
    onRemove,
    disabledKeys = EMPTY,
    isDisabled = false,
    isDeselectable = true,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const [selected, setSelected] = useControllableState<readonly string[]>({
    value: controlledKeys,
    defaultValue: defaultSelectedKeys ?? EMPTY,
    onChange: onSelectionChange,
  })

  const selection = { variant, size, radius }
  const styles = tagGroupRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  // The selected face, resolved beside the resting one rather than by each tag. R5 stays
  // intact and a group of forty costs what a group of two costs.
  const chosen = tagGroupRecipe.resolve({
    theme,
    selection: { ...selection, isSelected: 'true' },
  })
  const tint = color
    ? tagGroupRecipe.tint({
        theme,
        color,
        selection: { ...selection, isSelected: 'true' },
      })
    : undefined

  const isSelected = useCallback((id: string) => selected.includes(id), [selected])
  const isKeyDisabled = useCallback(
    (id: string) => isDisabled || disabledKeys.includes(id),
    [disabledKeys, isDisabled]
  )

  const select = useCallback(
    (id: string) => {
      setSelected(current =>
        nextSelection(current, id, selectionMode, isDeselectable)
      )
    },
    [isDeselectable, selectionMode, setSelected]
  )

  const context = useMemo(() => {
    const label = StyleSheet.flatten<TextStyle>([styles.itemLabel])

    return {
      listStyle: styles.list,
      itemStyle: styles.item,
      itemSelectedStyle: tint ? [chosen.item, tint.item] : chosen.item,
      itemLabelStyle: styles.itemLabel,
      itemLabelSelectedStyle: tint
        ? [chosen.itemLabel, tint.itemLabel]
        : chosen.itemLabel,
      closeStyle: styles.close,
      closeGlyphStyle: styles.closeGlyph,
      closeGlyphSelectedStyle: tint
        ? [chosen.closeGlyph, tint.closeGlyph]
        : chosen.closeGlyph,
      glyph: {
        size: label.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot hand
        // to a third-party component expecting a string.
        color: typeof label.color === 'string' ? label.color : undefined,
      },
      isDisabled,
      isSelected,
      isKeyDisabled,
      select,
      remove: onRemove,
    }
  }, [styles, chosen, tint, isDisabled, isSelected, isKeyDisabled, select, onRemove])

  return (
    <TagGroupProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </View>
    </TagGroupProvider>
  )
})

TagGroupRoot.displayName = 'XAUI.TagGroup.Root'
