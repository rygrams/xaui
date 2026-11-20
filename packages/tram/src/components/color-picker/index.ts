import { TextFieldDescription, TextFieldError } from '../text-field'
import { DummyFieldLabel } from '../dummy-field'
import { ColorPickerRoot } from './color-picker'
import { ColorPickerClose } from './color-picker-close'
import { ColorPickerContent } from './color-picker-content'
import { ColorPickerField } from './color-picker-field'
import { ColorPickerGrid } from './color-picker-grid'
import { ColorPickerGroup } from './color-picker-group'
import { ColorPickerOverlay } from './color-picker-overlay'
import { ColorPickerPreview } from './color-picker-preview'
import { ColorPickerSwatch } from './color-picker-swatch'
import { ColorPickerTitle } from './color-picker-title'

/**
 * Native's slots. `Label`, `Description` and `Error` **are** the Tram `DummyField`'s,
 * re-exported rather than wrapped. `Overlay`, `Title` and `Close` are this component's
 * own, where Native's are the `Dialog`'s: the Tram picker opens a page, not a banner.
 */
export const ColorPicker = Object.assign(ColorPickerRoot, {
  Label: DummyFieldLabel,
  Preview: ColorPickerPreview,
  Field: ColorPickerField,
  Description: TextFieldDescription,
  Error: TextFieldError,
  Overlay: ColorPickerOverlay,
  Content: ColorPickerContent,
  Title: ColorPickerTitle,
  Close: ColorPickerClose,
  Grid: ColorPickerGrid,
  Group: ColorPickerGroup,
  Swatch: ColorPickerSwatch,
})

export { ColorPickerRoot } from './color-picker'
export { ColorPickerClose } from './color-picker-close'
export { ColorPickerContent } from './color-picker-content'
export { ColorPickerField } from './color-picker-field'
export { ColorPickerGrid } from './color-picker-grid'
export { ColorPickerGroup } from './color-picker-group'
export { ColorPickerOverlay } from './color-picker-overlay'
export { ColorPickerPreview } from './color-picker-preview'
export { ColorPickerSwatch } from './color-picker-swatch'
export { ColorPickerTitle } from './color-picker-title'
export { useColorPicker } from './color-picker.context'
export { colorPickerRecipe } from './color-picker.recipe'

/** The palette the grid draws when the root names none: the twenty Tram accents. */
export { TRAM_PALETTE } from './color-picker.palette'

export type {
  ColorGroup,
  ColorPickerCloseProps,
  ColorPickerContentProps,
  ColorPickerContextValue,
  ColorPickerFieldProps,
  ColorPickerGridProps,
  ColorPickerGroupProps,
  ColorPickerLayout,
  ColorPickerOverlayProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSize,
  ColorPickerSlot,
  ColorPickerSwatchProps,
  ColorPickerTitleProps,
  ColorSwatch,
} from './color-picker.type'
