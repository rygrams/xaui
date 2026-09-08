import { ColorPickerContent } from './color-picker-content'
import { ColorPickerField } from './color-picker-field'
import { ColorPickerGrid } from './color-picker-grid'
import { ColorPickerGroup } from './color-picker-group'
import { ColorPickerPreview } from './color-picker-preview'
import { ColorPickerRoot } from './color-picker'
import { ColorPickerSwatch } from './color-picker-swatch'
import {
  DummyFieldDescription,
  DummyFieldError,
  DummyFieldLabel,
} from '../dummy-field'
import { DialogClose, DialogOverlay, DialogTitle } from '../dialog'

/**
 * Three of the slots **are** the `DummyField`'s and three are the `Dialog`'s, re-exported
 * rather than wrapped — the `PhoneNumberField`'s arrangement, for its reason: a wrapper
 * would add six components to the tree to change a `displayName`, and the string it would
 * change is the one that tells you the truth.
 */
export const ColorPicker = Object.assign(ColorPickerRoot, {
  Label: DummyFieldLabel,
  Preview: ColorPickerPreview,
  Field: ColorPickerField,
  Description: DummyFieldDescription,
  Error: DummyFieldError,
  Overlay: DialogOverlay,
  Content: ColorPickerContent,
  Title: DialogTitle,
  Close: DialogClose,
  Grid: ColorPickerGrid,
  Group: ColorPickerGroup,
  Swatch: ColorPickerSwatch,
})

export { ColorPickerRoot } from './color-picker'
export { ColorPickerContent } from './color-picker-content'
export { ColorPickerField } from './color-picker-field'
export { ColorPickerGrid } from './color-picker-grid'
export { ColorPickerGroup } from './color-picker-group'
export { ColorPickerPreview } from './color-picker-preview'
export { ColorPickerSwatch } from './color-picker-swatch'
export { useColorPicker } from './color-picker.context'
export { colorPickerRecipe } from './color-picker.recipe'

/** The palette the grid draws when the root names none. */
export { TAILWIND_PALETTE } from './color-picker.palette'

export type {
  ColorGroup,
  ColorPickerContentProps,
  ColorPickerContextValue,
  ColorPickerFieldProps,
  ColorPickerGridProps,
  ColorPickerGroupProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerShade,
  ColorPickerSize,
  ColorPickerSlot,
  ColorPickerSwatchProps,
  ColorPickerVariant,
  ColorSwatch,
} from './color-picker.type'
