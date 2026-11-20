# Stepper

Where you are in a sequence of steps, drawn from what Metro has — bars and type: no
circle, no check, no connector line. Each step is a bar at its start edge, a Light
numeral and its words; the bars stand 2 apart and read as one line cut into steps.

## Import

```tsx
import { Stepper } from '@xaui/tram/stepper'
```

## Anatomy

```tsx
<Stepper>
  <Stepper.Item>
    <Stepper.Indicator />
    <Stepper.Content>
      <Stepper.Title />
      <Stepper.Description />
    </Stepper.Content>
  </Stepper.Item>
</Stepper>
```

- **`Stepper`** — the root. It numbers its items and hands each its status.
- **`Stepper.Item`** — one step: a row in a vertical stepper, so the bar runs the full
  height of its words; an equal share of the row in a horizontal one. Not pressable unless
  `asChild` merges it into a pressable child. A function child receives the step's
  `{ index, status, isFirst, isLast }`.
- **`Stepper.Indicator`** — the step's bar and its numeral. Children replace the numeral —
  an `Icon`, a letter — and the bar stays. In a horizontal stepper the bar is all there
  is.
- **`Stepper.Content`** — the step's words.
- **`Stepper.Title`** — the step's name. In progress it is a role larger, in the ink;
  ahead it is grey; done it keeps the ink.
- **`Stepper.Description`** — a grey line under the title.

## Usage

### Basic

```tsx
<Stepper value={2}>
  <Stepper.Item>
    <Stepper.Indicator />
    <Stepper.Content>
      <Stepper.Title>dates</Stepper.Title>
      <Stepper.Description>24 to 28 november</Stepper.Description>
    </Stepper.Content>
  </Stepper.Item>
  <Stepper.Item>
    <Stepper.Indicator />
    <Stepper.Content>
      <Stepper.Title>travellers</Stepper.Title>
    </Stepper.Content>
  </Stepper.Item>
</Stepper>
```

`value` is the step in progress, counted from one, and it is always the caller's: the
steps before it are `completed`, the ones after `upcoming`. Nothing moves on its own — a
stepper is a report.

### Horizontal

```tsx
<Stepper value={step} orientation="horizontal">
  {steps}
</Stepper>
```

The same bars lie end to end with a name under each; only the step in progress is in the
ink.

### Without the bars

```tsx
<Stepper hasConnector={false} value={2}>
  {steps}
</Stepper>
```

A step is then its numeral and its words.

### A step that takes you back

```tsx
<Stepper.Item asChild>
  <Pressable onPress={() => setStep(1)}>
    <Stepper.Indicator />
    <Stepper.Content>
      <Stepper.Title>dates</Stepper.Title>
    </Stepper.Content>
  </Pressable>
</Stepper.Item>
```

## Sizes

```tsx
<Stepper size="sm" value={2}>{steps}</Stepper>
<Stepper size="md" value={2}>{steps}</Stepper>
<Stepper size="lg" value={2}>{steps}</Stepper>
```

`size` sets the numeral — 24, 28 or 34 — and the title of the step in progress.

## Colour

The bars of the steps done are the theme's accent; the step in progress is the ink, and
the steps ahead the faint grey, their words grey too. `accent` picks another of the
twenty named accents; `color` takes a raw tint and wins when both are set.

```tsx
<Stepper accent="orange" value={3}>
  {steps}
</Stepper>
```

## Accessibility

- The root has the `progressbar` role, with `{ min: 1, max, now: value }` — the number of
  steps and the step in progress.
- Steps are not pressable by default; one made pressable through `asChild` takes the role
  and label of its child.
- Nothing animates, so there is nothing for reduced motion to change.

## Differences from Native

- **The drawing**: bars and a Light numeral, where Native draws a circle, a check and a
  connector line.
- **`Stepper.Indicator`** draws the bar and the numeral.
- **`hasConnector={false}`** leaves the bars undrawn.
- **`accent`** is added. **No `xs`** and **no `asChild` on the root**; `Stepper.Item`
  keeps its `asChild`.
- The value and the statuses are Native's (`stepStatus`).
