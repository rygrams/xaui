import { ScrollView, Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { Scaffold, useScaffold } from '@xaui/native/scaffold'
import type { ScaffoldVariant } from '@xaui/native/scaffold'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ScaffoldVariant[] = ['ghost', 'tertiary', 'secondary', 'primary']

/**
 * The verification screen for the `Scaffold`. The **real** wiring is verified by the demo
 * itself — `app/_layout.tsx` is a `Scaffold`, so this app's status bar and header are what
 * this component resolved, in light and in dark.
 *
 * What is left to see here is the resolution: each preview is a nested `Scaffold` whose
 * child paints the three values it published — the status bar's ground, the header's, and
 * the screen's — as the bar a navigator would draw from them.
 */
export default function ScaffoldScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="A ladder, not four emphases"
        note="How much the header separates from the page, from a bar you cannot miss down to no bar at all. ghost est le défaut : un header peint dans la couleur de la page, ce que veut aujourd'hui presque toutes les apps. tertiary partage ce fond et se ferme d'un filet — à vérifier dans les deux modes, puisque la bordure tombe plus sombre que le fond en light et plus claire en dark."
      >
        {VARIANTS.map(variant => (
          <ChromePreview key={variant} variant={variant} title={variant} />
        ))}
      </Section>

      <Section
        title="The page's ground is the theme's, under every variant"
        note="Le fond de page reste background quelle que soit la variante : un scaffold qui repeindrait la page par variante serait un thème, pas un chrome. C'est la barre que la variante décrit — la troisième bande de chaque aperçu est contentStyle, et elle ne bouge pas."
      >
        <ChromePreview variant="primary" title="primary" />
        <ChromePreview variant="ghost" title="ghost" />
      </Section>

      <Section
        title="The tint follows the variant (R7)"
        note="color est une valeur brute et atterrit là où la variante a posé ses tokens : la barre d'une primary ou d'une secondary, le titre et le filet d'une tertiary, le titre seul d'une ghost. Les deux variantes plates ne nomment aucun fond dans la recipe — exactement comme un Button ghost peint son label."
      >
        {VARIANTS.map(variant => (
          <ChromePreview
            key={variant}
            variant={variant}
            color="#7c3aed"
            title={`${variant} + color`}
          />
        ))}
      </Section>

      <Section
        title="The ground is a view, so its style is props (R14)"
        note="La racine est un View comme un autre : flex, borderRadius et overflow sont les props qui donnent leur cadre aux aperçus de cette page. Une app qui peint sa page en dégradé passe par backgroundColor, ou par asChild pour fusionner le sol dans le View qu'elle a déjà."
      >
        <Scaffold
          variant="secondary"
          flex={0}
          borderRadius={16}
          overflow="hidden"
          backgroundColor={theme.colors.surfaceSecondary}
        >
          <Chrome title="backgroundColor en prop" />
        </Scaffold>
      </Section>

      <Section
        title="Scaffold.Navigator dresses the app's own navigator"
        note="Il n'y a rien à afficher ici : le slot clone le navigateur reçu en enfant avec les screenOptions du thème fusionnées SOUS les siennes, et ce navigateur est celui de cette app. Le bouton Dark/Light du header, écrit dans le headerRight du Stack de _layout.tsx, est la preuve que la fusion laisse passer les clés de l'app."
      >
        <Scaffold variant="ghost" flex={0}>
          <Values />
        </Scaffold>
      </Section>
    </ScrollView>
  )
}

/** One variant, framed — a `Scaffold` taken out of flow so several fit on one screen. */
function ChromePreview({
  variant,
  color,
  title,
}: {
  variant: ScaffoldVariant
  color?: string
  title: string
}) {
  const theme = useXAUITheme()

  return (
    <Scaffold
      variant={variant}
      color={color}
      flex={0}
      borderRadius={16}
      overflow="hidden"
      borderWidth={1}
      borderColor={theme.colors.separator}
    >
      <Chrome title={title} />
    </Scaffold>
  )
}

/**
 * What a navigator does with the values, done by hand: the status bar's ground, the
 * header's, and the screen's, read off `useScaffold` — resolved values, nothing re-derived.
 */
function Chrome({ title }: { title: string }) {
  const theme = useXAUITheme()
  const { screenOptions, statusBar } = useScaffold()

  return (
    <View>
      <View
        style={[
          { height: 22, justifyContent: 'center', paddingHorizontal: 12 },
          screenOptions.headerStyle,
        ]}
      >
        <Text
          style={[
            { fontSize: theme.fontSizes.xs },
            screenOptions.headerTitleStyle,
            { opacity: 0.6 },
          ]}
        >
          {statusBar.barStyle}
        </Text>
      </View>

      <View
        style={[
          { height: 52, justifyContent: 'center', paddingHorizontal: 12 },
          screenOptions.headerStyle,
        ]}
      >
        <Text style={screenOptions.headerTitleStyle}>{title}</Text>
      </View>

      <View
        style={[
          { height: 56, justifyContent: 'center', paddingHorizontal: 12 },
          screenOptions.contentStyle,
        ]}
      >
        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
          contentStyle — le fond de l’écran sous le header
        </Text>
      </View>
    </View>
  )
}

/** The five keys, as the navigator receives them. */
function Values() {
  const theme = useXAUITheme()
  const { screenOptions, statusBar } = useScaffold()

  const lines = [
    `barStyle: ${statusBar.barStyle}`,
    `headerTintColor: ${screenOptions.headerTintColor}`,
    `headerShadowVisible: ${screenOptions.headerShadowVisible}`,
    // `String`, because a `ColorValue` also covers the platform's opaque colours, which
    // are symbols and do not interpolate.
    `headerStyle.backgroundColor: ${String(screenOptions.headerStyle.backgroundColor)}`,
    `contentStyle.backgroundColor: ${String(screenOptions.contentStyle.backgroundColor)}`,
  ]

  return (
    <View style={{ gap: 4 }}>
      {lines.map(line => (
        <Text
          key={line}
          style={{
            color: theme.colors.foreground,
            fontFamily: theme.fontFamilies.mono,
            fontSize: theme.fontSizes.xs,
          }}
        >
          {line}
        </Text>
      ))}
    </View>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
  )
}
