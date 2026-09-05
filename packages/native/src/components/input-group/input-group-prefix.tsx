import { forwardRef } from 'react'
import { View } from 'react-native'
import { InputGroupDecorator } from './input-group-decorator'
import type { InputGroupPrefixProps } from './input-group.type'

/**
 * What sits before the text — a search glyph, a currency, a country code.
 *
 * ```tsx
 * <InputGroup>
 *   <InputGroup.Prefix isDecorative>
 *     <InputGroup.Icon as={SearchIcon} />
 *   </InputGroup.Prefix>
 *   <InputGroup.Field placeholder="Rechercher…" />
 * </InputGroup>
 * ```
 *
 * It is pinned to the **leading** edge and inset by the field's own padding, so the glyph
 * starts where the text would have. The field then clears it by the width it measured —
 * which is what lets a `+33` prefix and a 16pt mark both sit right, without either one
 * being told a number.
 *
 * Add `isDecorative` whenever it holds nothing to press. Leave it off for a control.
 */
export const InputGroupPrefix = forwardRef<View, InputGroupPrefixProps>(
  function InputGroupPrefix(props, ref) {
    return <InputGroupDecorator ref={ref} side="prefix" {...props} />
  }
)

InputGroupPrefix.displayName = 'XAUI.InputGroup.Prefix'
