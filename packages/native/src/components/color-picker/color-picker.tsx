import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { DialogRoot } from '../dialog'
import { DummyFieldRoot } from '../dummy-field'
import { ColorPickerProvider } from './color-picker.context'
import { TAILWIND_PALETTE } from './color-picker.palette'
import { colorPickerRecipe } from './color-picker.recipe'
import { colorPickerSheet } from './color-picker.style'
import type { ColorPickerProps } from './color-picker.type'

/**
 * A colour, chosen off a palette.
 *
 * ```tsx
 * // The dialog: a field that opens the grid.
 * <ColorPicker value={brand} onValueChange={setBrand}>
 *   <ColorPicker.Label>Brand colour</ColorPicker.Label>
 *   <FieldGroup>
 *     <FieldGroup.Prefix isDecorative>
 *       <ColorPicker.Preview />
 *     </FieldGroup.Prefix>
 *     <ColorPicker.Field placeholder="Pick a colour" />
 *   </FieldGroup>
 *   <ColorPicker.Overlay />
 *   <ColorPicker.Content>
 *     <ColorPicker.Title>Pick a colour</ColorPicker.Title>
 *     <ColorPicker.Grid />
 *   </ColorPicker.Content>
 * </ColorPicker>
 *
 * // The grid, on the page. No field, no dialog, nothing to open.
 * <ColorPicker value={brand} onValueChange={setBrand}>
 *   <ColorPicker.Grid scrollEnabled={false} />
 * </ColorPicker>
 * ```
 *
 * **Two arrangements, one component.** The dialog is the legacy picker's shape — a field
 * that opens a palette — and the grid is that palette on its own, for a settings row or a
 * theme editor where there is nothing to open. Neither is a mode the root is told about:
 * the caller writes the slots they want, and a picker with no `Content` in it never mounts
 * a dialog.
 *
 * **It owns almost nothing, and that is the design.** The field is a `DummyField` — the v1
 * name of the `InputTrigger` the legacy picker used, so a colour field and a select in one
 * form cannot drift apart — and the panel is a `Dialog`. What this component adds is the
 * chip, the grid and the wiring between them.
 *
 * **The palette is data.** `TAILWIND_PALETTE` by default: the seventeen hues plus Zinc, at
 * eight steps each. `colors` replaces it, and `ColorPicker.Group` and `ColorPicker.Swatch`
 * are the two pieces to compose a grid of your own from.
 *
 * For a colour that is a **token** rather than an arbitrary value, this is the wrong
 * control: that is a `Select` over the theme's own names.
 */
export const ColorPickerRoot = forwardRef<View, ColorPickerProps>(
  function ColorPicker(
    {
      children,
      variant,
      size = 'md',
      radius,
      color,
      labelPlacement,
      value: controlledValue,
      defaultValue,
      onValueChange,
      isOpen: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      colors = TAILWIND_PALETTE,
      closeOnSelect = true,
      isInvalid = false,
      isDisabled = false,
      asChild = false,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()

    const [value, setValue] = useControllableState<string | undefined>({
      value: controlledValue,
      defaultValue,
      onChange: onValueChange as ((next: string | undefined) => void) | undefined,
    })

    const [isOpen, setOpen] = useControllableState({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })

    const selection = { size, radius }
    const styles = colorPickerRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
    // letting one into the key would grow the table with the colours users invent.
    const tint = color
      ? colorPickerRecipe.tint({ theme, color, selection })
      : undefined

    const open = useCallback(() => {
      if (!isDisabled) setOpen(true)
    }, [isDisabled, setOpen])

    const select = useCallback(
      (next: string) => {
        if (isDisabled) return
        setValue(next)
        if (closeOnSelect) setOpen(false)
      },
      [closeOnSelect, isDisabled, setOpen, setValue]
    )

    const context = useMemo(
      () => ({
        value,
        select,
        colors,
        isDisabled,
        contentStyle: styles.content,
        // The chip carries the answer, so the answer is part of its style rather than a
        // prop the slot merges: a raw colour resolves outside the cache, like every other
        // value the caller invents.
        previewStyle: [
          styles.preview,
          value ? { backgroundColor: value } : undefined,
        ],
        previewEmptyStyle: colorPickerSheet.previewEmpty,
        gridStyle: styles.grid,
        groupStyle: styles.group,
        groupLabelStyle: styles.groupLabel,
        swatchesStyle: styles.swatches,
        swatchStyle: styles.swatch,
        swatchSelectedStyle: tint
          ? [styles.swatchSelected, tint.swatchSelected]
          : styles.swatchSelected,
        swatchFillStyle: styles.swatchFill,
      }),
      [value, select, colors, isDisabled, styles, tint]
    )

    return (
      <ColorPickerProvider value={context}>
        {/* No `radius` handed down: the field's corner is the field's, and a picker asked
            for a pill of a trigger did not ask for a pill of a dialog. The panel keeps the
            `Dialog`'s own, which is the corner every other panel in the library wears. */}
        <DialogRoot isOpen={isOpen} onOpenChange={setOpen} isDisabled={isDisabled}>
          {/* The column, and the press that opens the dialog. A picker written as a bare
              grid never renders a `ColorPicker.Field`, so `onPress` reaches nothing and
              the column is one `View` with a `gap` — which is what a grid on a page wants
              anyway. */}
          <DummyFieldRoot
            ref={ref}
            variant={variant}
            size={size}
            radius={radius}
            color={color}
            labelPlacement={labelPlacement}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            asChild={asChild}
            onPress={open}
            {...props}
          >
            {children}
          </DummyFieldRoot>
        </DialogRoot>
      </ColorPickerProvider>
    )
  }
)

ColorPickerRoot.displayName = 'XAUI.ColorPicker.Root'
