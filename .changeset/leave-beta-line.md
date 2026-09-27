---
'@xaui/native': patch
'@xaui/hybrid': patch
---

Leave the `beta` pre-release line: versions are plain again and publish on `latest`.

`@xaui/native` and `@xaui/hybrid` were versioned `0.9.x-beta.x` and published on the `beta`
dist-tag only, so `latest` stayed on the old API (`@xaui/native@0.2.8`,
`@xaui/hybrid@0.0.14`) and a plain `npm i` installed components this documentation does not
describe. From this release the versions drop the `-beta` suffix, follow normal patch
numbers, and publish on `latest`, so `pnpm add @xaui/native` installs what is documented.

The line is still pre-1.0: the API can change before `1.0.0`, and the release notes say
when it does. The `beta` and `alpha` dist-tags stay on their last publishes and no longer
move; drop them from your install commands. Projects that pin `@xaui/native@^0.2.8` are
not affected.
