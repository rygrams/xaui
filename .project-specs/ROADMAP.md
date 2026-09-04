# XAUI roadmap status

One line per task: ref, title, status. No commentary — update the status when a task lands.
Task detail lives in `XAUI-V1-PLAN.md`.

Status is `done` or `todo`, plus `ci`: everything in the repository is done and the
remaining action belongs to a workflow rather than to a commit.

| Ref   | Task                                                               | Status |
| ----- | ------------------------------------------------------------------ | ------ |
| P0.1  | Split into `@xaui/native-legacy` and scaffold v1                   | done   |
| P0.2  | Single token source and generator                                  | done   |
| P0.3  | OKLab colour engine                                                | done   |
| P0.4  | Derived colour layer                                               | done   |
| P0.5  | Contrast guard in CI                                               | done   |
| P0.6  | `createTheme`                                                      | done   |
| P0.7  | `XAUIProvider`                                                     | done   |
| P0.8  | Legacy `core-shim.ts`                                              | done   |
| P0.9  | Package hygiene and optional peers                                 | done   |
| P0.10 | ESLint rule for R13                                                | done   |
| P0.11 | Publish `@xaui/native-legacy@0.2.11` and the codemod               | done   |
| P0.12 | Delete `@xaui/core` and `@xaui/icons`                              | done   |
| P0.13 | Publish `native` and `hybrid` on the `alpha` tag                   | done   |
| P1.1  | `system/recipe/` — engine, cache, tint                             | done   |
| P1.2  | `system/slot/` — context, `childrenToString`, merges               | done   |
| P1.3  | `system/pressable-feedback/`                                       | done   |
| P1.4  | `system/portal/`                                                   | done   |
| P1.5  | `system/icon/`                                                     | done   |
| P1.6  | Shared hooks                                                       | done   |
| P1.7  | `pnpm pack` uniqueness check on both packages                      | done   |
| P2.1  | The reference `Button`                                             | done   |
| P2.2  | Perf baseline — 200 buttons, re-renders and allocations            | done   |
| P2.3  | API review — blocking, nothing starts in P3 before it              | done   |
| P2.4  | Publish `@xaui/native` on the `alpha` tag                          | ci     |
| P2.5  | Fix the ripple — it renders nothing (P2-API-REVIEW §D)             | done   |
| P2.5b | `PressableFeedback` composes its overlays — no `feedbackVariant`   | done   |
| P2.6  | Style as props (R14) — `system/style-props/`, then the `Button`    | done   |
| P2.7  | `*Pressed` moves one way — towards the mode ink (P2-API-REVIEW §E) | done   |
| P3.3  | `view/` — `Row` and `Column`; `Padding`/`Center`/`Spacer` dropped  | done   |
| P3    | The fifteen-component core                                         | todo   |
| P4    | Docs, generated tables, `1.0.0`                                    | todo   |
| P5    | The remaining 32 components                                        | todo   |
| P6    | `@xaui/hybrid` on the v1 API                                       | todo   |
| P7    | Delete `native-legacy`                                             | todo   |
