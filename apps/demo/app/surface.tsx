import { ScrollView, Text, View } from 'react-native'
import { Surface } from '@xaui/native/surface'
import type { SurfaceSize, SurfaceVariant } from '@xaui/native/surface'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: SurfaceVariant[] = ['primary', 'secondary', 'tertiary']
const SIZES: SurfaceSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `Surface`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function SurfaceScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="A ladder, not three emphases"
        note="primary sits on the page, secondary inside a primary, tertiary inside a secondary. A surface reports nothing — it is the thing other reporting sits on — so the levels say where something belongs rather than how loud it is. Posée à même la page, la tertiary partage son fond : seule la bordure la dessine, ce qui est la variante qui marche et non un bug."
      >
        {VARIANTS.map(variant => (
          <Surface key={variant} variant={variant}>
            <Label>{variant}</Label>
          </Surface>
        ))}
      </Section>

      <Section
        title="Nested, which is the whole point"
        note="Three levels is as deep as the reading survives — a fourth would be a shade nobody could place. Sous une secondary il ne reste aucun gris qui se lise encore comme un niveau : la tertiary reprend le fond de la page et se dessine à la bordure. Les deux sont des tokens que le thème énonce par mode, donc l'arête tombe plus sombre que le fond en light et plus claire en dark — à vérifier ici dans les deux modes."
      >
        <Surface>
          <Label>primary</Label>
          <Surface variant="secondary">
            <Label>secondary</Label>
            <Surface variant="tertiary">
              <Label>tertiary</Label>
            </Surface>
          </Surface>
        </Surface>
      </Section>

      <Section
        title="Sizes move the padding, the gap and the corner"
        note="Never a height. A surface is a ground: how tall it is, is how tall what is on it is. md is HeroUI's, measured — sixteen points of padding on a twenty-four point corner."
      >
        {SIZES.map(size => (
          <Surface key={size} size={size} variant="secondary">
            <Label>{size}</Label>
          </Surface>
        ))}
      </Section>

      <Section
        title="Elevation is asked for, not tied to the variant"
        note="A Card decides for you — its default is always lifted. A surface is the raw ground, and whether one is above the other is the layout's business: the same secondary is flat inside a card and lifted floating over a list. primary is lifted by default because it has the fill to carry a shadow; the quieter three would read as dirt rather than as height."
      >
        <Surface variant="secondary">
          <Label>secondary, à plat</Label>
        </Surface>
        <Surface variant="secondary" isElevated>
          <Label>secondary, soulevée</Label>
        </Surface>
        <Surface isElevated={false}>
          <Label>primary, posée</Label>
        </Surface>
      </Section>

      <Section
        title="A tint (R7), and style as props"
        note="color is a raw value, never a token — it paints the ground. Everything else a surface could be is already a style prop: padding, borderRadius, borderWidth. There is nothing here a prop had to be invented for."
      >
        <Surface color="#7c3aed">
          <Label>teintée</Label>
        </Surface>
        <Surface
          variant="secondary"
          borderWidth={1}
          borderColor={theme.colors.separator}
        >
          <Label>secondary, bordée en style props</Label>
        </Surface>
      </Section>
    </ScrollView>
  )
}

function Label({ children }: { children: string }) {
  const theme = useXAUITheme()

  return (
    <Text
      style={{ color: theme.colors.surfaceForeground, fontSize: theme.fontSizes.sm }}
    >
      {children}
    </Text>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
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
