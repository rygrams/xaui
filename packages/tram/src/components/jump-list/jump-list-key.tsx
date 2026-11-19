import { forwardRef } from 'react'
import type { View } from 'react-native'
import { JumpListPress } from './jump-list-press'
import { useJumpList, useJumpListGroup } from './jump-list.context'
import type { JumpListKeyProps } from './jump-list.type'

/**
 * A key of the grid: a square of the accent with its letter in the bottom-start corner —
 * a bar across the screen in the list layout. Pressed, it is felt as a `selection`, the
 * grid leaves and the list lands on its group.
 *
 * A key with nothing under it is the soft grey with its letter muted, and does not
 * respond: the alphabet keeps its shape, so a letter is found where it always is.
 *
 * Written once inside `JumpList.Overlay`, it is the drawing of every key; its text is the
 * section's `title`, or its key, and a function child is handed the group.
 */
export const JumpListKey = forwardRef<View, JumpListKeyProps>(
  function JumpListKey(props, ref) {
    const {
      keyStyle,
      keyLabelStyle,
      emptyKeyStyle,
      emptyKeyLabelStyle,
      phase,
      jump,
    } = useJumpList()
    const group = useJumpListGroup()
    // On its way out the grid takes no second press.
    const isDisabled = group.isEmpty || phase !== 'arriving'

    return (
      <JumpListPress
        ref={ref}
        boxStyle={group.isEmpty ? emptyKeyStyle : keyStyle}
        labelStyle={group.isEmpty ? emptyKeyLabelStyle : keyLabelStyle}
        isDisabled={isDisabled}
        moment="selection"
        act={() => jump(group.key)}
        accessibilityState={{ disabled: group.isEmpty }}
        {...props}
      />
    )
  }
)

JumpListKey.displayName = 'XAUI.Tram.JumpList.Key'
