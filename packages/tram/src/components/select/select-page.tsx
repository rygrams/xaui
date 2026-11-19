import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { Modal, ScrollView, Text } from 'react-native'
import type { ReactNode } from 'react'
import type { View, ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'
import { duration } from '../../motion/motion-tokens'
import type { RowSpan } from '../../system/list-picker'
import { useSwivel } from '../../system/use-swivel'
import { ToastOutlet } from '../toast/toast.outlet'
import { SelectProvider, useSelect } from './select.context'
import { LIST_ROLE } from './select.role'

/**
 * The list as a page of its own: `Select.Content`'s node when the choices are many. The
 * label heads it in `caption`, the choices are set in `section`, and it opens scrolled to
 * the current one.
 *
 * It swivels in on its top edge and the choices cascade once it is flat. A `Modal`, so it
 * covers the navigation, keeps the theme it was written under, and hears the system's
 * back — which closes it unless `Select.Overlay` said `isDismissable={false}`.
 */
type SelectPageProps = ViewProps & {
  /**
   * Drawn under the title and above the list, and not scrolled with it: the
   * `Autocomplete`'s search, which has to be there when the page opens on a current
   * choice far down the list.
   */
  header?: ReactNode
}

export const SelectPage = forwardRef<View, SelectPageProps>(function SelectPage(
  { children, header, style, ...props },
  ref
) {
  const context = useSelect()
  const {
    pageStyle,
    titleStyle,
    title,
    value,
    isOpen,
    isStill,
    close,
    dismissable,
    labelId,
    listId,
    query,
  } = context
  const swivel = useSwivel(isOpen, isStill)
  const scroller = useRef<ScrollView>(null)
  const isPlaced = useRef(false)

  useEffect(() => {
    if (!swivel.isMounted) isPlaced.current = false
  }, [swivel.isMounted])

  // A new search starts the list again from its first row. Not on the opening: the page
  // opens on the current choice.
  const searched = useRef(query)
  useEffect(() => {
    if (query === searched.current) return
    searched.current = query
    scroller.current?.scrollTo({ y: 0, animated: false })
  }, [query])

  // The current choice says where it lies; the list is set there once, unanimated, so the
  // page turns in already scrolled.
  const reportSpan = useCallback(
    (item: string, span: RowSpan) => {
      if (item !== value || isPlaced.current) return
      isPlaced.current = true
      scroller.current?.scrollTo({ y: span.y, animated: false })
    },
    [value]
  )

  const paged = useMemo(
    () => ({ ...context, reportSpan, cascadeAfter: duration.swivel }),
    [context, reportSpan]
  )

  const back = useCallback(() => {
    if (dismissable.current) close()
  }, [dismissable, close])

  if (!swivel.isMounted) return null

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={back}
    >
      <SelectProvider value={paged}>
        <Animated.View
          ref={ref}
          accessibilityViewIsModal
          onAccessibilityEscape={back}
          {...props}
          // The turn comes last: it is the one transform the swivel owns.
          style={[pageStyle, style, swivel.style]}
        >
          {title ? (
            <Text accessibilityRole="header" style={titleStyle}>
              {title}
            </Text>
          ) : null}
          {header}
          <ScrollView
            ref={scroller}
            role={LIST_ROLE}
            nativeID={listId}
            aria-labelledby={labelId}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </SelectProvider>
      {/* A `Modal` covers the app's pile of toasts: while the page is up, it is drawn here. */}
      <ToastOutlet />
    </Modal>
  )
})

SelectPage.displayName = 'XAUI.Tram.Select.Page'
