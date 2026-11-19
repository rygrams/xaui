import { Children, forwardRef, isValidElement, useMemo } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import type {
  AccessibilityActionEvent,
  AccessibilityActionInfo,
  GestureResponderEvent,
} from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated, { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  Slot,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { ListSwipe } from './list-swipe'
import { ListSwipeAction } from './list-swipe-action'
import { useRowSwipe } from './list-item.swipe'
import { ListRowProvider, ListSwipeProvider, useList } from './list.context'
import { textOf } from './list.runs'
import { useRowArrival } from './list.entrance'
import type { ListItemProps, ListSwipeActionProps } from './list.type'

/**
 * One row: `Leading`, `Content` and `Action` side by side, the square and the action
 * level with the title.
 *
 * With `onPress` the row is a button and the press is the Metro one: it leans toward the
 * finger and shrinks a little, its colours unchanged, felt as a `press`. A row is wide,
 * so it leans by the wide angle. Without it the row does not move.
 *
 * A `List.Swipe` among its children puts actions under it, at its end: the row slides
 * toward its start to show them, and a screen reader reaches them as the row's actions.
 * While they are out, a touch on the row closes it rather than pressing it.
 *
 * `Swipe` is found among the row's own children — put it there, not inside a component
 * of yours.
 */
export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  {
    children,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    isDisabled = false,
    asChild = false,
    accessibilityRole,
    accessibilityState,
    accessibilityActions,
    onAccessibilityAction,
    style,
    ...props
  },
  ref
) {
  const list = useList()
  const [styleProps, rest] = useStyleProps(props)
  const arrival = useRowArrival()
  const haptic = useTramHaptic()
  const isStill = useAnimationDisabled()
  const isReduced = useReducedMotion()
  const [isPressed, press] = usePressState({
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const { swipe, content } = splitRow(children)
  const actions = swipe ? swipeActionsOf(swipe) : NO_ACTIONS
  const swiping = useRowSwipe(swipe !== null && !isDisabled)

  const styles = isDisabled ? list.grey : list.live
  const row = useMemo(() => ({ styles }), [styles])

  const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
    const action = actions.find(entry => entry.name === event.nativeEvent.actionName)
    if (action) action.onPress?.(NO_TOUCH)
    else onAccessibilityAction?.(event)
  }

  const a11y = {
    accessibilityActions:
      actions.length > 0 && !isDisabled
        ? [...(accessibilityActions ?? []), ...actions.map(toActionInfo)]
        : accessibilityActions,
    onAccessibilityAction: handleAccessibilityAction,
  }

  const isPressable = onPress !== undefined || onLongPress !== undefined
  const rowStyle = [styles.itemStyle, styleProps, style]

  let node: ReactElement
  if (isPressable) {
    const isFlat = isStill || isReduced
    const Row = isFlat ? PressableFeedback : PressTilt
    const lean = isFlat ? undefined : { depth: scale.row }

    node = (
      <Row
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        // Native's scale, highlight and ripple stay off: the press is the tilt alone.
        animation={isStill ? 'disable-all' : false}
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
        {...lean}
        {...rest}
        {...a11y}
        style={[...rowStyle, BOX_ONLY]}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {content}
      </Row>
    )
  } else {
    const Node = asChild ? Slot : View

    node = (
      <Node
        ref={ref}
        accessibilityRole={accessibilityRole}
        accessibilityState={
          isDisabled ? { disabled: true, ...accessibilityState } : accessibilityState
        }
        {...rest}
        {...a11y}
        style={rowStyle}
      >
        {content}
      </Node>
    )
  }

  return (
    <ListRowProvider value={row}>
      <Animated.View style={arrival}>
        {swipe ? (
          <View style={sheet.frame}>
            <Animated.View
              pointerEvents={swiping.isOpen ? 'box-none' : 'none'}
              // Out of reach while the row covers them: the row's own actions name them.
              accessibilityElementsHidden={!swiping.isOpen}
              importantForAccessibility={
                swiping.isOpen ? 'auto' : 'no-hide-descendants'
              }
              style={[StyleSheet.absoluteFill, swiping.actionsStyle]}
            >
              <ListSwipeProvider value={swiping.context}>{swipe}</ListSwipeProvider>
            </Animated.View>
            <GestureDetector gesture={swiping.gesture} touchAction="pan-y">
              <Animated.View style={swiping.rowStyle}>
                {node}
                {swiping.isOpen ? (
                  <Pressable
                    accessible={false}
                    style={StyleSheet.absoluteFill}
                    onPress={swiping.close}
                  />
                ) : null}
              </Animated.View>
            </GestureDetector>
          </View>
        ) : (
          node
        )}
      </Animated.View>
    </ListRowProvider>
  )
})

ListItem.displayName = 'XAUI.Tram.List.Item'

type SwipeEntry = {
  name: string
  label: string
  onPress?: ListSwipeActionProps['onPress']
}

type SwipeElement = ReactElement<{ children?: ReactNode }>

const NO_ACTIONS: SwipeEntry[] = []

/** The row's own children, the `List.Swipe` among them taken apart. */
function splitRow(children: ReactNode) {
  const nodes = Children.toArray(children)
  const isSwipe = (node: ReactNode): node is SwipeElement =>
    isValidElement(node) && node.type === ListSwipe

  return {
    swipe: nodes.find(isSwipe) ?? null,
    content: nodes.filter(node => !isSwipe(node)),
  }
}

/** The actions under a row, as a screen reader is offered them. */
function swipeActionsOf(
  swipe: ReactElement<{ children?: ReactNode }>
): SwipeEntry[] {
  const entries: SwipeEntry[] = []

  Children.forEach(swipe.props.children, child => {
    if (!isValidElement(child) || child.type !== ListSwipeAction) return
    const props = child.props as ListSwipeActionProps
    const label = props.accessibilityLabel ?? textOf(props.children)

    entries.push({ name: `swipe-${entries.length}`, label, onPress: props.onPress })
  })

  return entries
}

function toActionInfo({ name, label }: SwipeEntry): AccessibilityActionInfo {
  return { name, label }
}

/**
 * What a screen reader's press hands the caller: no touch, and the methods a handler may
 * call on one without looking — each doing nothing.
 */
const NO_TOUCH = {
  nativeEvent: {},
  preventDefault: () => {},
  stopPropagation: () => {},
  persist: () => {},
  isDefaultPrevented: () => false,
  isPropagationStopped: () => false,
} as unknown as GestureResponderEvent

// `box-only`: the touch lands on the row, so where it landed is measured from the row.
const BOX_ONLY = { pointerEvents: 'box-only' } as const

const sheet = StyleSheet.create({
  // The actions lie under the row and no further: past it they would show beside it.
  frame: { overflow: 'hidden' },
})
