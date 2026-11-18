import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import { Platform } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  mergeRefs,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { nextStop } from '../../system/roving-stop'
import { TabsLabel } from './tabs-label'
import { TabsTriggerProvider, useTabs } from './tabs.context'
import { useChosen } from './tabs.hook'
import type { TabEntry, TabsTriggerProps } from './tabs.type'

/** What the web hands a key handler; React Native's types have no keyboard event. */
type KeyEvent = { key: string; preventDefault: () => void }

/** A host node's `focus`, as the web has it — React Native's takes no option. */
type Focusable = { focus: (options?: { preventScroll: boolean }) => void }

const WITHOUT_SCROLL = { preventScroll: true }

/** The arrow keys, as steps along the x axis. */
const STEPS: Record<string, 1 | -1> = { ArrowRight: 1, ArrowLeft: -1 }

/**
 * One tab: a title, 40, 48 or 56 tall, pressed like a control of 48. The chosen one is
 * read by its colour and said by its state — `selected`, which is what a screen reader
 * goes by. A disabled one is grey, dimmed, and cannot be chosen.
 *
 * A press shrinks the title and leaves its colour alone; there is no tilt, since a title
 * has no box to lean. On the web the arrow keys go from tab to tab, past a disabled one.
 *
 * It tells the row where it lies, in a record that re-renders nothing: that is what
 * brings a tab into view. `children` may be a function, for a tab that draws its own
 * chosen state.
 */
export const TabsTrigger = forwardRef<View, TabsTriggerProps>(function TabsTrigger(
  {
    value,
    children,
    isDisabled = false,
    asChild = false,
    role = 'tab',
    accessibilityState,
    hitSlop,
    style,
    onLayout,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    triggerStyle,
    triggerDisabledStyle,
    reach,
    value: selected,
    isDisabled: isRootDisabled,
    isStill,
    select,
    row,
    tabId,
    panelId,
  } = useTabs()

  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const isSelected = selected === value
  const disabled = isRootDisabled || isDisabled
  const chosen = useChosen(isSelected, isStill)

  const node = useRef<View>(null)
  const entry = useRef<TabEntry>({
    isDisabled: disabled,
    // Without the browser's own scroll: bringing the tab into view is the row's doing.
    focus: () => (node.current as Focusable | null)?.focus(WITHOUT_SCROLL),
  })
  entry.current.isDisabled = disabled

  useEffect(() => row.register(value, entry.current), [row, value])

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { x, width } = event.nativeEvent.layout
      row.setSpan(value, { x, width })
    },
    [onLayout, row, value]
  )

  const handlePress = useCallback(
    (event: Parameters<NonNullable<TabsTriggerProps['onPress']>>[0]) => {
      onPress?.(event)
      select(value)
    },
    [onPress, select, value]
  )

  // The arrows follow the screen, so they are turned round with the row.
  const handleKey = useCallback(
    (event: KeyEvent) => {
      const step = STEPS[event.key]
      if (step === undefined) return

      const along = row.isReversed() ? (-step as 1 | -1) : step
      const next = nextStop(row.stops(), value, along)
      if (next === undefined || next === value) return

      event.preventDefault()
      row.focus(next)
      select(next)
    },
    [row, value, select]
  )

  const context = useMemo(
    () => ({ value, chosen, isSelected, isPressed, isDisabled: disabled }),
    [value, chosen, isSelected, isPressed, disabled]
  )

  const text = typeof children === 'function' ? null : childrenToString(children)

  // Under an ancestor's `disable-all` the title does not shrink either.
  const Title = isStill ? PressableFeedback : PressRow
  // Only the web has keys and a tab order: one stop for the row, on its chosen tab —
  // and while none is chosen, every tab is a stop, or the row could not be reached.
  const isStop = isSelected || selected === undefined
  const web =
    Platform.OS === 'web'
      ? { onKeyDown: handleKey, tabIndex: isStop ? (0 as const) : (-1 as const) }
      : undefined

  return (
    <TabsTriggerProvider value={context}>
      <Title
        ref={mergeRefs(node, ref)}
        id={tabId(value)}
        isPressed={isPressed}
        isDisabled={disabled}
        asChild={asChild}
        // Native's scale, highlight and ripple stay off: the press is the title shrinking.
        animation={isStill ? 'disable-all' : false}
        role={role}
        aria-selected={isSelected}
        aria-controls={panelId(value)}
        // Merged, not spread over: a caller naming another state must not drop these.
        accessibilityState={{
          disabled,
          selected: isSelected,
          ...accessibilityState,
        }}
        // `sm` is drawn under the 48 touch target; the slop makes it up, above and below
        // — to the sides it would reach into the next tab.
        hitSlop={hitSlop ?? { top: reach, bottom: reach }}
        {...web}
        {...rest}
        onLayout={measure}
        style={[
          triggerStyle,
          disabled && !isSelected && triggerDisabledStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {typeof children === 'function' ? (
          children(context)
        ) : text !== null ? (
          // A stringifiable tab is its title, which is what makes the common case
          // `<Tabs.Trigger value="all">tout</Tabs.Trigger>`.
          <TabsLabel>{text}</TabsLabel>
        ) : (
          children
        )}
      </Title>
    </TabsTriggerProvider>
  )
})

TabsTrigger.displayName = 'XAUI.Tram.Tabs.Trigger'
