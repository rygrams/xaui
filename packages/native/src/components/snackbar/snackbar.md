# Snackbar

A temporary, controlled message inspired by the legacy Snackbar rather than by the v1
Toast queue.

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

## Anatomy

- `Snackbar` owns visibility, the timer, placement and portal.
- `Snackbar.Message` is the announcement.
- `Snackbar.Actions` groups trailing controls.
- `Snackbar.Action` runs an action and dismisses by default.
- `Snackbar.ActionLabel` is the action text; raw action text is wrapped in it.
- `Snackbar.Close` only dismisses.

`duration={0}` keeps it visible. `position`, `insetHorizontal`, `insetVertical`, `maxWidth`
and `isPortalled` correspond to the legacy layout controls. The legacy `message`,
`actionLabel`, `showCloseAffordance` and `customAppearance` configuration props become
explicit slots and each slot accepts its own style props.

The root has the `alert` role and a polite live region. Entrance and exit run through
Reanimated.
