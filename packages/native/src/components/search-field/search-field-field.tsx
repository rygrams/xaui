import { forwardRef } from 'react'
import type { TextInput } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { TextFieldField } from '../text-field'
import { useSearchField } from './search-field.context'
import type { SearchFieldFieldProps } from './search-field.type'

/**
 * The box, read as a query.
 *
 * It **is** `TextField.Field` — the same node, the same focus plumbing, the same
 * `isInvalid` — with the value, the keystroke and the return key taken over by the root's
 * query, and the variant's fill laid over the box the `TextField` resolved.
 *
 * The three defaults are what a search box is: no autocorrect and no leading capital,
 * because a query is not a sentence, and a keyboard whose return key says "search". All
 * three are the caller's to override — a field searching a list of proper nouns wants its
 * capitals back.
 *
 * Inside a `FieldGroup` the decorators clear themselves, exactly as `FieldGroup.Field`
 * does, which is how the magnifier and the cross get their room.
 */
export const SearchFieldField = forwardRef<TextInput, SearchFieldFieldProps>(
  function SearchFieldField({ style, ...props }, ref) {
    const { query, onType, submit, boxStyle } = useSearchField()
    // R14 — split here rather than leaving it to `TextField.Field`: the fill goes on after
    // the box the `TextField` resolved and *before* the caller's own keys, and a
    // `backgroundColor={…}` written on this node has to win over the variant it overrides.
    const [styleProps, rest] = useStyleProps(props)

    return (
      <TextFieldField
        ref={ref}
        accessibilityRole="search"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        {...rest}
        // After the caller's, and deliberately: these three are the query, and a `value`
        // or an `onChangeText` from outside would be writing into the middle of it. The
        // prop type already says so — this is what makes it true.
        value={query}
        onChangeText={onType}
        onSubmitEditing={submit}
        style={[boxStyle, styleProps, style]}
      />
    )
  }
)

SearchFieldField.displayName = 'XAUI.SearchField.Field'
