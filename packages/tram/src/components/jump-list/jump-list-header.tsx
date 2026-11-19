import { forwardRef, useEffect, useRef } from 'react'
import type { View } from 'react-native'
import { useMergedRef } from '@xaui/native'
import { moveFocusTo } from '../../system/move-focus'
import { JumpListPress } from './jump-list-press'
import { useJumpList, useJumpListGroup } from './jump-list.context'
import { isFreshLanding } from './jump-list.hook'
import type { JumpListHeaderProps } from './jump-list.type'

/**
 * A group's header: a flat square of the accent with its letter in the bottom-start
 * corner — a bar as wide as its word, for a group that is not a letter. Pressed, it puts
 * the grid up, and is felt as a `press`.
 *
 * Written once, as a child of the list, it is the drawing of every header:
 *
 * ```tsx
 * <JumpList sections={sections} renderItem={renderContact}>
 *   <JumpList.Header accessibilityHint="ouvre l'alphabet" />
 * </JumpList>
 * ```
 *
 * Its text is the section's `title`, or its key; a function child is handed the group.
 * A 40-point square is pressed as 48. Under a disabled list it is dimmed and opens
 * nothing. The header the list lands on takes the focus — the keyboard's on the web, the
 * screen reader's on a phone — so the reader goes on from the group chosen.
 */
export const JumpListHeader = forwardRef<View, JumpListHeaderProps>(
  function JumpListHeader(props, ref) {
    const { headerStyle, headerLabelStyle, headerReach, isDisabled, open, landing } =
      useJumpList()
    const group = useJumpListGroup()
    const node = useRef<View>(null)
    const refs = useMergedRef(node, ref)

    const landed =
      landing?.key === group.key && isFreshLanding(landing) ? landing.count : 0

    useEffect(() => {
      if (landed > 0) moveFocusTo(node.current)
    }, [landed])

    return (
      <JumpListPress
        ref={refs}
        boxStyle={headerStyle}
        labelStyle={headerLabelStyle}
        isDisabled={isDisabled}
        moment="press"
        reach={headerReach}
        act={open}
        {...props}
      />
    )
  }
)

JumpListHeader.displayName = 'XAUI.Tram.JumpList.Header'
