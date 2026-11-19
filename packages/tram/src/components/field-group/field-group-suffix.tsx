import { forwardRef } from 'react'
import type { View } from 'react-native'
import { FieldGroupDecorator } from './field-group-decorator'
import type { FieldGroupSuffixProps } from './field-group.type'

/**
 * What stands after the text — a unit, a reveal toggle, a clear button.
 *
 * ```tsx
 * <FieldGroup>
 *   <FieldGroup.Field keyboardType="decimal-pad" />
 *   <FieldGroup.Suffix isDecorative>
 *     <Text>kg</Text>
 *   </FieldGroup.Suffix>
 * </FieldGroup>
 * ```
 *
 * At the **trailing** end of the box. `isDecorative` for a mark, which leans on the text;
 * left off for a control, which is ruled off as a key.
 */
export const FieldGroupSuffix = forwardRef<View, FieldGroupSuffixProps>(
  function FieldGroupSuffix(props, ref) {
    return <FieldGroupDecorator ref={ref} side="suffix" {...props} />
  }
)

FieldGroupSuffix.displayName = 'XAUI.Tram.FieldGroup.Suffix'
