# Tabs

The tabs of Metro: a row of titles with no ground, no box and no rule — the chosen one in
the page's ink, the others in grey, fading from one to the other.

When the titles are wider than the page the row scrolls sideways, with no bar, and brings
the chosen tab into view. The panel leaving fades out, and the next comes in from its
tab's side.

## Import

```tsx
import { Tabs } from '@xaui/tram/tabs'
```

## Anatomy

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger>
      <Tabs.Label />
    </Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content />
</Tabs>
```

- **`Tabs`** — the root. It holds the value and the row's record: the order of the tabs,
  and where each one lies.
- **`Tabs.List`** — the row of titles, a `ScrollView`. `style` is the row's frame;
  `contentContainerStyle` is where the titles are padded.
- **`Tabs.Trigger`** — one tab, named by `value`. `children` may be a function of
  `isSelected`, `isPressed` and `isDisabled`.
- **`Tabs.Label`** — the title, on `subtitle`, `title` or `section` by size. Its colour is
  the whole of the chosen state on screen. The case is the app's.
- **`Tabs.Indicator`** — an extra: a rule under the chosen title. Nothing is drawn unless
  it is written inside `Tabs.List`.
- **`Tabs.Content`** — the panel for one `value`. Only the chosen tab's panel is rendered.

## Usage

### Basic

```tsx
<Tabs defaultValue="all">
  <Tabs.List>
    <Tabs.Trigger value="all">all</Tabs.Trigger>
    <Tabs.Trigger value="unread">unread</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="all">…</Tabs.Content>
  <Tabs.Content value="unread">…</Tabs.Content>
</Tabs>
```

### Controlled

```tsx
<Tabs value={tab} onValueChange={setTab}>
  …
</Tabs>
```

### With a rule

```tsx
<Tabs defaultValue="day" accent="cobalt">
  <Tabs.List>
    <Tabs.Trigger value="day">day</Tabs.Trigger>
    <Tabs.Trigger value="week">week</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
</Tabs>
```

The rule is a line of the theme's border width, as wide as the title, and moves from one
tab to the next on the `navigation` spring.

### Disabled tab

```tsx
<Tabs.Trigger value="archive" isDisabled>
  archive
</Tabs.Trigger>
```

A disabled tab is grey, dimmed, and cannot be chosen. `isDisabled` on the root greys the
whole row and stops every press.

### Cascading content

A panel's content is not moved by the tabs. One that wants its rows in cascade reads
`travel` and `towardEnd` from `useTabs()` and moves them itself.

## Sizes

```tsx
<Tabs size="sm">…</Tabs>
<Tabs size="md">…</Tabs>
<Tabs size="lg">…</Tabs>
```

`size` sets the titles' type — `subtitle`, `title`, `section` — and a tab's height: 40,
48, 56. Every tab is pressed like a control of 48.

## Colour

Without `Tabs.Indicator`, no accent shows anywhere in the tabs. With one, `accent` (one of
the twenty named accents) is the rule's colour, read as ink; `color` takes a raw tint,
wins over it and is never corrected. `radius` sets the rule's corner, within 2.

## Accessibility

- `Tabs.List` is a `tablist`, each trigger a `tab` with `selected` in its state and
  `aria-selected` and `aria-controls` on the web.
- `Tabs.Content` is a `tabpanel`, named by its tab through `aria-labelledby`.
- On the web the arrow keys go from tab to tab, past a disabled one, with one tab stop for
  the row.
- A press shrinks the title and leaves its colour alone. With motion reduced the title's
  fade and the panel swap are short; under `disable-all` everything is set, nothing moves.
- The indicator is hidden from screen readers.

## Differences from Native

- **No `variant`**: Native's three are three grounds for the row.
- **`accent`** is added.
- **No rule without `Tabs.Indicator`**. Written, it is under the chosen title, as wide as
  its label, in the accent read as ink; `accent`, `color` and `radius` touch nothing else.
- **`Tabs.List`** is a `ScrollView` (its ref and its props) where Native's is a `View`.
- **`Tabs.Content`** is a `tabpanel` named by its tab, and a trigger carries
  `aria-controls`.
- **A disabled tab** is grey and dimmed.
- **`useTabs`** exposes `travel` and `towardEnd` for a content that cascades by hand.
- Tabs are ordered as they mount: one added later in the middle counts as last.
