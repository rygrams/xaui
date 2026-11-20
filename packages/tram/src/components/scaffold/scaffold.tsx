import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useAppearance, useXAUITheme } from '@xaui/native/theme'
import { groundPaint } from '../../system/ground-paint'
import { ScaffoldProvider } from './scaffold.context'
import { DEFAULT_VARIANT, scaffoldRecipe } from './scaffold.recipe'
import { statusBarStyleOn } from './scaffold.utils'
import type { ScaffoldContextValue, ScaffoldProps } from './scaffold.type'

/**
 * The app's chrome in Tram: the ground under every screen, the status bar over it, and
 * the options the app's navigator is dressed with — Native's `Scaffold`, drawn flat.
 *
 * ```tsx
 * <TramProvider colorMode={colorMode}>
 *   <Scaffold>
 *     <Scaffold.StatusBar />
 *     <Scaffold.Navigator>
 *       <Stack>
 *         <Stack.Screen name="index" options={{ title: 'accueil' }} />
 *       </Stack>
 *     </Scaffold.Navigator>
 *   </Scaffold>
 * </TramProvider>
 * ```
 *
 * It depends on no navigator: `Scaffold.Navigator` clones the app's own with the options
 * merged under its `screenOptions` — Native's `mergeScreenOptions`, so the app keeps the
 * last word on every key it wrote. Routing, the safe area and the colour-mode toggle stay
 * the app's.
 *
 * The header never casts a shadow (`headerShadowVisible: false`); its title is the Tram
 * `title` role, SemiLight, at the start of the line; the status bar's ink is the one that
 * reads on the header's own ground, so a lime bar gets dark icons in the dark mode too.
 */
export const ScaffoldRoot = forwardRef<View, ScaffoldProps>(function Scaffold(
  {
    children,
    variant = DEFAULT_VARIANT,
    accent,
    color,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const { statusBarStyle } = useAppearance()
  const [styleProps, rest] = useStyleProps(props)

  const styles = scaffoldRecipe.resolve({ theme, selection: { variant } })

  /**
   * R5 — the chrome is resolved once. The tint is computed **inside** the memo, from the
   * props rather than beside the recipe: a navigator re-reads `screenOptions` whenever it
   * is handed a new object, and a tint pass allocates one per render.
   */
  const context = useMemo<ScaffoldContextValue>(() => {
    // A bar that is filled takes the accent's true colour; a title on the page takes it
    // as the mode's ink, where yellow on white would not read.
    const paint = groundPaint({
      accent,
      color,
      isLine: variant === 'tertiary' || variant === 'ghost',
      page: theme.colors.background,
    })
    const tint = paint
      ? scaffoldRecipe.tint({ theme, color: paint, selection: { variant } })
      : undefined

    const header = StyleSheet.flatten<ViewStyle>([styles.header, tint?.header])
    const headerTitle = StyleSheet.flatten<TextStyle>([
      styles.headerTitle,
      tint?.headerTitle,
    ])

    return {
      statusBar: {
        barStyle: statusBarStyleOn(header.backgroundColor, statusBarStyle),
        backgroundColor: header.backgroundColor,
      },
      screenOptions: {
        headerStyle: header,
        headerTintColor:
          typeof headerTitle.color === 'string' ? headerTitle.color : undefined,
        headerTitleStyle: headerTitle,
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        contentStyle: StyleSheet.flatten<ViewStyle>(styles.content),
      },
    }
  }, [styles, theme, variant, accent, color, statusBarStyle])

  // R12 — `<Scaffold asChild><GestureHandlerRootView /></Scaffold>` is one node, not two.
  const Root = asChild ? Slot : View

  return (
    <ScaffoldProvider value={context}>
      <Root ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </Root>
    </ScaffoldProvider>
  )
})

ScaffoldRoot.displayName = 'XAUI.Tram.Scaffold.Root'
