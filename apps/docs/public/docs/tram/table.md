# Table

Rows and columns drawn as the Metro settings page: no shell — no fill, line, corner or
shadow — just rows on the ground, with the column names in a grey `caption` and the sorted
one in the ink with a small chevron.

The rows are the `ListBox`'s settings rows: at least a control tall, with no separator
anywhere. A chosen row takes the accent's soft band under its ticked box.

## Import

```tsx
import { Table } from '@xaui/tram/table'
```

## Anatomy

```tsx
<Table>
  <Table.ScrollContainer>
    <Table.Content>
      <Table.Header>
        <Table.SelectAllCell />
        <Table.Column />
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.SelectionCell />
          <Table.Cell />
        </Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
  <Table.Footer />
</Table>
```

- **`Table`** — the root. It clips, does not move, and holds the selection and the sort.
- **`Table.ScrollContainer`** — a horizontal `ScrollView` with no bar. The header scrolls
  with the body.
- **`Table.Content`** — the header and the body, one above the other. It may be wider than
  the root: give it a `minWidth`.
- **`Table.Header`** — the row of column names.
- **`Table.Column`** — one column's name, and the press that sorts on it. It declares the
  width (`width`, or an equal share) that the cells below read by position.
- **`Table.Body`** — the rows. It takes `asChild`, so a long table can be a `FlatList`.
- **`Table.Row`** — one row. With a `selectionMode` and an `id`, pressing it chooses it.
- **`Table.Cell`** — one value. A text child is set in `body` on one line; anything else
  is rendered as it is.
- **`Table.SelectAllCell`** — the header's box, the Tram `Checkbox`: nothing, some or all.
  It renders nothing outside `selectionMode="multiple"`.
- **`Table.SelectionCell`** — the row's box. It reads its row, so it can be written
  anywhere in it.
- **`Table.Footer`** — a count, an action, a pager. Outside the scroller, so a wide table
  never carries it off.

## Usage

### Basic

```tsx
<Table>
  <Table.ScrollContainer>
    <Table.Content>
      <Table.Header>
        <Table.Column>device</Table.Column>
        <Table.Column width={72}>MB</Table.Column>
      </Table.Header>
      <Table.Body>
        {devices.map(device => (
          <Table.Row key={device.id}>
            <Table.Cell>{device.name}</Table.Cell>
            <Table.Cell>{device.size}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
```

### Selection

`selectionMode` is `none`, `single` or `multiple`; rows are named by their `id`. `single`
replaces and a second press clears; `multiple` toggles. `disabledKeys` lists rows that
cannot be chosen, and the header's box does not count them.

```tsx
<Table selectionMode="multiple" selectedKeys={keys} onSelectionChange={setKeys}>
  …
  <Table.Row id={device.id}>
    <Table.SelectionCell />
    <Table.Cell>{device.name}</Table.Cell>
  </Table.Row>
</Table>
```

### Sorting

**The table never reorders anything.** A sortable column (`allowsSorting`, with an `id`)
reports the press through `onSortChange`, and the caller sorts. A new column starts
ascending, the same column turns round, and a third press clears the sort.

```tsx
<Table sortDescriptor={sort} onSortChange={setSort}>
  …
  <Table.Column id="name" allowsSorting>
    device
  </Table.Column>
</Table>
```

### Many rows

```tsx
<Table.Body asChild>
  <FlatList
    data={devices}
    keyExtractor={device => device.id}
    renderItem={({ item }) => <Table.Row id={item.id}>…</Table.Row>}
  />
</Table.Body>
```

## Sizes

```tsx
<Table size="sm">…</Table>
<Table size="md">…</Table>
<Table size="lg">…</Table>
```

`size` sets the rows' least height (40, 48, 56), the header's, the type and the boxes.

## Colour

The chosen rows' soft band and the marks of their boxes are the theme's accent. `accent`
picks one of the twenty named accents; `color` takes a raw tint and wins when both are
set. The sort mark stays the ink.

## Accessibility

- `Table.Header` has the `header` role.
- A sortable column is a `button`, `selected` while the data is sorted on it; its press
  reaches 48 points tall.
- A pressable row is a `button` with `selected` and `disabled` in its state. A plain row
  announces itself as nothing.
- A choice or a sort is felt through `TramProvider`'s `onHaptic`, as a `selection`.
- A pressable row leans toward the finger, its colours unchanged; with motion reduced, or
  under `disable-all`, it does not lean.
- `isDisabled` dims the whole table once and stops every press.

## Differences from Native

- **No `variant`**: Native's two are shell fills, and a Metro table has no shell.
- **No `radius`**: with no shell there is no corner to round.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`accent`** is added: one of the twenty named accents.
- **No rules** under the header or between rows.
- **A chosen row** is the accent's soft slice rather than `defaultSoft`; the sort mark
  stays the ink.
