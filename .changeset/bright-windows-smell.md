---
'@xaui/native': patch
---

Add a new `Screen` component in `view` with theme background by default and optional `padding` support.

Also modernize threading/safe-area usage in native components:
- use `react-native-safe-area-context` for `Screen` safe area rendering
- replace deprecated `runOnJS` calls with `scheduleOnRN` from `react-native-worklets`
- add required peer/dev dependency declarations for these integrations
