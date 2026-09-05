import { forwardRef } from 'react'
import { View } from 'react-native'
import { FieldGroupDecorator } from './field-group-decorator'
import type { FieldGroupSuffixProps } from './field-group.type'

/**
 * What sits after the text — a reveal toggle, a clear button, a unit, a counter.
 *
 * ```tsx
 * <FieldGroup>
 *   <FieldGroup.Field secureTextEntry value={password} onChangeText={setPassword} />
 *   <FieldGroup.Suffix>
 *     <Pressable onPress={toggle} hitSlop={20}>
 *       <FieldGroup.Icon as={isVisible ? EyeOffIcon : EyeIcon} />
 *     </Pressable>
 *   </FieldGroup.Suffix>
 * </FieldGroup>
 * ```
 *
 * The trailing edge is where a suffix is most often a **control**, which is why
 * `isDecorative` is off by default: a decorator that swallowed its own taps would be a
 * reveal toggle you cannot press.
 *
 * The library ships no button for it. A suffix holds whatever you put in it, and
 * `Pressable` with a `hitSlop` is the thing to put there — a 16pt glyph is not a touch
 * target on its own.
 */
export const FieldGroupSuffix = forwardRef<View, FieldGroupSuffixProps>(
  function FieldGroupSuffix(props, ref) {
    return <FieldGroupDecorator ref={ref} side="suffix" {...props} />
  }
)

FieldGroupSuffix.displayName = 'XAUI.FieldGroup.Suffix'
