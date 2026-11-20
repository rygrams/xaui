# PhoneNumberField

A national phone number beside its country, with a searchable list of countries — drawn in
Metro as the Tram `TextField`'s box with the country as a key at its start (its ISO code,
its calling code and a small chevron, ruled off from the number), and the countries in the
Tram `BottomSheet`, a band in the theme's contrast.

It is a `TextField`: the root is the Tram `TextField`'s, and `Label`, `Description` and
`Error` are its slots. The value, the pasting of an international number, the formatting on
blur and the E.164 read are Native's own helpers.

`libphonenumber-js` is an optional peer, and this component needs it. It is imported from
its subpath only, never from the package root.

## Import

```tsx
import { FieldGroup } from '@xaui/tram/field-group'
import { PhoneNumberField, usePhoneNumberField } from '@xaui/tram/phone-number-field'
```

## Anatomy

```tsx
<PhoneNumberField>
  <PhoneNumberField.Label />
  <FieldGroup>
    <FieldGroup.Prefix>
      <PhoneNumberField.Country />
    </FieldGroup.Prefix>
    <PhoneNumberField.Field />
  </FieldGroup>
  <PhoneNumberField.Description />
  <PhoneNumberField.Error />
  <PhoneNumberField.Overlay />
  <PhoneNumberField.Content>
    <PhoneNumberField.Title />
    <PhoneNumberField.Close />
    <PhoneNumberField.Search />
    <PhoneNumberField.CountryList />
  </PhoneNumberField.Content>
</PhoneNumberField>
```

- **`PhoneNumberField`** — the root, the Tram `TextField`'s, plus the number and its country.
- **`PhoneNumberField.Label`** / **`.Description`** / **`.Error`** — the `TextField`'s slots.
- **`PhoneNumberField.Country`** — the key that opens the list: the ISO code in `caption`,
  the calling code in the field's type in tabular figures, and a chevron. It is
  `BottomSheet.Trigger` and goes in `FieldGroup.Prefix`; children replace the drawing.
- **`PhoneNumberField.Field`** — the input for the national number.
- **`PhoneNumberField.Overlay`** — the dimmed ground behind the list, `BottomSheet.Overlay`.
- **`PhoneNumberField.Content`** — the band, `BottomSheet.Content` itself.
- **`PhoneNumberField.Title`** / **`.Close`** — the band's title and its cross.
- **`PhoneNumberField.Search`** — the Tram `SearchField`'s field. The query is the root's.
- **`PhoneNumberField.CountryList`** — a `FlatList` of rows of 48: the ISO code, the name and
  the calling code, the current one in the accent. `renderCountry` replaces a row's
  contents and keeps its selection.

## Usage

### Basic

```tsx
<PhoneNumberField locale="fr" defaultValue={{ country: 'FR', nationalNumber: '' }}>
  <PhoneNumberField.Label>phone</PhoneNumberField.Label>
  <FieldGroup>
    <FieldGroup.Prefix>
      <PhoneNumberField.Country accessibilityLabel="Choose country" />
    </FieldGroup.Prefix>
    <PhoneNumberField.Field placeholder="06 12 34 56 78" />
  </FieldGroup>
  <PhoneNumberField.Overlay />
  <PhoneNumberField.Content>
    <PhoneNumberField.Title>choose a country</PhoneNumberField.Title>
    <PhoneNumberField.Close accessibilityLabel="Close" />
    <PhoneNumberField.Search
      accessibilityLabel="Search country"
      placeholder="country"
    />
    <PhoneNumberField.CountryList />
  </PhoneNumberField.Content>
</PhoneNumberField>
```

### The value

The value is `{ country: 'FR', nationalNumber: '0612345678' }`; `value` and `onValueChange`
make the field controlled. Changing country keeps the national text. Pasting a complete
international number selects its country, when `countries` allows it. Formatting runs on
blur, so deleting does not fight the inserted spaces.

```tsx
function E164() {
  const { phoneNumber } = usePhoneNumberField()
  return (
    <PhoneNumberField.Description>{phoneNumber ?? '—'}</PhoneNumberField.Description>
  )
}
```

`usePhoneNumberField().phoneNumber` is the number in E.164 when it is possible — a length
check, not proof that it is assigned — and `null` otherwise.

### Countries and locale

`countries` restricts the list; the initial country must belong to it. `locale` (`en` by
default) gives the countries' names and their alphabetical order. The search matches a
name, an ISO code or a calling code.

## Sizes

```tsx
<PhoneNumberField size="sm">…</PhoneNumberField>
<PhoneNumberField size="md">…</PhoneNumberField>
<PhoneNumberField size="lg">…</PhoneNumberField>
```

`size` is the `TextField`'s: the box's height — 40, 48 or 56 — its padding and its type.

## Colour

The line turns to the theme's accent, read as ink, once the field has the focus; the current
country in the list is drawn in the accent. `accent` picks one of the twenty named Metro
accents; `color` takes a raw tint and wins when both are set. `isInvalid` draws the line in
the danger colour.

## Accessibility

- `PhoneNumberField.Country` is a `button` whose value is the country and its calling code.
  Give it an `accessibilityLabel` in your app's language.
- A country row is a `button` labelled with its name and calling code, and announced as
  `selected` when it is the current one. Choosing one is felt as a `selection`.
- `PhoneNumberField.Search` has no label above it: give it an `accessibilityLabel`.
- `isDisabled` stops both the typing and the choice of country.

## Differences from Native

- **No `Handle`**: the Tram `BottomSheet` has none.
- **The country** shows its ISO code where Native draws a flag.
- **No `variant`**; **`accent`** is added.
- **`Content`** is `BottomSheet.Content` itself; **`Search`** is the `SearchField`'s field.
- **The rows** are Tram rows, not `Button`s with a check mark.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
