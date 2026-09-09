# Snackbar

`Snackbar` is the v1 transient notification surface. Mount `SnackbarHost`, then call
`useSnackbar()` to add a queued message.

```tsx
<SnackbarHost>
  <Screen />
</SnackbarHost>
```

The surface is compound: `Snackbar.Title`, `Snackbar.Description`, `Snackbar.Actions` and
`Snackbar.Close`. It uses the same accessible queue, portal and UI-thread gestures as the
v1 Toast implementation.
