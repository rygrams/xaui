import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { DISC_SIZE } from '../../system/disc-size'
import { pointsOf } from '../../system/style-values'
import { useTextField } from '../text-field'
import { FieldGroupProvider } from './field-group.context'
import { fieldGroupRecipe } from './field-group.recipe'
import { boxFromField, cellInsets, sizeAtHeight } from './field-group.utils'
import type { FieldGroupProps } from './field-group.type'

/**
 * A field with something beside it — a glyph, a unit, a country, a reveal toggle — the
 * Native `FieldGroup`'s API, drawn in Metro: **one box** around a cell, the text and a
 * cell, inside the `TextField`'s line of 2, which takes the accent while the field has the
 * focus.
 *
 * ```tsx
 * <TextField>
 *   <TextField.Label>mot de passe</TextField.Label>
 *   <FieldGroup>
 *     <FieldGroup.Prefix isDecorative>
 *       <FieldGroup.Icon as={LockIcon} />
 *     </FieldGroup.Prefix>
 *     <FieldGroup.Field secureTextEntry value={password} onChangeText={setPassword} />
 *     <FieldGroup.Suffix>
 *       <Pressable onPress={toggle} accessibilityLabel="afficher">
 *         <FieldGroup.Icon as={EyeIcon} />
 *       </Pressable>
 *     </FieldGroup.Suffix>
 *   </FieldGroup>
 * </TextField>
 * ```
 *
 * **It goes inside a `TextField`, and replaces nothing but the field.** The label, the hint,
 * the error, the `size`, the accent, `isInvalid` and `isDisabled` are the `TextField`'s, and
 * so is the box: its line, corner, ground and height are read off the field's style.
 *
 * **One row, where Native lays its decorators over the field.** Native measures each
 * decorator and pads the field by its width; here a cell, the field and a cell stand side
 * by side, so nothing is measured. A decorative mark leans on the text; a control is a key
 * of its own, ruled off from the text by the `NumberField`'s rule.
 */
export const FieldGroupRoot = forwardRef<View, FieldGroupProps>(function FieldGroup(
  { children, asChild = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  const { fieldStyle, border, placeholderTextColor } = useTextField()
  const [styleProps, rest] = useStyleProps(props)
  const focus = useSharedValue(0)

  const styles = fieldGroupRecipe.resolve({ theme })

  const drawn = useMemo(
    () => boxFromField(StyleSheet.flatten<TextStyle>(fieldStyle)),
    [fieldStyle]
  )

  const { sm, md, lg } = theme.controlHeights
  // The box's own height, line included: that is what the `TextField` drew at its size.
  const height = pointsOf(drawn.box.minHeight)
  const glyph = DISC_SIZE[sizeAtHeight(height, { sm, md, lg })].glyph

  const context = useMemo(
    () => ({
      focus,
      fieldStyle: [styles.field, { minHeight: drawn.innerHeight }],
      decoratorStyle: styles.decorator,
      ruleStyle: styles.rule,
      rulePrefixStyle: styles.rulePrefix,
      ruleSuffixStyle: styles.ruleSuffix,
      cellInsets: cellInsets(drawn.inset),
      inset: drawn.inset,
      innerHeight: drawn.innerHeight,
      // A mark in a field is decoration for the text, not text: the placeholder's grey.
      icon: { size: glyph, color: placeholderTextColor ?? theme.colors.muted },
    }),
    [focus, styles, drawn, glyph, placeholderTextColor, theme.colors.muted]
  )

  const { rest: atRest, focus: focused } = border
  const line = useAnimatedStyle(() => {
    'worklet'
    return {
      borderColor: interpolateColor(focus.value, [0, 1], [atRest, focused]),
    }
  }, [focus, atRest, focused])

  // A `borderColor` the caller wrote is theirs in every state, as on the field.
  const isLineOverridden =
    StyleSheet.flatten([styleProps, style])?.borderColor !== undefined

  // The box is the group's one node. No role on it: the control inside is the field.
  const surface = asChild ? (
    // The caller's element is the box. Its line stays at rest: it may not animate.
    <Slot
      ref={ref}
      {...rest}
      style={[styles.box, drawn.box, { borderColor: atRest }, styleProps, style]}
    >
      {children}
    </Slot>
  ) : (
    <Animated.View
      ref={ref}
      {...rest}
      style={[
        styles.box,
        drawn.box,
        styleProps,
        style,
        isLineOverridden ? undefined : line,
      ]}
    >
      {children}
    </Animated.View>
  )

  return <FieldGroupProvider value={context}>{surface}</FieldGroupProvider>
})

FieldGroupRoot.displayName = 'XAUI.Tram.FieldGroup.Root'
