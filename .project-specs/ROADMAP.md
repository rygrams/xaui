# XAUI roadmap status

One line per task: ref, title, status. No commentary — update the status when a task lands.
Task detail lives in `XAUI-V1-PLAN.md`.

Status is `done` or `todo`, plus `ci`: everything in the repository is done and the
remaining action belongs to a workflow rather than to a commit. A task can also be
`dropped` — decided against rather than deferred, and kept on the list so the decision is
recorded rather than rediscovered.

`P*` refs follow the phases of the plan. `D*` refs are repository debt — they belong to no
phase and block nothing, but each one is a place where the repo lies about itself.

## Phases

| Ref    | Task                                                                              | Status  |
| ------ | --------------------------------------------------------------------------------- | ------- |
| P0.1   | Split into `@xaui/native-legacy` and scaffold v1                                  | done    |
| P0.2   | Single token source and generator                                                 | done    |
| P0.3   | OKLab colour engine                                                               | done    |
| P0.4   | Derived colour layer                                                              | done    |
| P0.5   | Contrast guard in CI                                                              | done    |
| P0.6   | `createTheme`                                                                     | done    |
| P0.7   | `XAUIProvider`                                                                    | done    |
| P0.8   | Legacy `core-shim.ts`                                                             | done    |
| P0.9   | Package hygiene and optional peers                                                | done    |
| P0.10  | ESLint rule for R13                                                               | done    |
| P0.11  | Publish `@xaui/native-legacy@0.2.11` and the codemod                              | done    |
| P0.12  | Delete `@xaui/core` and `@xaui/icons`                                             | done    |
| P0.13  | Publish `native` and `hybrid` on the `alpha` tag                                  | done    |
| P1.1   | `system/recipe/` — engine, cache, tint                                            | done    |
| P1.2   | `system/slot/` — context, `childrenToString`, merges                              | done    |
| P1.3   | `system/pressable-feedback/`                                                      | done    |
| P1.4   | `system/portal/`                                                                  | done    |
| P1.5   | `system/icon/`                                                                    | done    |
| P1.6   | Shared hooks                                                                      | done    |
| P1.7   | `pnpm pack` uniqueness check on both packages                                     | done    |
| P2     | The reference component and the API review                                        | done    |
| P2.1   | The reference `Button`                                                            | done    |
| P2.2   | Perf baseline — 200 buttons, re-renders and allocations                           | done    |
| P2.3   | API review — blocking, nothing starts in P3 before it                             | done    |
| P2.4   | Publish `@xaui/native` on the `alpha` tag                                         | ci      |
| P2.5   | Fix the ripple — it renders nothing (P2-API-REVIEW §D)                            | done    |
| P2.5b  | `PressableFeedback` composes its overlays — no `feedbackVariant`                  | done    |
| P2.6   | Style as props (R14) — `system/style-props/`, then the `Button`                   | done    |
| P2.7   | `*Pressed` moves one way — towards the mode ink (P2-API-REVIEW §E)                | done    |
| P2.7b  | `asChild` reached `Slot` as an array — every pressable threw                      | done    |
| P2.7c  | Light `default` reads as grey, not as near-white                                  | done    |
| P2.7d  | `warning` moves from `amber` to `orange` — the dark one read as gold              | done    |
| P3     | The fifteen-component core                                                        | done    |
| P3.1   | `Typography` + `TextSpan` — ten roles, HeroUI's values                            | done    |
| P3.2   | `Icon` — R14's boundary in the type, plus its demo screen                         | done    |
| P3.3   | `view/` — `Row`, `Column`, `Stack`, `Grid`; the rest dropped                      | done    |
| P3.4   | `Card` — Header · Body · Title · Description · Footer                             | done    |
| P3.5   | `Chip` — Label · Icon · Dot · Avatar · Close                                      | done    |
| P3.6   | `Alert` — Icon · Content · Title · Description · Close                            | done    |
| P3.7   | `Input` — Label · Field · Description · Error                                     | done    |
| P3.7b  | Rename `Input` → `TextField` — component, `./text-field` subpath, demo            | done    |
| P3.8   | `Checkbox` — Indicator · Label                                                    | done    |
| P3.9   | `Radio` — Indicator · Label, the `Checkbox` in a circle                           | done    |
| P3.10  | `Switch` — Track · Thumb · Label, two shapes                                      | done    |
| P3.11  | `Avatar` — Image · Fallback · Initials, the fallback as a layer                   | done    |
| P3.12  | `Badge` — a count, a dot, and the corner it hangs off                             | done    |
| P3.13  | `Divider` — three separator levels; keeps its name, not HeroUI's `Separator`      | done    |
| P3.14  | `Skeleton` — one fill, one pulse, sized by R14 alone                              | done    |
| P3.14b | `Skeleton` drops its `variant` — the second fill was the less visible             | done    |
| P3.15  | `Spinner` — seven inks, two rings, no SVG; supersedes legacy `Indicator`          | done    |
| P4     | Docs, generated tables, `1.0.0`                                                   | todo    |
| P4.1   | Live previews — alias `react-native` → `react-native-web` in Next.js              | todo    |
| P4.2   | Prop tables generated from the TS types                                           | todo    |
| P4.3   | The fifteen pages, on the structure of plan §6                                    | todo    |
| P4.4   | Migration guide legacy → v1, with the table of plan §7                            | todo    |
| P4.5   | Regenerate `llms.txt`, unpublish `@xaui/mcp` and `@xaui/icons`                    | todo    |
| P4.6   | Publish `@xaui/native@1.0.0` — needs `changeset pre exit` first                   | todo    |
| P5     | The remaining components, shipped under `1.x`                                     | todo    |
| P5.1   | `InputOTP` — Group · Box · Value · Placeholder · Caret · Separator                | done    |
| P5.2   | `TextArea` — Label · Field · Description · Error, over the `Input`                | done    |
| P5.3   | `InputGroup` — Prefix · Field · Suffix · Icon, inside the `Input`                 | done    |
| P5.3b  | Rename `InputGroup` → `FieldGroup`, following `TextField`                         | done    |
| P5.3c  | `NumberInput` — over legacy `NumberInput`, inside `input/`                        | todo    |
| P5.3d  | `NumberPad` — net new, the keypad `NumberInput` and `InputOTP` share              | todo    |
| P5.3e  | `NumberStepper` — net new, the increment pair legacy `Stepper` is not             | todo    |
| P5.3f  | `PhoneNumberInput` — net new, country prefix over the `TextField`                 | todo    |
| P5.3g  | `SearchInput` — net new, a `TextField` with its clear and submit                  | todo    |
| P5.4   | `Select` — Trigger · Value · Indicator · Overlay · Content · Item                 | done    |
| P5.5   | `Stepper` — slots over the existing group context                                 | done    |
| P5.6   | `Toolbar` — slots over the existing group context                                 | dropped |
| P5.7   | `List` — slots over the existing group context                                    | todo    |
| P5.7b  | `ListGroup` — net new, sectioned `List` with its headers                          | todo    |
| P5.8   | `Menu` — Trigger · Overlay · Content · Label · Group · Item                       | done    |
| P5.9   | `SegmentButton` — slots over the existing group context                           | todo    |
| P5.10  | `Autocomplete` — slots over the existing group context                            | todo    |
| P5.10b | `Combobox` — the `Autocomplete` over a closed list                                | todo    |
| P5.11  | `Accordion` — Item · Trigger · Indicator · Content, over legacy `ExpansionPanel`  | done    |
| P5.12  | `BottomTabBar` — slots over the existing group context                            | dropped |
| P5.13  | `Menubox` — slots over the existing group context                                 | dropped |
| P5.14  | `Progress` — circular, the determinate half of legacy `Indicator`                 | todo    |
| P5.14b | `ProgressBar` — linear, over legacy `LinearProgressIndicator`                     | todo    |
| P5.15  | `Slider` — Output · Track · Fill · Thumb                                          | done    |
| P5.16  | `Tabs` — List · Trigger · Label · Indicator · Content                             | done    |
| P5.17  | `AppBar`                                                                          | todo    |
| P5.18  | `Snackbar` — closed by P5.18b `Toast`, the same object renamed                    | done    |
| P5.18b | `Toast` — Title · Description · Actions · Close, plus `ToastHost`                 | done    |
| P5.19  | `Snippet`                                                                         | todo    |
| P5.20  | `Fab`                                                                             | todo    |
| P5.21  | `FabMenu`                                                                         | todo    |
| P5.22  | `Dialog` — Trigger · Overlay · Content · Title · Description · Close              | done    |
| P5.23  | `BottomSheet` — Trigger · Overlay · Content · Handle · Title                      | done    |
| P5.23b | `BottomSheetInput` — net new, a `TextField` that opens in a `BottomSheet`         | todo    |
| P5.23c | `BottomSheet` reduced state — `collapsedHeight`, a two-state disclosure           | done    |
| P5.24  | `Drawer`                                                                          | todo    |
| P5.24b | `Popover` — Trigger · Overlay · Content · Title · Description · Close             | done    |
| P5.25  | `Picker`                                                                          | todo    |
| P5.25b | `WheelPicker` — net new, the spinning column the three below share                | todo    |
| P5.25c | `WheelDatePicker` — net new, `WheelPicker` columns for a date                     | todo    |
| P5.25d | `WheelTimePicker` — net new, `WheelPicker` columns for a time                     | todo    |
| P5.25e | `WheelDateTimePicker` — net new, the two above as one                             | todo    |
| P5.26  | `DatePicker`                                                                      | todo    |
| P5.26b | `Calendar` — net new, no legacy equivalent                                        | done    |
| P5.26c | `AgendaCalendar` — net new, the `Calendar` with its events                        | todo    |
| P5.26d | `DateField` — over legacy `DateInput`, following the `Input` → `TextField` rename | done    |
| P5.26h | `TimeField` — the same mask for a time, over legacy `TimeInput`                   | done    |
| P5.26i | `DateTimeField` — the two masks in one box, over legacy `DateTimeInput`           | done    |
| P5.26e | `DateRangePicker` — net new, two bounds over the `DatePicker`                     | todo    |
| P5.26f | `DateTimePicker` — net new, `DatePicker` and `TimePicker` as one                  | todo    |
| P5.26g | `RangeCalendar` — net new, the `Calendar` behind `DateRangePicker`                | todo    |
| P5.27  | `TimePicker`                                                                      | todo    |
| P5.28  | `ColorPicker`                                                                     | todo    |
| P5.29  | `Carousel`                                                                        | todo    |
| P5.30  | `Pager`                                                                           | todo    |
| P5.31  | `RefreshControl`                                                                  | todo    |
| P5.32  | `InputTrigger`                                                                    | todo    |
| P5.33  | `FeatureDiscovery`                                                                | todo    |
| P5.34  | `BarChart` — over legacy `VerticalBarChartCard`                                   | todo    |
| P5.34b | `AreaChart` — net new, no legacy equivalent                                       | todo    |
| P5.34c | `Chart` — Donut and Heatmap, the legacy cards left over                           | todo    |
| P5.34d | `ComposedChart` — net new, several series on shared axes                          | todo    |
| P5.34e | `LineChart` — over legacy `LineChartCard`                                         | todo    |
| P5.34f | `PieChart` — over legacy `PieChartCard`                                           | todo    |
| P5.34g | `RadarChart` — net new, no legacy equivalent                                      | todo    |
| P5.34h | `RadialChart` — net new, no legacy equivalent                                     | todo    |
| P5.35  | `CloseButton` — net new, the dismiss affordance Chip and Alert inline today       | todo    |
| P5.35b | `LinkButton` — net new, a `Button` that reads as a link                           | todo    |
| P5.35c | `MorphButton` — net new, a `Button` that animates between states                  | todo    |
| P5.35d | `SlideButton` — net new, slide-to-confirm over the `Slider`                       | todo    |
| P5.35e | `SocialAuthButton` — net new, provider marks over the `Button`                    | todo    |
| P5.35f | `ToggleButton` — net new, a `Button` that holds a pressed state                   | todo    |
| P5.35g | `ToggleButtonGroup` — net new, exclusive selection over `ToggleButton`            | todo    |
| P5.36  | `EmptyState` — net new, no legacy equivalent                                      | todo    |
| P5.37  | `FlipCard` — net new, a `Card` with two faces                                     | todo    |
| P5.38  | `RadioGroup` — over legacy `RadioGroup`, the context P3.9 `Radio` lacks           | todo    |
| P5.38b | `RadioButton` — net new, to reconcile with P3.9 `Radio`                           | todo    |
| P5.38c | `RadioButtonGroup` — net new, to reconcile with `RadioGroup`                      | todo    |
| P5.39  | `Rating` — net new, no legacy equivalent                                          | todo    |
| P5.40  | `Surface` — four grounds, elevation asked for, no slots                           | done    |
| P5.41  | `SplitView` — net new, a `view/` split on a draggable divider                     | todo    |
| P5.42  | `Table` — net new, no legacy equivalent                                           | todo    |
| P5.43  | `TagGroup` — List · Item · ItemLabel · ItemRemoveButton                           | done    |
| P5.44  | `Timeline` — net new, no legacy equivalent                                        | todo    |
| P5.45  | `Widget` — net new, no legacy equivalent                                          | todo    |
| P5.46  | Parity milestone — `npm deprecate @xaui/native-legacy`                            | todo    |
| P6     | `@xaui/hybrid` on the v1 API — frozen until P4 ships                              | todo    |
| P7     | Delete `native-legacy` — not before the P5 parity milestone                       | todo    |

## Repository debt

| Ref | Task                                                                      | Status |
| --- | ------------------------------------------------------------------------- | ------ |
| D1  | `apps/docs` has no `type-check` script — the CI filter skips it silently  | todo   |
| D2  | `apps/demo` has neither a `type-check` script nor a CI filter             | todo   |
| D3  | `turbo.json` `test` outputs are wrong — every run warns                   | todo   |
| D4  | `apps/docs/public/docs/` still documents the dropped legacy `view/` names | todo   |
