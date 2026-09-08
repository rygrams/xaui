---
'@xaui/native': patch
---

`DummyField` — Label · Field · Value · Indicator · Description · Error

P5.32, renamed from legacy `InputTrigger`.

- A pressable field container styled identically to a text input (`TextField`), but
  non-editable and interactive through `PressableFeedback`.
- Renamed with the `*Field` suffix to match `TextField`, `MaskField`, `NumberField`, and
  `TimeField`, avoiding name collisions with the `*.Trigger` slot vocabulary of overlay
  compounds (`Select.Trigger`, `Popover.Trigger`, `Menu.Trigger`).
- Composable slot anatomy: `DummyField.Label`, `DummyField.Field`, `DummyField.Value`,
  `DummyField.Indicator`, `DummyField.Description`, `DummyField.Error`.
- Text children of `DummyField.Field` are auto-wrapped in `DummyField.Value` (R3).
- Supports `labelPlacement="inside"` out of flow, four emphasis variants (`primary`,
  `secondary`, `tertiary`, `ghost`), four sizes (`xs`, `sm`, `md`, `lg`), `isInvalid`,
  `isDisabled`, raw tint `color`, and decorator padding inside `FieldGroup`.
