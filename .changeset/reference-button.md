---
'@xaui/native': patch
---

Add `Button` — the first v1 component, on `@xaui/native/button`.

```tsx
<Button onPress={submit}>Envoyer</Button>

<Button variant="danger" size="lg">
  <Button.Icon as={TrashIcon} />
  <Button.Label>Supprimer</Button.Label>
</Button>
```

Seven variants naming tokens and computing nothing — one emphasis ladder from the full
accent down to nothing, plus `danger` and its soft level — four sizes driving height and
never width, `color` as one raw tint that lands where the variant put its tokens, `isLoading`
inserting a spinner when none is composed, and `asChild` handing the press to someone
else's element. The view depth is one — `PressableFeedback > (Text | Icon)` — and a press
allocates no style: every combination of tokens is resolved once and cached for the
lifetime of the app.

Two fixes the component needed on the way:

- The build emitted classic `React.createElement` against a binding the sources never
  import, so **every component in the published package would have thrown on first
  render**. esbuild now uses the automatic JSX runtime.
- Every animated hook carries an explicit dependency array. Reanimated's Babel plugin
  infers one, but it runs in the consumer's build and does not reach a published `dist` on
  web, where the hook throws instead of animating.

`usePressState` now accepts `null` handlers, which is how `PressableProps` types them.
