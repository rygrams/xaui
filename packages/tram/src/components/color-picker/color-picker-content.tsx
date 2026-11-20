import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { SwivelPage } from '../../system/swivel-page'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { ColorPickerGrid } from './color-picker-grid'
import { ColorPickerProvider, useColorPicker } from './color-picker.context'
import type { ColorPickerContentProps } from './color-picker.type'

/**
 * The page the field opens, and the grid on it.
 *
 * ```tsx
 * <ColorPicker.Content>
 *   <ColorPicker.Title>accents</ColorPicker.Title>
 *   <ColorPicker.Close accessibilityLabel="fermer" />
 *   <ColorPicker.Grid />
 * </ColorPicker.Content>
 * ```
 *
 * **A page, not the `Dialog`'s banner**, where Native opens a dialog: twenty colours do
 * not fit a banner. It is the `Select`'s page — it swivels in on its top edge, the
 * swatches arrive in cascade once it is flat, and the system's back closes it unless
 * `ColorPicker.Overlay` says `isDismissable={false}`. Its top and bottom add the app's safe
 * area, from the hook handed to `TramProvider`.
 *
 * With no children it is the grid alone; the title is the caller's, in their language.
 * Writing it is what mounts a page: a picker composed as a bare grid has none.
 */
export const ColorPickerContent = forwardRef<View, ColorPickerContentProps>(
  function ColorPickerContent({ children, style, ...props }, ref) {
    const context = useColorPicker()
    const {
      pageStyle,
      pageTop,
      titleId,
      hasTitle,
      isOpen,
      isStill,
      close,
      dismissable,
    } = context
    const [styleProps, rest] = useStyleProps(props)
    const insets = useTramSafeArea()

    const paged = useMemo(() => ({ ...context, isPaged: true }), [context])

    const back = useCallback(() => {
      if (dismissable.current) close()
    }, [dismissable, close])

    return (
      <SwivelPage
        ref={ref}
        isOpen={isOpen}
        isStill={isStill}
        onBack={back}
        role="dialog"
        aria-modal
        aria-labelledby={hasTitle ? titleId : undefined}
        {...rest}
        style={[
          pageStyle,
          { paddingTop: insets.top + pageTop, paddingBottom: insets.bottom },
          styleProps,
          style,
        ]}
      >
        <ColorPickerProvider value={paged}>
          {children ?? <ColorPickerGrid />}
        </ColorPickerProvider>
      </SwivelPage>
    )
  }
)

ColorPickerContent.displayName = 'XAUI.Tram.ColorPicker.Content'
