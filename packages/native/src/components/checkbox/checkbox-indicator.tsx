import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useCheckbox } from './checkbox.context'
import { checkboxSheet } from './checkbox.style'
import type { CheckboxIndicatorProps } from './checkbox.type'

/** Long enough to be seen, short enough that a fast tick never waits for it. */
const DURATION = 120

/** Where the fill starts before it grows into the box. */
const FROM_SCALE = 0.8

/**
 * The box itself, and the mark inside it.
 *
 * ```tsx
 * <Checkbox.Indicator />
 *
 * <Checkbox.Indicator>
 *   <Icon as={CheckIcon} size={14} color={theme.colors.accentForeground} />
 * </Checkbox.Indicator>
 * ```
 *
 * With no children it draws its own check — two borders of an empty box, a quarter turn
 * from where they look like a tick — so a checkbox works in a project that has installed
 * no icon set. That is the `CloseButton`'s bargain, taken for the same reason.
 *
 * The fill is a node of its own rather than a background on the box: it has to fade and
 * grow in without taking the border with it, and the mark rides along with it, because a
 * check arriving before its background reads as a glitch rather than as an animation.
 */
export const CheckboxIndicator = forwardRef<View, CheckboxIndicatorProps>(
  function CheckboxIndicator({ children, animation = true, style, ...props }, ref) {
    const { indicatorStyle, isSelected, isIndeterminate } = useCheckbox()
    const [styleProps, rest] = useStyleProps(props)

    // The third state fills the box like the second one and marks it differently — a
    // dash where the check has two strokes.
    const isFilled = isSelected || isIndeterminate
    const mark = children ?? (isIndeterminate ? <Dash /> : <Check />)

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        {/* Two components rather than a branch inside one: hooks cannot be conditional,
            and "no animation" is only true if the Reanimated hooks are never reached. */}
        {animation ? (
          <AnimatedFill isSelected={isFilled}>{mark}</AnimatedFill>
        ) : (
          isFilled && <StaticFill>{mark}</StaticFill>
        )}
      </View>
    )
  }
)

CheckboxIndicator.displayName = 'XAUI.Checkbox.Indicator'

/**
 * Mounted whether or not the box is ticked, unlike the static half below: an exit
 * animation needs a node to run on, and a fill that unmounts the moment it is unticked
 * has nothing left to fade out.
 */
function AnimatedFill({
  isSelected,
  children,
}: {
  isSelected: boolean
  children: ReactNode
}) {
  const { fillStyle } = useCheckbox()

  // `useDerivedValue` rather than an assignment in an effect: the timing starts on the UI
  // thread the frame the prop changes, instead of waiting for a commit to schedule it.
  const progress = useDerivedValue(
    () => withTiming(isSelected ? 1 : 0, { duration: DURATION }),
    [isSelected]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: FROM_SCALE + (1 - FROM_SCALE) * progress.value }],
  }))

  return <Animated.View style={[fillStyle, animatedStyle]}>{children}</Animated.View>
}

function StaticFill({ children }: { children: ReactNode }) {
  const { fillStyle } = useCheckbox()

  return <View style={fillStyle}>{children}</View>
}

/** The built-in tick. Its two strokes and its colour are the recipe's; the turn is not. */
function Check() {
  const { checkStyle } = useCheckbox()

  return <View style={[checkStyle, checkboxSheet.check]} />
}

/** The third state's mark: the check's long stroke, on its own and level. */
function Dash() {
  const { dashStyle } = useCheckbox()

  return <View style={dashStyle} />
}
