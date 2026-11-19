import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import type { TextStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTextField } from '../text-field'
import type { FieldBlurEvent, FieldFocusEvent } from '../text-field'
import { SearchFieldIcon } from './search-field-icon'
import { useSearchField } from './search-field.context'
import { restLine, splitByType, splitFieldStyle } from './search-field.utils'
import type { SearchFieldFieldProps } from './search-field.type'

/**
 * The box, read as a query: the magnifier, the typed text and the cross in one line of 2.
 *
 * ```tsx
 * <SearchField.Field placeholder="rechercher">
 *   <SearchField.Icon />
 *   <SearchField.Clear accessibilityLabel="effacer la recherche" />
 * </SearchField.Field>
 * ```
 *
 * It takes what `TextField.Field` takes, less the value and its two callbacks, which are
 * the root's query. A box-shaped style — `borderColor`, `height`, `backgroundColor` — lands
 * on the box; a text-shaped one — `fontSize`, `color`, `textAlign` — on the typed text.
 *
 * The children are the marks: `SearchField.Icon` goes before the text, anything else after
 * it. Written with none, the box draws the magnifier alone. The focus moves the line from
 * its rest colour to the accent and the magnifier from grey to the page's ink, through
 * `useTramMotion`; a `borderColor` the caller writes holds in every state.
 *
 * The defaults are a search box's: no autocorrect, no leading capital, and a return key
 * that says "search" — all the caller's to override.
 */
export const SearchFieldField = forwardRef<TextInput, SearchFieldFieldProps>(
  function SearchFieldField(
    {
      children,
      style,
      onFocus,
      onBlur,
      placeholderTextColor,
      hitSlop,
      accessibilityState,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const field = useTextField()
    const { query, onType, submit, variant, focus, boxStyle, inputStyle } =
      useSearchField()
    const [styleProps, rest] = useStyleProps(props)
    const animate = useTramMotion()

    const {
      fieldStyle,
      border,
      reach,
      fieldRef,
      labelId,
      descriptionId,
      errorId,
      isDisabled,
      isInvalid,
      isRequired,
      isStill,
    } = field

    const moveFocus = useCallback(
      (to: number) => {
        focus.value = isStill ? to : animate(to, 'navigation')
      },
      [focus, isStill, animate]
    )

    // Composed, never replaced: a caller's handler runs, and the line still moves.
    const handleFocus = useCallback(
      (event: FieldFocusEvent) => {
        moveFocus(1)
        onFocus?.(event)
      },
      [moveFocus, onFocus]
    )

    const handleBlur = useCallback(
      (event: FieldBlurEvent) => {
        moveFocus(0)
        onBlur?.(event)
      },
      [moveFocus, onBlur]
    )

    // The `TextField`'s field, and the caller's, each cut in two: the box draws the line,
    // the fill and the height; the input only the type.
    const own = useMemo(
      () => splitFieldStyle(StyleSheet.flatten<TextStyle>(fieldStyle)),
      [fieldStyle]
    )
    const caller = splitFieldStyle(
      StyleSheet.flatten<TextStyle>([styleProps, style])
    )

    const atRest = restLine({
      variant,
      isInvalid,
      invalidLine: border.rest,
      muted: theme.colors.muted,
      surface: theme.colors.surface,
    })
    const focused = border.focus
    const line = useAnimatedStyle(() => {
      'worklet'
      return {
        borderColor: interpolateColor(focus.value, [0, 1], [atRest, focused]),
      }
    }, [focus, atRest, focused])

    // A `borderColor` the caller wrote is theirs in every state.
    const isLineOverridden = caller.box.borderColor !== undefined

    const marks =
      children === undefined || children === null ? <SearchFieldIcon /> : children
    const { start, end } = splitByType(marks, SearchFieldIcon)

    // One node, two holders: the caller's ref, and the `TextField`'s — which is how a
    // touch on the label reaches the input.
    const setRef = useCallback(
      (node: TextInput | null) => {
        fieldRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [fieldRef, ref]
    )

    return (
      <Animated.View
        style={[own.box, boxStyle, caller.box, isLineOverridden ? undefined : line]}
      >
        {start}
        <TextInput
          ref={setRef}
          accessibilityRole="search"
          aria-labelledby={labelId}
          aria-describedby={`${descriptionId} ${errorId}`}
          aria-invalid={isInvalid}
          // Left out rather than `false`: on the web its mere presence makes it required.
          aria-required={isRequired || undefined}
          aria-disabled={isDisabled}
          editable={!isDisabled}
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          placeholderTextColor={placeholderTextColor ?? field.placeholderTextColor}
          // `sm` is drawn under the 48 touch target; the slop makes it up.
          hitSlop={hitSlop ?? reach}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          {...rest}
          // After the caller's: these three are the query.
          value={query}
          onChangeText={onType}
          onSubmitEditing={submit}
          style={[own.text, inputStyle, caller.text]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {end}
      </Animated.View>
    )
  }
)

SearchFieldField.displayName = 'XAUI.Tram.SearchField.Field'
