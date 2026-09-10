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

## A `Pager` has no height of its own

Give it one: `flex={1}` to fill a screen, `height={320}` inside a scroll view.

`flex: 1` in the recipe would have been the convenient default and it is a trap. React Native
expands it to a zero flex-basis, which **overrides an explicit `height`** — so
`<Pager height={240}>` would collapse to the height of its dots and the prop the caller
reached for would silently do nothing. It is the same reason there is no `fullWidth` on a
`Button`: RN's own behaviour is the answer, and the caller says which of the two they want.

The track keeps its `flex: 1` and takes whatever the root was given less the dots. Nothing
sizes it from outside, which is why it is safe there and not on the root.

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
what does. They name **the indicator's colour**, and every dot takes it:

- `primary` — the accent. The onboarding flow's answer.
- `secondary` — the page's own ink, for an indicator that has to read as chrome.
- `tertiary` — the raised ground, white on a light theme.

`ghost` is absent rather than forgotten. A dot with no fill is not a dot, which is why
`InputOTP` has no `ghost` either — a box that is not a box is not a box.

A pager over a **photograph** wants `color="#ffffff"` rather than `tertiary`: a photograph is
a photograph in both colour modes, and `surface` flips with the theme.

### One colour at two opacities, not two colours

The current dot is at full strength and the rest sit at 30%. `DOT_REST_OPACITY` is exported,
and the travel between the two is interpolated from the live scroll offset.

This is the correction of the component's first shape, and it is worth stating why rather than
just what. The dots started as a **pair** of tokens — the current one from the variant, the
rest from the neutral `default` fill, which is what `Carousel` does. A pair has to be chosen
to contrast with itself, and it cannot be: `tertiary` put `surface` against `default`, which
measures `#ffffff` on `#e4e4e7` in light and two near-identical greys in dark. The one variant
that exists for a pager over an image was the one whose indicator could not be read, in both
colour modes.

One colour at two opacities cannot collapse like that — whatever the variant, whichever the
colour mode, and for any raw `color` a caller invents. It is also what iOS's own page control
does. 30% rather than 50%: the dots are seven points across, and at half strength a small mark
reads as the current one seen through something rather than as a mark behind it.

A style prop is still not the way to recolour one dot: `<Pager.Dot backgroundColor="…" />`
lands after the recipe, so it paints that dot and leaves the opacity travel alone — which is
usually not what someone reaching for it meant. A caller who needs something the variants and
`color` do not offer composes their own dot against `usePager().offset`, which is what the
context publishes it for.

## The dot fades, it does not stretch

That is the difference from `Carousel.Dot`, and it is deliberate rather than a
simplification. A page control is a fixed row of marks saying how many screens there are and
which one you are on, and a mark that grows makes the row's arithmetic move under a reader
who is counting it. The carousel's pill is a _progress_ indicator over a series; this is a
position among screens.

It **follows the drag rather than the settle**: the opacity is interpolated from the live
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
