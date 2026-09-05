import React from 'react'
import { Flex } from '../flex/flex'
import type { RowProps } from '../layout-types'

/**
 * @deprecated Use `Row` from `@xaui/native/view`. This tree is frozen and receives
 * fixes only.
 *
 * The v1 axis contributes **one declaration**, `flexDirection: 'row'`, and nothing else.
 * Everything this one invented is React Native's own vocabulary, exposed as style props
 * (R14): `mainAxisAlignment` is `justifyContent`, `crossAxisAlignment` is `alignItems`,
 * `wrap` is `flexWrap`, and `gap` and `flex` keep their names and take React Native values.
 *
 * **`mainAxisSize` is the one to look at when a layout moves.** It defaulted to `'max'`,
 * which put `width: '100%'` on every `Row` and `flex: 1` on every `Column` whether or not
 * anyone asked. `crossAxisAlignment` defaulted to `'center'` where React Native says
 * `stretch`. The v1 axis has no opinion at all, so a layout that leaned on those defaults
 * has to say what it meant: `width="100%"`, `flex=1`, `alignItems="center"`.
 *
 * `reversed` is gone: `row` already flips in RTL, which is the case that matters, and a
 * genuine reversal is `style={{ flexDirection: 'row-reverse' }}`.
 */
export const Row: React.FC<RowProps> = props => (
  <Flex {...props} direction="horizontal" />
)

Row.displayName = 'Row'
