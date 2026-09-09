# Pager

Whole pages, one at a time — the onboarding flow, the full-screen feed, the gallery a reader
swipes through.

## Import

```tsx
import { Pager } from '@xaui/native/pager'
```

## Usage

```tsx
<Pager>
  <Pager.Content>
    <Pager.Page>
      <Welcome />
    </Pager.Page>
    <Pager.Page>
      <Permissions />
    </Pager.Page>
    <Pager.Page>
      <Done />
    </Pager.Page>
  </Pager.Content>

  <Pager.Indicator />
</Pager>
```

## A page is the track, measured

Not a prop, and not a fraction of one: a pager's page is the viewport it sits in, on both
axes. It is measured once and handed down, because a page given a size in points is a page
that is wrong on the next screen.

**The measurement is the track's, not the root's.** The indicator sits in the flow under the
pages, so the root is taller than the box a page has to fill by exactly the height of the
dots — a page sized to the root would overflow it by that much on every screen.

Nothing is drawn before the track has been measured. A page at zero size would flash at the
start of the run, and every page would be at the same place.

## Where this is not a `Carousel`

The two share the paging arithmetic — `indexFromOffset` and `progressFromOffset` in
`utils/carousel.ts` are the same functions — and nothing else, because the jobs differ at
three points that each change the implementation:

|               | `Pager`                                          | `Carousel`                                                   |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| A page's size | the whole track                                  | a **division** of it, by `itemsPerView`, `peek` and the gaps |
| The snap      | `pagingEnabled` — RN's own whole-viewport paging | `snapToInterval`, one slide plus its gap                     |
| The travel    | `scrollTo({ animated: true })`                   | a hand-run tween on `easeOutCubic`                           |
| The axis      | horizontal **or vertical**                       | horizontal                                                   |
| The controls  | dots                                             | arrows, dots, a counter, thumbnails, autoplay                |

The travel is the one worth stating plainly. The `Carousel` eases by hand because a slide's
move is short enough for the platform's near-linear curve to read as a jump cut. A page's
move is a whole viewport, which is the distance the platform's own pagers travel on that same
curve — so here it is the right answer rather than the one to work around.

## Both axes

`orientation="vertical"` is the full-screen feed; `horizontal`, the default, is the
onboarding flow. It is stated as the **axis** rather than a direction, so it needs no RTL
branch: a horizontal pager mirrors with its scroll view, which is React Native's own
behaviour. The dots follow — a vertical pager's indicator is a column.

## The pages are yours and the dots are the library's

`variant`, `color` and `size` reach the dots and nothing else. A pager of screens and a pager
of photographs want opposite things inside a page, and the caller is the one who knows which
this is.

Three variants, none of them an intent — a pager reports nothing, it is a way of arranging
what does. They name which colour the **current** dot takes:

- `primary` — the accent. The onboarding flow's answer.
- `secondary` — the neutral foreground, for a pager on a plain page.
- `tertiary` — the raised surface, which on a light theme is white: the pager over a
  photograph, where an accent dot disappears into whatever is behind it.

`ghost` is absent rather than forgotten. A dot with no fill is not a dot, which is why
`InputOTP` has no `ghost` either — a box that is not a box is not a box.

The dots behind the current one keep a **neutral** fill rather than a faint version of it: a
pale tint of the accent under the pages reads as a control that has half failed to load. A
raw `color` therefore reaches the current dot only, which is the one it should move. Over a
photograph, override the rest with a style prop — `<Pager.Dot backgroundColor="rgba(255,255,255,0.4)" />`.

## The dot changes colour, it does not stretch

That is the difference from `Carousel.Dot`, and it is deliberate rather than a
simplification. A page control is a fixed row of marks saying how many screens there are and
which one you are on, and a mark that grows makes the row's arithmetic move under a reader
who is counting it. The carousel's pill is a _progress_ indicator over a series; this is a
position among screens.

It **follows the drag rather than the settle**: the colour is interpolated from the live
scroll offset on the UI thread, so it travels while the finger is still down. Reading the
settled index instead would make it jump once per gesture, after the fact.

## The indicator sits in the flow

Under the pages. A caller who wants it over them says so, which is what the style props are
for:

```tsx
<Pager.Indicator position="absolute" bottom={16} start={0} end={0} />
```

Absolute by default would have made the common case the one that needs undoing.

## Driving it

`index` / `defaultIndex` / `onIndexChange`, controlled or not, as everywhere in the library.
The index changes as the track **crosses** the halfway point rather than when it stops:
`onMomentumScrollEnd` never fires for a wheel or a trackpad, so on the web the index would
never move at all, and it lands after the fact, so a "Next" button would sit on the previous
page for the length of the deceleration.

`usePager()` publishes `goTo`, the settled `index`, the `count` the track counted itself, and
the live `offset` as a **shared value** — an indicator of your own that follows the drag frame
by frame is `useAnimatedStyle` over it, and it costs no re-render:

```tsx
function Skip() {
  const { goTo, count } = usePager()

  return <Button onPress={() => goTo(count - 1)}>Passer</Button>
}
```

The count comes from the track counting its own children, so it cannot go stale the way a
number passed in beside them would.

## Accessibility

Each dot is a `button` whose `accessibilityValue` reads "3 of 5" — a dot has no text of its
own, and inventing one would be picking a language on behalf of every app that installs this.

The root carries no role. The track is the control and it announces itself; a role on the box
that holds it would have a screen reader describe a second thing.

## See also

- **`Carousel`** — a series of slides with arrows, a counter and thumbnails, where this is
  whole screens with dots.
