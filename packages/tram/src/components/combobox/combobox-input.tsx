import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import type { TextInputProps, TextStyle } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { NO_RING } from '../../system/no-ring'
import { useSelect } from '../select/select.context'
import { useAutocomplete } from '../autocomplete/autocomplete.context'
import type { ComboboxInputProps } from './combobox.type'

type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0]

/**
 * The field, standing where a `Select`'s value stands and set in its type: the query
 * while the list is open, the chosen row's label while it is not.
 *
 * Typing narrows the list and opens it; so does taking the focus. Neither is the value —
 * only a row is — so closing without choosing writes the chosen label back.
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
    const { query, setQuery } = useAutocomplete()
    const {
      valueStyle,
      placeholderStyle,
      border,
      value,
      isOpen,
      isDisabled,
      isInvalid,
      open,
      labelFor,
      labelId,
      descriptionId,
      errorId,
      listId,
    } = useSelect()

    const placeholderTextColor = useMemo(
      () =>
        StyleSheet.flatten<TextStyle>(placeholderStyle).color as string | undefined,
      [placeholderStyle]
    )

    const handleChangeText = useCallback(
      (next: string) => {
        setQuery(next)
        onChangeText?.(next)
        // After the query, so the list's first pass is already narrowed.
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

    const chosen = (value !== undefined && labelFor(value)) || ''

    return (
      <TextInput
        ref={ref}
        value={isOpen ? query : chosen}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        editable={!isDisabled}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={placeholderTextColor}
        // The caret is the open line's colour: the accent read as ink.
        selectionColor={border.open}
        cursorColor={border.open}
        // The label and the hint are siblings in the column, so the field points at them.
        // Before `rest`, so a caller's own is the last word.
        aria-labelledby={labelId}
        aria-describedby={`${descriptionId} ${errorId}`}
        aria-controls={listId}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-invalid={isInvalid || undefined}
        {...rest}
        // The value's type, so a query reads the size of the answer it replaces. No line
        // height in it: on iOS a single-line field lays the leading out above the glyphs.
        style={[valueStyle, NO_RING, styleProps, style]}
      />
    )
  }
)

ComboboxInput.displayName = 'XAUI.Tram.Combobox.Input'
