import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useAppearance, useXAUITheme } from '../../theme/theme-hooks'
import { ScaffoldProvider } from './scaffold.context'
import { scaffoldRecipe } from './scaffold.recipe'
import type { ScaffoldProps } from './scaffold.type'

/**
 * The app's chrome, painted from the theme: the ground under every screen, the status bar
 * over it, and the options the app's navigator is dressed with.
 *
 * ```tsx
 * <XAUIProvider colorMode={colorMode}>
 *   <Scaffold>
 *     <Scaffold.StatusBar />
 *     <Scaffold.Navigator>
 *       <Stack>
 *         <Stack.Screen name="index" options={{ title: 'Accueil' }} />
 *       </Stack>
 *     </Scaffold.Navigator>
 *   </Scaffold>
 * </XAUIProvider>
 * ```
 *
 * **It depends on no navigator, and on Expo least of all.** `Scaffold.Navigator` takes the
 * app's own navigator as its child and hands it five style keys, so Expo Router, React
 * Navigation's native stack, a drawer or a set of tabs are all dressed by the same
 * component and none of them is imported here. Routing stays entirely the app's: this
 * writes no route, wraps no screen, and touches nothing the navigator was configured with.
 *
 * It is `useAppearance` with the wiring done. The hook stays the answer for a chrome this
 * does not reach — an Android navigation bar, a header rendered by hand.
 *
 * It has to be **under** `XAUIProvider`, which is what resolves the theme it reads.
 */
export const ScaffoldRoot = forwardRef<View, ScaffoldProps>(function Scaffold(
  { children, variant, color, asChild = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  const { statusBarStyle } = useAppearance()
  const [styleProps, rest] = useStyleProps(props)

  const styles = scaffoldRecipe.resolve({ theme, selection: { variant } })

  /**
   * R5 — the chrome is resolved once, here.
   *
   * The tint is computed **inside** the memo rather than beside the recipe, which is where
   * every other root does it. A tint pass allocates a new object per render, and a
   * navigator re-reads `screenOptions` every time it is handed one that is not the object
   * it already had: keeping `color` in the dependencies instead of its result is what
   * stops a tinted scaffold from re-rendering the app's header on every render of the
   * layout. `deriveTint` is memoized per value, so the pass itself costs nothing to repeat.
   */
  const context = useMemo(() => {
    const tint = color
      ? scaffoldRecipe.tint({ theme, color, selection: { variant } })
      : undefined

    const header = StyleSheet.flatten<ViewStyle>([styles.header, tint?.header])
    const headerTitle = StyleSheet.flatten<TextStyle>([
      styles.headerTitle,
      tint?.headerTitle,
    ])

    return {
      statusBar: {
        barStyle: statusBarStyle,
        // The bar sits on the header rather than on the page, so it takes the header's
        // ground — which is the page's own under the two flat variants.
        backgroundColor: header.backgroundColor,
      },
      screenOptions: {
        headerStyle: header,
        // `Icon` flattens its slot for the same reason: the arrow and the icons take a
        // colour, not a style, and `ColorValue` also covers the platform's opaque colours
        // a navigator cannot be handed.
        headerTintColor:
          typeof headerTitle.color === 'string' ? headerTitle.color : undefined,
        headerTitleStyle: headerTitle,
        // The variant owns the header's edge — `tertiary` draws the hairline and the other
        // three draw none — so the navigator's own line never doubles it.
        headerShadowVisible: false,
        contentStyle: StyleSheet.flatten<ViewStyle>(styles.content),
      },
    }
  }, [styles, theme, variant, color, statusBarStyle])

  // R12 — the ground is a view, and `asChild` is what merges it into the one the app
  // already has: `<Scaffold asChild><GestureHandlerRootView /></Scaffold>` is one node
  // instead of two.
  const Root = asChild ? Slot : View

  return (
    <ScaffoldProvider value={context}>
      <Root ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </Root>
    </ScaffoldProvider>
  )
})

ScaffoldRoot.displayName = 'XAUI.Scaffold.Root'
