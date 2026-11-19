import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  Text,
  View,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
} from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import { PressableFeedback, useStyleProps } from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { usePivot } from './pivot.context'
import { closeness, headerOffset, loopDelta } from './pivot.loop'
import type { PivotHeaderProps } from './pivot.type'

/** What the web hands a key handler; React Native's types have no keyboard event. */
type KeyEvent = { key: string; preventDefault: () => void }

/** A host node's `focus`, as the web has it. */
type Focusable = { focus: () => void }

/** The arrow keys, as steps along the x axis. */
const STEPS: Record<string, 1 | -1> = { ArrowRight: 1, ArrowLeft: -1 }

/**
 * A title of the row, in the `pivot` role, Light. The root lays it where the loop puts
 * it: on the margin when its section is on screen, after the current one otherwise, in
 * the loop's order. It slides with the finger, and fades from grey to the page's ink as
 * its section comes in — its colour is the whole of the current state on screen. Neither
 * its size nor its weight moves.
 *
 * Pressed, it shrinks a little and its section is reached going forward. A `tab` for a
 * screen reader, selected when its section is on screen; on the web the arrow keys go
 * round the loop from it.
 *
 * `onPress`, `onPressIn` and `onPressOut` are the title's press, not the text's: they run
 * inside the title's own.
 *
 * With motion reduced it does not slide: the row is laid for the nearest section and only
 * the colours fade.
 */
export const PivotHeader = forwardRef<Text, PivotHeaderProps>(function PivotHeader(
  { children, value, style, onPress, onPressIn, onPressOut, ...props },
  ref
) {
  const {
    headerStyle,
    tones,
    values,
    current,
    position,
    advances,
    margin,
    way,
    isStill,
    select,
    step,
    focusNext,
    measureHeader,
    tabId,
    panelId,
  } = usePivot()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })
  const isReduced = useReducedMotion()

  const index = values.indexOf(value)
  const count = values.length
  const isCurrent = current === value
  const { rest: atRest, current: inInk } = tones

  const node = useRef<View>(null)

  // The keyboard moved to this title: it takes the focus once it is the current one.
  useEffect(() => {
    if (!isCurrent || focusNext.current !== value) return
    focusNext.current = undefined
    ;(node.current as Focusable | null)?.focus()
  }, [isCurrent, focusNext, value])

  const place = useAnimatedStyle(() => {
    'worklet'
    const laid = advances.value
    // Hidden until every title is measured: until then the row cannot be laid.
    if (index < 0 || laid.length !== count) return { opacity: 0 }

    const at = isReduced || isStill ? Math.round(position.value) : position.value

    return {
      opacity: 1,
      transform: [{ translateX: (margin + headerOffset(index, at, laid)) * way }],
    }
  }, [index, count, advances, position, margin, way, isReduced, isStill])

  const tone = useAnimatedStyle(() => {
    'worklet'
    const near = closeness(loopDelta(index, position.value, count))

    return { color: interpolateColor(near, [0, 1], [atRest, inInk]) }
  }, [index, count, position, atRest, inInk])

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout
      measureHeader(value, width, height)
    },
    [measureHeader, value]
  )

  const handleKey = useCallback(
    (event: KeyEvent) => {
      const by = STEPS[event.key]
      if (by === undefined) return
      event.preventDefault()
      // The arrows follow the screen, so they are turned round with the row.
      step(way === 1 ? by : (-by as 1 | -1))
    },
    [step, way]
  )

  // Under an ancestor's `disable-all` the title does not shrink either.
  const Press = isStill ? PressableFeedback : PressRow
  // Only the web has keys and a tab order: one stop for the row, on the current title.
  const web =
    Platform.OS === 'web'
      ? { onKeyDown: handleKey, tabIndex: isCurrent ? (0 as const) : (-1 as const) }
      : undefined

  return (
    <Animated.View style={[PLACED, place]} onLayout={measure}>
      <Press
        ref={node}
        id={tabId(value)}
        isPressed={isPressed}
        // Native's scale, highlight and ripple stay off: the press is the title shrinking.
        animation={isStill ? 'disable-all' : false}
        role="tab"
        aria-selected={isCurrent}
        aria-controls={panelId(value)}
        accessibilityState={{ selected: isCurrent }}
        {...web}
        onPress={(event: GestureResponderEvent) => {
          onPress?.(event)
          select(value)
        }}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <Animated.Text
          // The animated wrapper types its ref as itself; at runtime it is the host text.
          ref={ref as never}
          numberOfLines={1}
          {...rest}
          style={[headerStyle, tone, styleProps, style]}
        >
          {children}
        </Animated.Text>
      </Press>
    </Animated.View>
  )
})

/** Out of the flow, on the row's start: the loop moves it from there. */
const PLACED = { position: 'absolute', top: 0, start: 0 } as const

PivotHeader.displayName = 'XAUI.Tram.Pivot.Header'
