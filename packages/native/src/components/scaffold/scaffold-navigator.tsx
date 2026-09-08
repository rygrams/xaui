import { cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { useScaffold } from './scaffold.context'
import { mergeScreenOptions } from './scaffold.utils'
import type { ScreenOptionsProp } from './scaffold.utils'
import type { ScaffoldNavigatorProps } from './scaffold.type'

/**
 * The app's navigator, dressed from the theme.
 *
 * ```tsx
 * <Scaffold.Navigator>
 *   <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }}>
 *     <Stack.Screen name="index" options={{ title: 'Accueil' }} />
 *   </Stack>
 * </Scaffold.Navigator>
 * ```
 *
 * The navigator arrives as the child and leaves as the same navigator: the slot clones it
 * with the theme's `screenOptions` merged **under** the app's own. Nothing else is touched
 * — `initialRouteName`, the `Screen` children, a nested layout, the navigator's type — so
 * a `Stack`, a `Tabs` or a `Drawer` all work, and none of them is a dependency of the
 * library. That is the whole reason this is a slot rather than a `<Stack>` XAUI renders.
 *
 * **There is no `asChild` here, and no default element either.** The prop distinguishes
 * "render yourself" from "dress my element", and this slot has only the second mode —
 * there is no navigator XAUI could render in place of the app's.
 *
 * `Scaffold.Navigator` is a convenience, not the only path: an app that would rather spread
 * the options itself reads them off `useScaffold`.
 */
export function ScaffoldNavigator({ children }: ScaffoldNavigatorProps) {
  const { screenOptions } = useScaffold()

  if (!isValidElement(children)) {
    throw new Error(
      'XAUI: Scaffold.Navigator expects exactly one React element — the app’s own ' +
        'navigator — and clones it with the theme’s screenOptions. Text, a fragment, ' +
        'several children or none give it nothing to dress.'
    )
  }

  const navigator = children as ReactElement<{ screenOptions?: ScreenOptionsProp }>

  return cloneElement(navigator, {
    screenOptions: mergeScreenOptions(screenOptions, navigator.props.screenOptions),
  })
}

ScaffoldNavigator.displayName = 'XAUI.Scaffold.Navigator'
