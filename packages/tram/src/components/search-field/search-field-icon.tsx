import { View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSearchField } from './search-field.context'
import type { SearchFieldIconProps } from './search-field.type'

/**
 * The magnifier, at the start of the box: a ring and a handle drawn from two views in the
 * box's own line of 2, so a search box works in a project that has installed no icon set.
 *
 * ```tsx
 * <SearchField.Field placeholder="rechercher">
 *   <SearchField.Icon />
 * </SearchField.Field>
 * ```
 *
 * `muted` at rest, the page's ink once the box has the focus — the line takes the accent,
 * the mark only comes forward. `color` holds it in one colour; `as` replaces the drawing
 * with an icon component of your own, handed the mark's side and its colour at rest.
 * Decoration: the field's label is what a screen reader reads.
 */
export function SearchFieldIcon({ as: As, size, color }: SearchFieldIconProps) {
  const { focus, iconInk, iconSide, iconStyle, lensStyle, handleStyle } =
    useSearchField()

  const rest = color ?? iconInk.rest
  const focused = color ?? iconInk.focus

  const ring = useAnimatedStyle(() => {
    'worklet'
    return {
      borderColor: interpolateColor(focus.value, [0, 1], [rest, focused]),
    }
  }, [focus, rest, focused])

  const bar = useAnimatedStyle(() => {
    'worklet'
    return {
      backgroundColor: interpolateColor(focus.value, [0, 1], [rest, focused]),
    }
  }, [focus, rest, focused])

  if (As) {
    return (
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <As size={size ?? iconSide} color={rest} />
      </View>
    )
  }

  const glass = (
    <View style={iconStyle}>
      <Animated.View style={[lensStyle, ring]} />
      <Animated.View style={[handleStyle, bar]} />
    </View>
  )

  return (
    <View
      // A `size` takes that room and scales the drawing into it, about its centre: the
      // ring and the handle keep their shares and their line.
      style={
        size === undefined
          ? undefined
          : {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
            }
      }
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      aria-hidden
    >
      {size === undefined ? (
        glass
      ) : (
        <View style={{ transform: [{ scale: size / iconSide }] }}>{glass}</View>
      )}
    </View>
  )
}

SearchFieldIcon.displayName = 'XAUI.Tram.SearchField.Icon'
