# Autocomplete

A field that opens a list you search.

## Import

```tsx
import { Autocomplete } from '@xaui/native/autocomplete'
```

## Usage

```tsx
<Autocomplete onValueChange={setState}>
  <Autocomplete.Label>État</Autocomplete.Label>
  <Autocomplete.Trigger>
    <Autocomplete.Value placeholder="Choisir un état" />
    <Autocomplete.Indicator />
  </Autocomplete.Trigger>
  <Autocomplete.Overlay />
  <Autocomplete.Content>
    <Autocomplete.Search placeholder="Rechercher…" />
    <Autocomplete.Item value="ca">Californie</Autocomplete.Item>
    <Autocomplete.Item value="tx">Texas</Autocomplete.Item>
    <Autocomplete.Empty>Aucun résultat</Autocomplete.Empty>
  </Autocomplete.Content>
  <Autocomplete.Description>
    Cinquante États, une seule ligne.
  </Autocomplete.Description>
</Autocomplete>
```

## Anatomy

| slot                       | what it is                                 |
| -------------------------- | ------------------------------------------ |
| `Autocomplete`             | The column, and the resolved style         |
| `Autocomplete.Label`       | What the field is for                      |
| `Autocomplete.Trigger`     | The control — a `combobox`                 |
| `Autocomplete.Value`       | The chosen row's label, or the placeholder |
| `Autocomplete.Indicator`   | The chevron, turning with the panel        |
| `Autocomplete.Overlay`     | The backdrop. Optional                     |
| `Autocomplete.Content`     | The panel                                  |
| `Autocomplete.Search`      | The field you type in                      |
| `Autocomplete.Item`        | One result                                 |
| `Autocomplete.Empty`       | What the panel says when nothing matches   |
| `Autocomplete.Description` | The hint under the field                   |
| `Autocomplete.Error`       | What is wrong with the choice              |

## The root is the column, not the field

A `View` that stacks `Autocomplete.Label`, the trigger and `Autocomplete.Description` /
`.Error` with one `gap`, so JSX order is screen order. It is the column and the help lines
that make this a field on a form rather than a button that opens a list — and they are the
`TextField`'s, token for token, so a text field and an autocomplete on the same form read as
one control. The `DatePicker` borrows the same three slots for the same reason.

`isInvalid` paints the trigger's border and turns the label and the description `danger`; it
never mounts or unmounts `Autocomplete.Error`. A slot that silently renders nothing is one
you cannot debug, so you write the condition yourself:

```tsx
<Autocomplete isInvalid={Boolean(error)}>
  <Autocomplete.Label>État</Autocomplete.Label>
  <Autocomplete.Trigger>
    <Autocomplete.Value placeholder="Choisir un état" />
    <Autocomplete.Indicator />
  </Autocomplete.Trigger>
  …{error ? <Autocomplete.Error>{error}</Autocomplete.Error> : null}
</Autocomplete>
```

`Autocomplete.Trigger` stays the field: it keeps its own `ref` — it is the node the panel
measures — and its own a11y props. `Autocomplete.Overlay` and `Autocomplete.Content` portal
out, so they add nothing to the column.

## It is not a `Select`

A select is for a list you **read**: a dozen options, all of them visible, and choosing is
recognising one. An autocomplete is for a list you **cannot** read — fifty states, four
thousand cities — where choosing is _finding_, and the field you type in is the control
rather than an extra row in a menu.

Same trigger, same panel, same rows; a different thing to do with them. So the two share
their style **by construction**: the trigger, the panel and the rows resolve through
`selectRecipe`, and only the search box and the empty line are this component's own. A
second table would be two to keep in step, and the drift would show as a select and an
autocomplete side by side in a form with fields half a shade apart.

The rows are plainer than a select's for the same reason. No description, no check: a check
beside the row already chosen is of no use in a list you reached by searching for something
else.

## The search is the control

