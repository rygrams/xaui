# Table

Rows and columns, with a shell round them.

## Import

```tsx
import { Table } from '@xaui/native/table'
```

## Usage

```tsx
<Table selectionMode="multiple" selectedKeys={keys} onSelectionChange={setKeys}>
  <Table.ScrollContainer>
    <Table.Content minWidth={520}>
      <Table.Header>
        <Table.SelectAllCell />
        <Table.Column id="name" allowsSorting>
          Nom
        </Table.Column>
        <Table.Column id="role" width={140}>
          Rôle
        </Table.Column>
      </Table.Header>

      <Table.Body>
        {people.map(person => (
          <Table.Row key={person.id} id={person.id}>
            <Table.SelectionCell />
            <Table.Cell>{person.name}</Table.Cell>
            <Table.Cell>{person.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>

  <Table.Footer>…</Table.Footer>
</Table>
```

## Three nodes, and each earns its place

- **`Table`** is the shell: the fill, the border, the corner, the shadow. It clips, and it
  does not move.
- **`Table.ScrollContainer`** is the horizontal scroller.
- **`Table.Content`** is the column inside it, and the node that is allowed to be **wider
  than the shell**.

Folding them together is what makes a wide table either clip its own rows or drag its border
across the screen. The header is inside the scroller with the body, because a header that
stayed put while its cells moved sideways would be a header naming the wrong values.

`Table.Footer` is **outside** the scroller: a pager that slid off with a wide table would be
a pager nobody could reach.

## Widths are declared by the column and read by position

`Table.Column` registers its `width` at its index; `Table.Cell` reads the width at its own.
Neither names the other, and a table stays aligned because both run the same two lines
against the same number:

```
width === undefined ? { flex: 1 } : { width }
```

A column with no width takes an equal share of what is left. `Table.Content`'s `minWidth` is
what stops flexible columns squeezing below a legible width on a narrow phone.

The space between columns is the row's **`gap`**, not a padding on the cell — a padding would
double at the table's two edges, and none at all lets a name and a role run together the
moment a flexible column shrinks to its content.

## The table never reorders anything

Sorting reports the press and the caller sorts their own collection:

```tsx
const sorted = useMemo(() => {
  if (sort === undefined) return people
  const way = sort.direction === 'ascending' ? 1 : -1
  return [...people].sort((a, b) => String(a[sort.column]).localeCompare(…) * way)
}, [people, sort])
```

A table that sorted for you would have to understand every cell's value, and the only thing
that does is the code that built the row.

**Three presses, not two.** A new column starts ascending, the same column turns round, and a
descending column pressed again **clears the sort** — every table that cannot get back to its
own order makes a reader reload the screen to do it.

## Selection

`selectionMode` is `none`, `single` or `multiple`; rows are named by their `id` and reported
as an array of keys.

- **`single` replaces, and pressing the chosen row again clears it.** A single-selection list
  with no way back to none is a list a reader can only get wrong once.
- **The header's box has three states** — nothing, some, all. One that only knew the first two
  would tell a reader who has chosen four of twenty rows that they have chosen none.
- **It counts only rows that can be chosen**, so a table with a disabled row still has a box
  that can be filled.
- **It keeps keys chosen outside this table.** One page of a filtered list must not clear a
  choice made on another.

`Table.SelectionCell` reads its _row_ rather than its position, so it works wherever in the
row it is written — a table whose boxes are on the trailing edge is the same JSX with the slot
written last. Pressing the row does the same thing, deliberately: a box the size of a
fingertip inside a row the size of a hand should not be the only way to choose one.

## There is no `virtualized` prop

A table of ten thousand rows is a `FlatList`, and `Table.Body` takes `asChild` so it **is**
one:

```tsx
<Table.Body asChild>
  <FlatList
    data={people}
    keyExtractor={person => person.id}
    renderItem={({ item }) => <Table.Row id={item.id}>…</Table.Row>}
  />
</Table.Body>
```

A prop would have meant this component owning a `data` and a `renderItem` — the shape the
whole v1 API was written to get away from — and owning them badly, since a virtualized list
has a dozen props a table would then forward one by one.

## Variants

`primary` is a raised card, for a table among other things on a page. `secondary` is flat —
the page's own ground with a filled header band — for a table that _is_ the screen.

No `success` or `danger`: a table reports what is in it, and the intent belongs to a `Chip` in
a cell rather than to the shell round all of them.

### The tint does not touch the shell

`color` lands on a chosen row and on the sort mark. It is kept off the root **explicitly**,
because `bg` names `surface` — a bare token — and `resolveTint` would map it to the tint like
any other, turning a blue app's table entirely blue. A tint on a container means the thing it
_marks_, not the ground everything sits on.

## Size

`size` moves the row's height, the cell's inset and the type. The height is **fixed**: a value
too long is truncated rather than deforming the table.

## See also

- **`List`** — for rows that are not a grid.
- **`Chip`** — what a status cell usually holds.
