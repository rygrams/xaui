---
'@xaui/native': patch
---

`Input` becomes `TextField`, `InputGroup` becomes `FieldGroup`

Breaking, and deliberately taken now: the package is on the alpha line, so this costs a
changeset rather than a major. Seven planned components are described in terms of this
field — `NumberInput`, `PhoneNumberInput`, `SearchInput`, `DateInput`, `BottomSheetInput` —
and each one written before the rename would have been written against a name about to
move.

`Input` was never the right name here. The root is not the thing you type into: it is the
column that holds a label, a field, a hint and an error, and keeps them in step. `TextField`
says that, and it leaves `Field` free to mean the one node that is actually a `TextInput`.

`TextInput` was the obvious candidate and is the one name to avoid. React Native exports
`TextInput` and `TextInputProps`, both imported by the field, the group's field and the text
area. A public `TextFieldProps` sitting beside React Native's `TextInputProps` is a name
collision in every file that touches both, and a reader's coin flip in the ones that do not.

`FieldGroup` rather than `TextFieldGroup` for the same reason the root dropped `Input`: the
group decorates a field, and the field's own type is not its business.

| before                          | after                                |
| ------------------------------- | ------------------------------------ |
| `@xaui/native/input`            | `@xaui/native/text-field`            |
| `@xaui/native/input-group`      | `@xaui/native/field-group`           |
| `Input`, `Input.Field`          | `TextField`, `TextField.Field`       |
| `InputGroup`, `InputGroup.Icon` | `FieldGroup`, `FieldGroup.Icon`      |
| `useInput`, `useInputGroup`     | `useTextField`, `useFieldGroup`      |
| `InputProps`, `InputVariant`    | `TextFieldProps`, `TextFieldVariant` |
| `inputRecipe`                   | `textFieldRecipe`                    |

The slot names do not move. `TextField.Field` still stutters as `TextFieldField` internally,
and that was the trade taken: renaming the slot would have changed every call site that the
rename otherwise leaves alone.

`InputOTP` keeps its name. It is not a text field with decoration, and nothing in it reads
the field's context.
