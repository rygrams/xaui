import { ScaffoldNavigator } from './scaffold-navigator'
import { ScaffoldStatusBar } from './scaffold-status-bar'
import { ScaffoldRoot } from './scaffold'

export const Scaffold = Object.assign(ScaffoldRoot, {
  StatusBar: ScaffoldStatusBar,
  Navigator: ScaffoldNavigator,
})

export { useScaffold } from './scaffold.context'
export { scaffoldRecipe } from './scaffold.recipe'
export { mergeScreenOptions } from './scaffold.utils'
export type { NavigatorScreenOptions, ScreenOptionsProp } from './scaffold.utils'
export type {
  ScaffoldContextValue,
  ScaffoldNavigatorProps,
  ScaffoldProps,
  ScaffoldScreenOptions,
  ScaffoldSlot,
  ScaffoldStatusBarProps,
  ScaffoldVariant,
} from './scaffold.type'
