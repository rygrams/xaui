/**
 * `Row`, `Column`, `Stack` and `Grid` — Native's layout, the same module.
 *
 * The one place Tram re-exports Native rather than drawing its own (T4.52, decided on
 * the mockup): these four carry no token — no colour, no type, no corner, no motion —
 * only React Native's own style keys as props (R14), so a Tram copy would be Native's
 * code under another name. The subpath exists so an app imports its whole screen from
 * `@xaui/tram` instead of mixing in `@xaui/native` for the layout.
 */
export { Column, Grid, Row, Stack, useGrid } from '@xaui/native/view'
export type {
  AxisProps,
  ColumnProps,
  GridContextValue,
  GridItemProps,
  GridProps,
  RowProps,
  StackItemProps,
  StackProps,
} from '@xaui/native/view'
