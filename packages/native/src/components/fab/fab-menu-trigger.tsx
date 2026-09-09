import { forwardRef, useCallback } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useAnchorRef } from '../../hooks/use-anchor-ref'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { FabRoot } from './fab'
import { useFabMenu } from './fab-menu.context'
import type { FabMenuTriggerProps } from './fab-menu.type'

/**
 * The FAB itself, and the rectangle the actions are positioned against.
 *
 * It **is** a `Fab` — the same recipe, the same ten variants, the same `placement`,
 * `isExtended`, `color` and `radius` — with two things added: it measures itself, and its
 * press toggles the menu after the caller's own `onPress` has run.
 *
 * `size` is the menu's rather than this slot's, because the pills read it too; everything
 * else a `Fab` takes is written here.
 *
 * **It is never re-parented**, which is the point. The legacy menu rendered its FAB inside
 * the portal while open, at the portal's own bottom-end inset, so a FAB sitting anywhere
 * else jumped across the screen the moment it was pressed. This one stays exactly where the
 * layout put it and reports where that is.
 */
export const FabMenuTrigger = forwardRef<View, FabMenuTriggerProps>(
  function FabMenuTrigger(
    { children, accessibilityState, isDisabled, onLayout, onPress, ...props },
    ref
  ) {
    const {
      size,
      isOpen,
      isDisabled: menuDisabled,
      toggle,
      setAnchor,
    } = useFabMenu()

    const anchor = useAnchorRef({ isOpen, onAnchor: setAnchor, onLayout })
    const refs = useMergedRef(anchor.node, ref)

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        // Before the toggle, so the actions' first pass already has the right rectangle
        // rather than positioning against a stale one and jumping.
        anchor.measure()
        toggle()
      },
      [anchor, onPress, toggle]
    )

    return (
      <FabRoot
        ref={refs}
        size={size}
        isDisabled={isDisabled ?? menuDisabled}
        accessibilityState={{ expanded: isOpen, ...accessibilityState }}
        {...props}
        onLayout={anchor.onLayout}
        onPress={handlePress}
      >
        {children}
      </FabRoot>
    )
  }
)

FabMenuTrigger.displayName = 'XAUI.FabMenu.Trigger'
