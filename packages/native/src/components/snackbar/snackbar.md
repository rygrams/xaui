# Snackbar

A temporary, controlled message inspired by the legacy Snackbar rather than by the v1
Toast queue. Several messages share a vertical anchor through `Snackbar.Stack`, so they
never overlap.

## Import

```tsx
import { Snackbar } from '@xaui/native/snackbar'
```

## Usage

```tsx
<Snackbar isVisible={isVisible} onVisibleChange={setVisible} duration={4000}>
  <Snackbar.Message>Enregistré.</Snackbar.Message>
  <Snackbar.Actions>
    <Snackbar.Action onPress={undo}>Annuler</Snackbar.Action>
    <Snackbar.Close asChild>
      <Button variant="tertiary">Fermer</Button>
    </Snackbar.Close>
  </Snackbar.Actions>
</Snackbar>
```

Several independently controlled messages go in one stack:

```tsx
<Snackbar.Stack position="bottom" spacing={8}>
  <Snackbar isVisible={saved}>Enregistré.</Snackbar>
  <Snackbar isVisible={offline} variant="warning">
    Connexion interrompue.
  </Snackbar>
</Snackbar.Stack>
```

## Anatomy

- `Snackbar` owns visibility and its timer, plus placement and portal when used alone.
- `Snackbar.Stack` owns one placement and portal for several snackbars, then lays them out
  vertically without overlap.
- `Snackbar.Message` is the announcement.
- `Snackbar.Actions` groups trailing controls.
- `Snackbar.Action` runs an action and dismisses by default.
- `Snackbar.ActionLabel` is the action text; raw action text is wrapped in it.
- `Snackbar.Close` only dismisses.

`duration={0}` keeps it visible. `position`, `insetHorizontal`, `insetVertical`, `maxWidth`
and `isPortalled` correspond to the legacy layout controls. The legacy `message`,
`actionLabel`, `showCloseAffordance` and `customAppearance` configuration props become
explicit slots and each slot accepts its own style props.

Inside `Snackbar.Stack`, each Snackbar keeps its own visibility, timer, content and actions;
the stack takes over placement, width and portalling. Its `position`, `spacing`,
`insetHorizontal`, `insetVertical`, `maxWidth` and `isPortalled` props control the shared
anchor. The last child stays closest to the selected edge: a bottom stack grows upward and
a top stack grows downward.

The root has the `alert` role and a polite live region. Entrance and exit run through
Reanimated.
