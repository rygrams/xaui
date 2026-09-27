import type { ComponentType } from 'react'
import { CheckoutBasic, CheckoutFinal, CheckoutProblem } from './checkout-screen'
import { PlaygroundScreen } from './playground-screen'
import {
  ColorsScreen,
  ComposeScreen,
  HookScreen,
  SizesScreen,
  VariantsScreen,
} from './showcase-screens'

/**
 * Every `screenState` of `video/button/storyboard.json`, addressable as
 * `demo://demo/button?scene=<key>`. Dark mode is not a scene of its own: it is `final`
 * recorded with the simulator's appearance set to dark.
 */
export const BUTTON_SCENES: Record<string, ComponentType> = {
  problem: CheckoutProblem,
  basic: CheckoutBasic,
  final: CheckoutFinal,
  variants: VariantsScreen,
  'variants-picker': () => <PlaygroundScreen prop="variant" />,
  sizes: SizesScreen,
  'sizes-picker': () => <PlaygroundScreen prop="size" />,
  compose: ComposeScreen,
  colors: ColorsScreen,
  'colors-picker': () => <PlaygroundScreen prop="color" />,
  hook: HookScreen,
}
