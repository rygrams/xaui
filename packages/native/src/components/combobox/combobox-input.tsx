import { forwardRef, useCallback } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import type { TextInputProps } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from '../autocomplete'
import type { ComboboxInputProps } from './combobox.type'

/**
 * The field fills the box, which is what makes the box one target rather than a field with
 * a dead margin around it. Pure geometry with no token in it, so it is a sheet rather than
 * a line in a recipe.
 */
const sheet = StyleSheet.create({ input: { flex: 1 } })

/** Read off the prop rather than named: RN has changed this event's type twice. */
type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0]

/**
 * The field, and the whole difference between this component and the `Autocomplete`.
 *
 * **What it shows depends on whether the panel is open**: the query while it is, the chosen
 * row's label once it is not. That is the closed list, in one expression — the query goes
 * with the panel, so closing without choosing puts the chosen label back rather than
 * leaving a half-typed word standing where a value should be.
 *
 * It fills the trigger, so tapping the box taps the field: there is one target, and it is
 * the one that raises the keyboard.
 */
export const ComboboxInput = forwardRef<TextInput, ComboboxInputProps>(
  function ComboboxInput(
    {
      opensOnChange = true,
      opensOnFocus = true,
      style,
      onFocus,
      onChangeText,
      ...props
    },
    ref
  ) {
    const [styleProps, rest] = useStyleProps(props)
    const {
      valueStyle,
      placeholderColor,
      value,
      query,
      setQuery,
      isOpen,
      isDisabled,
      open,
      labelFor,
    } = useAutocomplete()

    const handleChangeText = useCallback(
      (next: string) => {
        setQuery(next)
        onChangeText?.(next)
        // After the query, so the panel's first pass is already filtered rather than
        // showing the whole list for one frame and then narrowing.
        if (opensOnChange && !isOpen) open()
      },
      [isOpen, onChangeText, open, opensOnChange, setQuery]
    )

    const handleFocus = useCallback(
      (event: FocusEvent) => {
        onFocus?.(event)
        if (opensOnFocus) open()
      },
      [onFocus, open, opensOnFocus]
    )

    return (
      <TextInput
        ref={ref}
        value={isOpen ? query : (value !== undefined && labelFor(value)) || ''}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        editable={!isDisabled}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={placeholderColor}
        // The field takes the trigger's own text style: it stands where the chosen value
        // stands in a `Select`, and a query that read smaller than the answer it replaces
        // would make the control change size as you typed.
        {...rest}
        style={[valueStyle, sheet.input, styleProps, style]}
      />
    )
  }
)

ComboboxInput.displayName = 'XAUI.Combobox.Input'
