import { forwardRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { TextInput, TextStyle } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useFieldInGroup } from '../field-group/field-group.hook'
import { TextFieldField, useTextField } from '../text-field'
import { useMaskField } from './mask-field.context'
import {
  isStartAligned,
  maskRest,
  splitPlacement,
  textFace,
  textInset,
} from './mask-field.utils'
import type { MaskFieldFieldProps } from './mask-field.type'

/**
 * The box, masked — and, behind what is typed, what is still to type.
 *
 * ```tsx
 * <MaskField.Field />
 * <MaskField.Field placeholder="JJ/MM/AAAA" />
 * ```
 *
 * It **is** the Tram `TextField.Field` — the same node, the same line that moves to the
 * accent on focus, the same `isInvalid` and `isDisabled` — with the value and the
 * keystroke taken over by the mask. `keyboardType` follows the shape (the number pad for
 * digits) and `maxLength` is the shape's own length. Everything else a `TextInput`
 * accepts is still the caller's.
 *
 * **The rest of the shape** is a `Text` laid over the input, untouchable and hidden from
 * screen readers. It writes the typed text again, in no colour, then the rest of the
 * shape in the placeholder's grey: the invisible copy is what pushes the grey part to
 * exactly where the input's text ends, whatever the font's widths, with nothing measured.
 *
 * It lines up because it is set the way the input sets its text, not because it is
 * nudged into place: the same face, size and spacing (`textFace`), inset from the box by
 * the same line and padding (`textInset`), and centred in the box's height by the font's
 * own height — **no `lineHeight`** on either, which on a single line sinks iOS's typed
 * text under it. What places the field (margins, width, flex) goes on the `View` that
 * holds both, so the two always cover the same rectangle.
 *
 * In a `FieldGroup` it stands in the group's box, as `FieldGroup.Field` does.
 */
export const MaskFieldField = forwardRef<TextInput, MaskFieldFieldProps>(
  function MaskFieldField({ placeholder, style, onFocus, onBlur, ...props }, ref) {
    const {
      text,
      onType,
      placeholder: shape,
      keyboard,
      length,
      showMask,
    } = useMaskField()
    const { fieldStyle, placeholderTextColor } = useTextField()
    const [styleProps, rest] = useStyleProps(props)
    // Inside a `FieldGroup` the box is the group's: the field draws no line of its own and
    // moves the group's on focus. Outside one, nothing changes.
    const grouped = useFieldInGroup({ onFocus, onBlur })

    // The caller's style, cut in two: the placement goes round the input and its shape;
    // the drawing stays on the input, where the `TextField` puts its own.
    const caller = splitPlacement(
      StyleSheet.flatten<TextStyle>([grouped.style, styleProps, style])
    )

    // What the input actually draws with — its own style, then the caller's — read back
    // so the shape sits where the text does.
    const drawn = { ...StyleSheet.flatten<TextStyle>(fieldStyle), ...caller.inner }

    const shown = placeholder ?? shape
    const restOfShape =
      showMask && isStartAligned(drawn) ? maskRest(text, shown, length) : ''

    return (
      <View style={caller.outer}>
        <TextFieldField
          ref={ref}
          keyboardType={keyboard}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={length}
          placeholder={shown}
          {...rest}
          // After the caller's, and deliberately: these two are the mask, and a `value` or
          // an `onChangeText` from outside would be writing into the middle of it.
          value={text}
          onChangeText={onType}
          onFocus={grouped.onFocus}
          onBlur={grouped.onBlur}
          style={caller.inner}
        />
        {restOfShape ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[sheet.overlay, textInset(drawn)]}
          >
            <Text numberOfLines={1} ellipsizeMode="clip" style={textFace(drawn)}>
              <Text style={sheet.typed}>{text}</Text>
              <Text style={{ color: placeholderTextColor }}>{restOfShape}</Text>
            </Text>
          </View>
        ) : null}
      </View>
    )
  }
)

MaskFieldField.displayName = 'XAUI.Tram.MaskField.Field'

const sheet = StyleSheet.create({
  // Over the input, never in its way: a touch goes through to it.
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  // The typed text again, unseen: it only holds the grey rest at the input's text end.
  typed: { color: 'transparent' },
})
