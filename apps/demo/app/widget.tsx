import { ScrollView, Text, View } from 'react-native'
import { AreaChart } from '@xaui/native/area-chart'
import { Chart } from '@xaui/native/chart'
import { Divider } from '@xaui/native/divider'
import { Widget } from '@xaui/native/widget'
import type { WidgetSize, WidgetVariant } from '@xaui/native/widget'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: WidgetVariant[] = ['primary', 'secondary', 'tertiary']
const SIZES: WidgetSize[] = ['xs', 'sm', 'md', 'lg']

const USAGE = [
  { day: 'Lun', input: 320, output: 180 },
  { day: 'Mar', input: 410, output: 220 },
  { day: 'Mer', input: 380, output: 260 },
  { day: 'Jeu', input: 520, output: 300 },
  { day: 'Ven', input: 610, output: 340 },
  { day: 'Sam', input: 340, output: 190 },
  { day: 'Dim', input: 280, output: 150 },
]

const ROWS = [
  { label: 'Requêtes', value: '12 480' },
  { label: 'Erreurs', value: '37' },
  { label: 'Latence p95', value: '412 ms' },
]

/**
 * The verification screen for the `Widget`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function WidgetScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Le cas complet"
        note="Titre et description d'un côté, légende de l'autre, la figure dans le puits, l'horodatage dessous. C'est la capture d'origine : ce qui est montré a ses propres bords, et la carte est le cadre autour."
      >
        <Widget>
          <Widget.Header>
            <Widget.Heading>
              <Widget.Title>Tokens consommés</Widget.Title>
              <Widget.Description>7 derniers jours</Widget.Description>
            </Widget.Heading>
            <Chart.Legend labels={['Entrée', 'Sortie']} />
          </Widget.Header>

          <Widget.Content>
            <AreaChart
              data={USAGE}
              xKey="day"
              yKeys={['input', 'output']}
              size="sm"
            />
          </Widget.Content>

          <Widget.Footer>Mis à jour il y a 2 minutes · 30 jours</Widget.Footer>
        </Widget>
      </Section>

      <Section
        title="Le puits est un fond, pas un emplacement de graphique"
        note="Une figure, un tableau, une liste de lignes — le slot ne sait de son contenu que ce qui l'intéresse : c'est un niveau en dessous de la carte."
      >
        <Widget size="sm">
          <Widget.Header>
            <Widget.Heading>
              <Widget.Title>API</Widget.Title>
            </Widget.Heading>
          </Widget.Header>

          <Widget.Content>
            {ROWS.map((row, index) => (
              <View key={row.label}>
                {index > 0 ? <Divider /> : null}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: theme.colors.muted, fontSize: 13 }}>
                    {row.label}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 13,
                      fontWeight: theme.fontWeights.medium,
                    }}
                  >
                    {row.value}
                  </Text>
                </View>
              </View>
            ))}
          </Widget.Content>

          <Widget.Footer>Fenêtre glissante de 5 minutes</Widget.Footer>
        </Widget>
      </Section>

      <Section
        title="Chaque slot est facultatif"
        note="Un widget qui n'est qu'un puits est un Widget avec un seul Widget.Content dedans. Rien n'impose non plus l'ordre."
      >
        <Widget size="sm">
          <Widget.Content>
            <Text style={{ color: theme.colors.foreground }}>
              Le puits, et rien d’autre
            </Text>
          </Widget.Content>
        </Widget>

        <Widget size="sm">
          <Widget.Header>
            <Widget.Heading>
              <Widget.Title>Sans puits</Widget.Title>
              <Widget.Description>
                Un en-tête et un pied, comme une carte
              </Widget.Description>
            </Widget.Heading>
          </Widget.Header>
          <Widget.Footer>Rien à encadrer ici</Widget.Footer>
        </Widget>
      </Section>

      <Section
        title="Les trois niveaux de la Surface"
        note="Le contenu se creuse d'un cran sous la carte. La tertiary est celle qui s'inverse : sa carte reprend le fond de la page avec une bordure, donc il n'y a rien en dessous où se creuser — le puits monte à la place, et se lit comme la seule chose pleine dans un contour."
      >
        {VARIANTS.map(variant => (
          <Widget key={variant} variant={variant} size="sm">
            <Widget.Header>
              <Widget.Heading>
                <Widget.Title>{variant}</Widget.Title>
              </Widget.Heading>
            </Widget.Header>
            <Widget.Content>
              <Text style={{ color: theme.colors.muted, fontSize: 13 }}>
                le puits
              </Text>
            </Widget.Content>
          </Widget>
        ))}
      </Section>

      <Section
        title="Les tailles bougent l'inset, les écarts, le coin et la typo"
        note="Jamais une hauteur : un widget est aussi haut que ce qu'il y a dedans. Le puits est moins renfoncé que la carte à chaque taille — c'est un panneau, pas une deuxième carte."
      >
        {SIZES.map(size => (
          <Widget key={size} size={size}>
            <Widget.Header>
              <Widget.Heading>
                <Widget.Title>{size}</Widget.Title>
                <Widget.Description>Le coin suit la taille</Widget.Description>
              </Widget.Heading>
            </Widget.Header>
            <Widget.Content>
              <Text style={{ color: theme.colors.muted, fontSize: 13 }}>
                le puits
              </Text>
            </Widget.Content>
            <Widget.Footer>Un pied de page</Widget.Footer>
          </Widget>
        ))}
      </Section>

      <Section
        title="Le coin du puits est dérivé, pas choisi"
        note="Le coin intérieur est l'extérieur moins l'écart entre les deux — ici l'inset de la carte. Les arcs se suivent à chaque radius ; à l'inverse l'encart se lirait comme un autocollant posé dessus. À zéro le puits est carré, ce qui est correct : un grand inset sous un petit coin demanderait un rayon négatif."
      >
        {(['sm', '2xl', '4xl'] as const).map(radius => (
          <Widget key={radius} radius={radius} size="sm">
            <Widget.Header>
              <Widget.Heading>
                <Widget.Title>radius={radius}</Widget.Title>
              </Widget.Heading>
            </Widget.Header>
            <Widget.Content>
              <Text style={{ color: theme.colors.muted, fontSize: 13 }}>
                le puits suit
              </Text>
            </Widget.Content>
          </Widget>
        ))}
      </Section>

      <Section
        title="Soulevé par défaut, à l'inverse de la Surface"
        note="Un widget est un objet parmi d'autres sur un tableau de bord, et l'ombre est ce qui le sépare du suivant. L'argument inverse vaut pour la tertiary — c'est la variante sur laquelle la couper."
      >
        <Widget size="sm" isElevated={false}>
          <Widget.Header>
            <Widget.Heading>
              <Widget.Title>À plat</Widget.Title>
            </Widget.Heading>
          </Widget.Header>
          <Widget.Content>
            <Text style={{ color: theme.colors.muted, fontSize: 13 }}>le puits</Text>
          </Widget.Content>
        </Widget>

        <Widget size="sm" variant="tertiary" isElevated={false}>
          <Widget.Header>
            <Widget.Heading>
              <Widget.Title>tertiary, à plat</Widget.Title>
            </Widget.Heading>
          </Widget.Header>
          <Widget.Content>
            <Text style={{ color: theme.colors.muted, fontSize: 13 }}>le puits</Text>
          </Widget.Content>
        </Widget>
      </Section>

      <Section
        title="Le pied de page est un Text, parce que c'est ce qu'il est presque toujours"
        note="Un pied qui a besoin d'une commande dedans est une View que vous écrivez, et ce slot est ce que vous y mettez."
      >
        <Widget size="sm">
          <Widget.Content>
            <Text style={{ color: theme.colors.muted, fontSize: 13 }}>
              7 320 vues
            </Text>
          </Widget.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Widget.Footer>Mis à jour il y a 2 minutes</Widget.Footer>
            <Widget.Footer style={{ color: theme.colors.accent }}>
              Voir tout
            </Widget.Footer>
          </View>
        </Widget>
      </Section>
    </ScrollView>
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