`Autocomplete.Search` lives **inside** `Autocomplete.Content`, and the panel pins it above
its scroller so it stays put while the results move under it. It takes focus as the panel
opens — an autocomplete you have to tap twice before you can type into it is a select with
a spare row — and `autoFocus={false}` turns that off for a panel short enough that the
keyboard would cover it.

**The query goes with the panel.** Closing clears it, because a search that survived its own
closing would mean the list is already filtered the next time it opens, by a word nobody can
see. `query` / `defaultQuery` / `onQueryChange` if you would rather own it.

### What matching means

`geneve` finds **Genève**, and `genève` finds **Geneve** — diacritics are folded and case is
dropped, both ways.

`york` finds **New York**: it matches any word rather than the first, because a long list is
searched by whichever word someone remembers, not by the one that happens to come first.

An empty query keeps everything, which is what makes the field's resting state the whole
list rather than none of it.

## Filtering is by row, and only the rows it can see

`Autocomplete.Content` drops the rows that do not survive the query. It reads them the way
`Autocomplete.Value` reads the chosen label — off the **elements**, before any of them
mounts — but only its **direct** children.

Walking deeper to _read_ a label changes nothing; dropping a row nested inside a component
of your own would mean rebuilding that component's children for it, and a filter that
silently rewrote your tree is worse than one that leaves it alone. A row wrapped in
something of yours is a row the search will not hide.

A row with no readable label is never hidden either — hiding it would make a custom row
disappear the moment anyone typed.

## `Autocomplete.Empty` renders instead of the results

And only when nothing matched. A panel that filtered its last row away and showed an empty
box reads as a control that has broken rather than as a search that found nothing.

## Props

| prop            | type                                                | default   | description                 |
| --------------- | --------------------------------------------------- | --------- | --------------------------- |
| `variant`       | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | `primary` | The field's four levels     |
| `size`          | `'sm' \| 'md' \| 'lg'`                              | `md`      | The control's scale         |
| `radius`        | `RadiusKey`                                         | —         | Overrides the corner        |
| `color`         | `string`                                            | —         | The tint (R7) — a raw value |
| `value`         | `string`                                            | —         | Controlled selection        |
| `defaultValue`  | `string`                                            | —         | Uncontrolled                |
| `onValueChange` | `(value: string) => void`                           | —         | Fires on every choice       |
| `isOpen`        | `boolean`                                           | —         | Controlled open state       |
| `defaultOpen`   | `boolean`                                           | `false`   | Uncontrolled                |
| `onOpenChange`  | `(isOpen: boolean) => void`                         | —         | Fires on open and close     |
| `query`         | `string`                                            | —         | Controlled query            |
| `defaultQuery`  | `string`                                            | `''`      | Uncontrolled                |
| `onQueryChange` | `(query: string) => void`                           | —         | Fires on every keystroke    |
| `isDisabled`    | `boolean`                                           | `false`   | Stops the control           |
| `isInvalid`     | `boolean`                                           | `false`   | The field's error state     |

`size` is the **control's** scale and the panel is not the control: a `lg` trigger opening
`lg` rows is a menu that fills the screen. Only the type in the search box follows, so what
you type reads at the size of what you will pick.

`ref`, `style` and R14's style props on the root dress the **column**. The control is
`Autocomplete.Trigger`, which takes its own — including `testID` and the a11y props, since
it is the node a screen reader stops on.

## Accessibility

The trigger is a **`combobox`** rather than a button — the control opens a list you type
into, and that is the role that says so. It carries `expanded` and, when `isInvalid`,
`aria-invalid`. The search field is a `search`. Both stay overridable (R9).

The trigger points at `Autocomplete.Label` and `Autocomplete.Description` through
`aria-labelledby` and `aria-describedby`, which is what makes a screen reader announce "État,
liste déroulante" rather than reading the chosen row and leaving the question unsaid. The
ids come from the root, so mounting the two slots is all it takes; your own
`aria-labelledby` on the trigger still wins.

The overlay announces nothing: it is the absence of the panel, and a screen reader saying
"button" over the whole screen is worse than saying nothing.
