# PhoneNumberField

## Overview

A national phone number beside its country flag and calling code, with a searchable country
sheet. Imports from `@xaui/native/phone-number-field`. Run the `phone-number-field` demo
screen to try the real component in light and dark mode.

## Anatomy

```text
PhoneNumberField
  Label
  FieldGroup
    FieldGroup.Prefix → Country
    Field
  Description / Error
  Overlay
  Content
    Handle
    Title
    Search
    CountryList
    Close
```

## Usage

```tsx
import { FieldGroup } from '@xaui/native/field-group'
import { PhoneNumberField } from '@xaui/native/phone-number-field'
;<PhoneNumberField defaultValue={{ country: 'AD', nationalNumber: '' }}>
  <PhoneNumberField.Label>Phone number</PhoneNumberField.Label>
  <FieldGroup>
    <FieldGroup.Prefix>
      <PhoneNumberField.Country accessibilityLabel="Choose country" />
    </FieldGroup.Prefix>
    <PhoneNumberField.Field placeholder="000 000" />
  </FieldGroup>
  <PhoneNumberField.Description>
    We’ll send a verification code.
  </PhoneNumberField.Description>
  <PhoneNumberField.Overlay />
  <PhoneNumberField.Content height="65%" isSwipeable={false}>
    <PhoneNumberField.Handle />
    <PhoneNumberField.Title>Choose country</PhoneNumberField.Title>
    <PhoneNumberField.Search
      accessibilityLabel="Search country"
      placeholder="Search country…"
    />
    <PhoneNumberField.CountryList />
  </PhoneNumberField.Content>
</PhoneNumberField>
```

Use `value` and `onValueChange` for a controlled field. The value is
`{ country: 'FR', nationalNumber: '0612345678' }`; an empty number is an empty string.
Changing country preserves the national text. Pasting a complete international number
selects its country when allowed by `countries`. Unsupported international pastes leave
the current value unchanged. Formatting runs on blur so deletion does not fight inserted
spaces. `usePhoneNumberField().phoneNumber` exposes E.164 for a possible number, otherwise
`null`; possibility is a length check, not proof of assignment or reachability.

`countries` restricts the list; the selected/default country must belong to it. With no initial value, the first allowed country is selected (US when unrestricted). Names
and sorting follow `locale`. Searching accepts country name, ISO code or calling code.
The sheet uses the existing BottomSheet and requires `react-native-gesture-handler` and
a `GestureHandlerRootView`, plus XAUIProvider's portal host.

## Props

Generated from TypeScript by `node tooling/component-docs/generate.mjs phone-number-field`.
The root inherits TextField's styles, states, ref and `asChild` behavior.

<!-- props:start -->

### PhoneNumberFieldProps

Inherited React Native and composed component props remain available.

| Prop          | Type                                               | Description                                                             |
| ------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| value         | `PhoneNumberValue \| undefined`                    |                                                                         |
| defaultValue  | `PhoneNumberValue \| undefined`                    |                                                                         |
| onValueChange | `((value: PhoneNumberValue) => void) \| undefined` |                                                                         |
| locale        | `string \| undefined`                              | Country names and their alphabetical order.                             |
| countries     | `readonly CountryCode[] \| undefined`              | Restrict the selectable countries. Defaults to all supported countries. |

### PhoneNumberFieldFieldProps

Inherited React Native and composed component props remain available.

### PhoneNumberFieldCountryProps

Inherited React Native and composed component props remain available.

### PhoneNumberFieldContentProps

Inherited React Native and composed component props remain available.

### PhoneNumberFieldSearchProps

Inherited React Native and composed component props remain available.

### PhoneNumberFieldCountryListProps

Inherited React Native and composed component props remain available.

| Prop          | Type                                                        | Description                                                         |
| ------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| renderCountry | `((country: PhoneCountryOption) => ReactNode) \| undefined` | Override a row's contents without replacing its selection behavior. |

<!-- props:end -->

## Slots

`Field` accepts TextField.Field props except the root-owned value and change handler.
`Country` accepts BottomSheet.Trigger props and belongs in FieldGroup.Prefix.
`Content`, `Overlay`, `Handle`, `Title` and `Close` reuse BottomSheet.
`Search` accepts TextField.Field props with its query owned by the phone root.
`CountryList` accepts FlatList props, including `ListEmptyComponent`, and an optional
`renderCountry` for row content. Labels, descriptions and errors reuse TextField slots.
Each styled node accepts its own style overrides; use `style` on the FlatList.

## Variants

The four TextField variants (`primary`, `secondary`, `tertiary`, `ghost`) and sizes
(`xs`, `sm`, `md`, `lg`) are inherited, including theme colors, focus and invalid states.

## Accessibility

The field is associated with its label and description. Give Country an action label in
your app's language; the calling code is exposed as its value. Selected country rows
announce their name, calling code and selected state. Label the search field and provide
an empty-state message. `isDisabled` prevents both editing and country selection.

## Migration from legacy

This is a new component. There is no legacy PhoneNumberField to deprecate.
