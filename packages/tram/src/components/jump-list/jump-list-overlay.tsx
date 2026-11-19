import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { Modal, ScrollView, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { JumpListKey } from './jump-list-key'
import { childOfType } from './jump-list.children'
import { JumpListGroupProvider, useJumpList } from './jump-list.context'
import { useKeyMotion } from './jump-list.hook'
import { rowsOf } from './jump-list.sections'
import type { JumpListOverlayProps } from './jump-list.type'

const DEFAULT_KEY = <JumpListKey />

/**
 * The grid, over the whole screen: the page's own ground, opaque, with the keys on it —
 * four squares across, or one bar under the other. It comes up as its keys arrive a row
 * at a time; it goes once the last of them has turned away.
 *
 * ```tsx
 * <JumpList sections={sections} renderItem={renderContact}>
 *   <JumpList.Overlay>
 *     <JumpList.Key accessibilityHint="va à cette lettre" />
 *   </JumpList.Overlay>
 * </JumpList>
 * ```
 *
 * Optional: left out, the list draws one as it is. A `Modal`, so it covers the
 * navigation and hears the system's back, which closes it. The safe area, from
 * `TramProvider`'s `safeArea`, is added to the grid's own padding.
 */
export const JumpListOverlay = forwardRef<View, JumpListOverlayProps>(
  function JumpListOverlay(
    { children, accessibilityViewIsModal = true, style, ...props },
    ref
  ) {
    const {
      overlayStyle,
      gridStyle,
      rowStyle,
      cellStyle,
      inset,
      columns,
      keys,
      isMounted,
      veil,
      close,
    } = useJumpList()
    const [styleProps, rest] = useStyleProps(props)
    const insets = useTramSafeArea()

    const veiled = useAnimatedStyle(() => {
      'worklet'
      return { opacity: veil.value }
    }, [veil])

    if (!isMounted) return null

    const template = childOfType(children, JumpListKey, DEFAULT_KEY)
    const rows = rowsOf(keys, columns)
    const safe = {
      paddingTop: inset + insets.top,
      paddingBottom: inset + insets.bottom,
    }

    return (
      <Modal
        visible
        transparent
        animationType="none"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={close}
      >
        <Animated.View
          ref={ref}
          aria-modal
          accessibilityViewIsModal={accessibilityViewIsModal}
          onAccessibilityEscape={close}
          {...rest}
          // The ground's opacity comes last: it is the one the grid's way in and out owns.
          style={[overlayStyle, styleProps, style, veiled]}
        >
          <ScrollView contentContainerStyle={[gridStyle, safe]}>
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={rowStyle}>
                {row.map((key, column) =>
                  key === null ? (
                    // What fills out the last row, so its keys are as wide as the others.
                    <View key={`after-${column}`} style={cellStyle} />
                  ) : (
                    <JumpListCell
                      key={key}
                      value={key}
                      index={rowIndex * columns + column}
                    >
                      {template}
                    </JumpListCell>
                  )
                )}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>
    )
  }
)

JumpListOverlay.displayName = 'XAUI.Tram.JumpList.Overlay'

type JumpListCellProps = { value: string; index: number; children: ReactNode }

/** One key's place in the grid, and its way in and out: the key itself does not move. */
function JumpListCell({ value, index, children }: JumpListCellProps) {
  const {
    cellStyle,
    phase,
    columns,
    keys,
    picked,
    inset,
    gap,
    isStill,
    filled,
    titleOf,
  } = useJumpList()
  const motion = useKeyMotion({
    index,
    phase,
    leaving: { columns, count: keys.length, picked },
    inset,
    gap,
    isStill,
  })

  const group = { key: value, title: titleOf(value), isEmpty: !filled.has(value) }

  return (
    <Animated.View style={[cellStyle, motion.style]} onLayout={motion.measure}>
      <JumpListGroupProvider value={group}>{children}</JumpListGroupProvider>
    </Animated.View>
  )
}
