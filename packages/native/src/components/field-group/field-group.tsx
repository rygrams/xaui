import { forwardRef, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { FieldGroupProvider } from './field-group.context'
import type { FieldGroupProps } from './field-group.type'

/**
 * A field with something beside it — a glyph, a unit, a reveal toggle.
 *
 * ```tsx
 * <TextField>
 *   <TextField.Label>Mot de passe</TextField.Label>
 *   <FieldGroup>
 *     <FieldGroup.Prefix isDecorative>
 *       <FieldGroup.Icon as={LockIcon} />
 *     </FieldGroup.Prefix>
 *     <FieldGroup.Field secureTextEntry value={password} onChangeText={setPassword} />
 *     <FieldGroup.Suffix>
 *       <Pressable onPress={toggle} hitSlop={20}>
 *         <FieldGroup.Icon as={EyeIcon} />
 *       </Pressable>
 *     </FieldGroup.Suffix>
 *   </FieldGroup>
 *   <TextField.Description>Douze caractères au moins.</TextField.Description>
 * </TextField>
 * ```
 *
 * **It goes inside a `TextField`, and it replaces nothing but the field.** The column, the
 * label, the hint, the error, the four variants, the `size`, the `radius`, the tint, the
 * focus and `isInvalid` are all still the `TextField`'s — this root is one row of that column,
 * and it owns exactly one thing: how wide the two decorators turned out to be.
 *
 * That is why the box is still the `TextInput` itself. A wrapper carrying the border, the
 * fill and the radius would be a second thing to keep in step with `TextField`, and the day
 * one of them gained a shadow the other would not have it. The decorators are laid **over**
 * the field instead, out of flow, and the field clears them with padding.
 *
 * It works under `TextArea` too — the same context, the same field — though a decorator
 * centred over six lines of text is rarely what a multiline field wants.
 */
export const FieldGroupRoot = forwardRef<View, FieldGroupProps>(function FieldGroup(
  { children, asChild = false, style, ...props },
  ref
) {
  // R14 — what is left is `View`'s own props plus whatever style keys the caller wrote.
  const [styleProps, rest] = useStyleProps(props)

  // The two decorators measure themselves and report here, because the node that has to
  // know is the field between them. Both setters keep their identity, so publishing them
  // costs no re-render of a decorator that never changes size.
  const [prefixWidth, setPrefixWidth] = useState(0)
  const [suffixWidth, setSuffixWidth] = useState(0)

  const context = useMemo(
    () => ({ prefixWidth, suffixWidth, setPrefixWidth, setSuffixWidth }),
    [prefixWidth, suffixWidth]
  )

  const rootStyle = [styleProps, style]

  // No `accessibilityRole` and no style of its own: this row is a positioning context for
  // the decorators — RN views are `relative` already — and the control inside it is the
  // field. A role here would give a screen reader a second element to stop on.
  const surface = asChild ? (
    // R12 — the caller's element *is* the row.
    <Slot ref={ref} {...rest} style={rootStyle}>
      {children}
    </Slot>
  ) : (
    <View ref={ref} {...rest} style={rootStyle}>
      {children}
    </View>
  )

  return <FieldGroupProvider value={context}>{surface}</FieldGroupProvider>
})

FieldGroupRoot.displayName = 'XAUI.FieldGroup.Root'
