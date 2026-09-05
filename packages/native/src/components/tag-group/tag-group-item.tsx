import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { TagGroupItemLabel } from './tag-group-item-label'
import { TagGroupItemProvider, useTagGroup } from './tag-group.context'
import type { TagGroupItemProps } from './tag-group.type'

/**
 * One tag.
 *
 * A stringifiable child becomes its label (R3), which makes the common case one line. A
 * tag with a remove button is not that case, so the two are written out.
 */
export const TagGroupItem = forwardRef<View, TagGroupItemProps>(
  function TagGroupItem(
    {
      id,
      children,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      itemStyle,
      itemSelectedStyle,
      glyph,
      isSelected,
      isKeyDisabled,
      select,
    } = useTagGroup()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const selected = isSelected(id)
    const disabled = isDisabled || isKeyDisabled(id)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<TagGroupItemProps['onPress']>>[0]) => {
        onPress?.(event)
        select(id)
      },
      [id, onPress, select]
    )

    const context = useMemo(
      () => ({ id, isSelected: selected, isPressed, isDisabled: disabled }),
      [id, selected, isPressed, disabled]
    )

    const text = typeof children === 'function' ? null : childrenToString(children)

    return (
      <TagGroupItemProvider value={context}>
        <IconContext.Provider value={glyph}>
          <PressableFeedback
            ref={ref}
            isPressed={isPressed}
            isDisabled={disabled}
            asChild={asChild}
            accessibilityRole={accessibilityRole}
            accessibilityState={{ disabled, selected, ...accessibilityState }}
            {...rest}
            style={[
              itemStyle,
              selected && itemSelectedStyle,
              styleProps,
              typeof style === 'function' ? style({ pressed: isPressed }) : style,
            ]}
            onPress={handlePress}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
          >
            {typeof children === 'function' ? (
              children(context)
            ) : text !== null ? (
              <TagGroupItemLabel>{text}</TagGroupItemLabel>
            ) : (
              children
            )}
          </PressableFeedback>
        </IconContext.Provider>
      </TagGroupItemProvider>
    )
  }
)

TagGroupItem.displayName = 'XAUI.TagGroup.Item'
