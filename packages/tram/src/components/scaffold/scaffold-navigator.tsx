import { cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { mergeScreenOptions } from '@xaui/native/scaffold'
import type { ScreenOptionsProp } from '@xaui/native/scaffold'
import { useScaffold } from './scaffold.context'
import type { ScaffoldNavigatorProps } from './scaffold.type'

/**
 * The app's navigator, dressed from the Tram theme.
 *
 * ```tsx
 * <Scaffold.Navigator>
 *   <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }}>
 *     <Stack.Screen name="index" options={{ title: 'accueil' }} />
 *   </Stack>
 * </Scaffold.Navigator>
 * ```
 *
 * The child is cloned with the theme's options merged **under** its own `screenOptions`
 * by Native's `mergeScreenOptions`: the style keys blend, every other key is the app's.
 * No `asChild` and no default element — there is no navigator Tram could render in place
 * of the app's.
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

ScaffoldNavigator.displayName = 'XAUI.Tram.Scaffold.Navigator'
