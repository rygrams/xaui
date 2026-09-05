import { forwardRef } from 'react'
import { View } from 'react-native'
import { InputGroupDecorator } from './input-group-decorator'
import type { InputGroupSuffixProps } from './input-group.type'

/**
 * What sits after the text — a reveal toggle, a clear button, a unit, a counter.
 *
 * ```tsx
 * <InputGroup>
 *   <InputGroup.Field secureTextEntry value={password} onChangeText={setPassword} />
 *   <InputGroup.Suffix>
 *     <Pressable onPress={toggle} hitSlop={20}>
 *       <InputGroup.Icon as={isVisible ? EyeOffIcon : EyeIcon} />
 *     </Pressable>
 *   </InputGroup.Suffix>
 * </InputGroup>
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
export const InputGroupSuffix = forwardRef<View, InputGroupSuffixProps>(
  function InputGroupSuffix(props, ref) {
    return <InputGroupDecorator ref={ref} side="suffix" {...props} />
  }
)

InputGroupSuffix.displayName = 'XAUI.InputGroup.Suffix'
