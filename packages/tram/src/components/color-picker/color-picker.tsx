import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentInk } from '../../theme/accent-ink'
import { isHex } from '../../theme/on-accent'
import { useTramHaptic } from '../../theme/tram-haptics'
import { DummyFieldRoot } from '../dummy-field'
import { ColorPickerProvider } from './color-picker.context'
import { TRAM_PALETTE } from './color-picker.palette'
import {
  DEFAULT_LAYOUT,
  DEFAULT_SIZE,
  colorPickerRecipe,
} from './color-picker.recipe'
import { colorName } from './color-picker.utils'
import type { ColorPickerProps } from './color-picker.type'

/**
 * A colour, chosen off a palette — the Native `ColorPicker`'s API, drawn as the Windows
 * Phone accents page.
 *
 * ```tsx
 * // The field, and the page it opens.
 * <ColorPicker value={accent} onValueChange={setAccent}>
 *   <ColorPicker.Label>couleur d'accent</ColorPicker.Label>
 *   <ColorPicker.Field placeholder="choisir une couleur" />
 *   <ColorPicker.Description>les tuiles la prennent.</ColorPicker.Description>
 *   <ColorPicker.Overlay />
 *   <ColorPicker.Content>
 *     <ColorPicker.Title>accents</ColorPicker.Title>
 *     <ColorPicker.Close accessibilityLabel="fermer" />
 *     <ColorPicker.Grid />
 *   </ColorPicker.Content>
 * </ColorPicker>
 *
 * // The grid, on the page. No field, nothing to open.
 * <ColorPicker layout="mosaic" value={accent} onValueChange={setAccent}>
 *   <ColorPicker.Grid scrollEnabled={false} />
 * </ColorPicker>
 * ```
 *
 * **The field is the Tram `DummyField`**, its root below unchanged: a line of 2 round the
 * chip, the colour's name and the `Select`'s chevron. **The page is the `Select`'s**: it
 * swivels in on its top edge, the swatches arrive in cascade, the system's back closes it.
 *
 * **The palette is the twenty Tram accents** (`TRAM_PALETTE`), named, with no shades.
 * `colors` replaces it; `ColorPicker.Group` and `ColorPicker.Swatch` compose one by hand.
 * A choice is felt as a `selection` through `TramProvider`'s `onHaptic`.
 */
export const ColorPickerRoot = forwardRef<View, ColorPickerProps>(
  function ColorPicker(
    {
      children,
      size = DEFAULT_SIZE,
      layout = DEFAULT_LAYOUT,
      value: controlledValue,
      defaultValue,
      onValueChange,
      isOpen: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      colors = TRAM_PALETTE,
      closeOnSelect = true,
      isDisabled = false,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const haptic = useTramHaptic()
    const isStill = useAnimationDisabled()
    const titleId = `${useId()}-title`
    const dismissable = useRef(true)
    const [titles, setTitles] = useState(0)

    const [value, setValue] = useControllableState<string | undefined>({
      value: controlledValue,
      defaultValue,
      onChange: onValueChange as ((next: string | undefined) => void) | undefined,
    })

    const [wantsOpen, setOpen] = useControllableState({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    // A disabled picker does not open, whoever asks.
    const isOpen = wantsOpen && !isDisabled

    // Held here, an open page is closed by disabling the picker — not set aside to come
    // back on its own once it is enabled again. A controlled one is the caller's to close.
    const isControlled = controlledOpen !== undefined
    useEffect(() => {
      if (isDisabled && !isControlled && wantsOpen) setOpen(false)
    }, [isDisabled, isControlled, wantsOpen, setOpen])

    const registerTitle = useCallback(() => {
      setTitles(count => count + 1)

      return () => setTitles(count => count - 1)
    }, [])

    const styles = colorPickerRecipe.resolve({
      theme,
      selection: { size, layout },
      states: { disabled: isDisabled },
    })

    const open = useCallback(() => {
      if (!isDisabled) setOpen(true)
    }, [isDisabled, setOpen])
    const close = useCallback(() => setOpen(false), [setOpen])

    const select = useCallback(
      (next: string) => {
        if (isDisabled) return
        haptic('selection')
        setValue(next)
        if (closeOnSelect) setOpen(false)
      },
      [isDisabled, haptic, setValue, closeOnSelect, setOpen]
    )

    const nameOf = useCallback((color: string) => colorName(colors, color), [colors])

    const ground = theme.colors.background
    // A colour written as a name is read, so it is that colour's ink on the ground. A raw
    // colour that is not a hex cannot be measured, and is written as it is.
    const inkOf = useCallback(
      (color: string) =>
        isHex(color) && isHex(ground) ? accentInk(color, ground) : color,
      [ground]
    )

    const context = useMemo(
      () => ({
        value,
        select,
        close,
        colors,
        layout,
        nameOf,
        inkOf,
        isOpen,
        isDisabled,
        isStill,
        isPaged: false,
        dismissable,
        titleId,
        hasTitle: titles > 0,
        registerTitle,
        pageTop: theme.spacing(6),
        // The chip carries the answer, so the answer is part of its style: a raw colour,
        // resolved outside the cache like every value the caller invents.
        previewStyle: [
          styles.preview,
          value ? { backgroundColor: value } : undefined,
        ],
        previewEmptyStyle: styles.previewEmpty,
        pageStyle: styles.page,
        titleStyle: styles.title,
        closeStyle: styles.close,
        gridStyle: styles.grid,
        groupStyle: styles.group,
        groupLabelStyle: styles.groupLabel,
        swatchesStyle: styles.swatches,
        mosaicRowStyle: styles.mosaicRow,
        cellStyle: styles.cell,
        swatchStyle: styles.swatch,
        swatchFillStyle: styles.swatchFill,
        swatchNameStyle: styles.swatchName,
        swatchNameKeptStyle: styles.swatchNameKept,
        ringStyle: styles.ring,
        ringLineStyle: styles.ringLine,
      }),
      [
        value,
        select,
        close,
        colors,
        layout,
        nameOf,
        inkOf,
        isOpen,
        isDisabled,
        isStill,
        titleId,
        titles,
        registerTitle,
        theme,
        styles,
      ]
    )

    return (
      <ColorPickerProvider value={context}>
        {/* The column, and the press that opens the page. A picker written as a bare grid
            renders no `ColorPicker.Field`, so the press reaches nothing and the column is
            a `View` with a `gap` — which is what a grid on a page wants anyway. */}
        <DummyFieldRoot
          ref={ref}
          size={size}
          isDisabled={isDisabled}
          onPress={open}
          {...props}
        >
          {children}
        </DummyFieldRoot>
      </ColorPickerProvider>
    )
  }
)

ColorPickerRoot.displayName = 'XAUI.Tram.ColorPicker.Root'
