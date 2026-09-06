import { ScrollView, Text, View } from 'react-native'
import { Chip } from '@xaui/native/chip'
import { Timeline, useTimeline } from '@xaui/native/timeline'
import type {
  TimelineDensity,
  TimelineSize,
  TimelineStatus,
} from '@xaui/native/timeline'
import { useXAUITheme } from '@xaui/native/theme'

const STATUSES: TimelineStatus[] = [
  'default',
  'muted',
  'current',
  'success',
  'warning',
  'danger',
]
const SIZES: TimelineSize[] = ['sm', 'md', 'lg']
const DENSITIES: TimelineDensity[] = ['compact', 'comfortable']

/** A tick drawn from two bars, so the screen needs no icon set. */
function Check() {
  // What an `Icon` does: the size and the colour come from the marker, not from here.
  const { icon } = useTimeline()
  const size = (icon.size ?? 12) * 0.62
  const bar = Math.max(1.5, size / 5)

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          position: 'absolute',
          bottom: size * 0.18,
          start: 0,
          width: size * 0.46,
          height: bar,
          borderRadius: bar,
          backgroundColor: '#fff',
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: size * 0.3,
          end: -size * 0.06,
          width: size * 0.8,
          height: bar,
          borderRadius: bar,
          backgroundColor: '#fff',
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  )
}

/**
 * The verification screen for the `Timeline`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function TimelineScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Ce qui s'est passé, dans l'ordre"
        note="L'air entre deux entrées est à l'intérieur de celle du dessus : il n'y a pas de gap sur la racine, et il ne peut pas y en avoir — le rail court sur toute la hauteur de son entrée, donc un gap serait une coupure dans la ligne. Les deux bouts sont laissés de côté : une ligne qui sort par le haut d'une liste est une liste coupée."
      >
        <Timeline>
          <Timeline.Item status="success">
            <Timeline.Rail />
            <Timeline.Content>
              <Timeline.Title>Commande passée</Timeline.Title>
              <Timeline.Description>Paiement accepté.</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item status="success">
            <Timeline.Rail />
            <Timeline.Content>
              <Timeline.Title>Colis préparé</Timeline.Title>
              <Timeline.Description>Entrepôt de Lyon.</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item status="current">
            <Timeline.Rail />
            <Timeline.Content>
              <Timeline.Title>En transit</Timeline.Title>
              <Timeline.Description>Livraison prévue demain.</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item status="muted">
            <Timeline.Rail />
            <Timeline.Content>
              <Timeline.Title>Livré</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </Section>

      <Section
        title="Une colonne d'heures"
        note="Alignée à droite et de largeur fixe, ce qui fait qu'une colonne d'heures se lit comme une colonne : des heures en drapeau à côté d'un rail droit ressemblent à une erreur."
      >
        <Timeline density="compact">
          {[
            { at: '09:12', title: 'Déploiement lancé', status: 'success' as const },
            {
              at: '09:14',
              title: 'Migration appliquée',
              status: 'success' as const,
            },
            { at: '09:31', title: 'Alerte de latence', status: 'warning' as const },
            { at: '09:47', title: 'Retour arrière', status: 'danger' as const },
          ].map(step => (
            <Timeline.Item key={step.at} status={step.status}>
              <Timeline.Leading>{step.at}</Timeline.Leading>
              <Timeline.Rail />
              <Timeline.Content>
                <Timeline.Title>{step.title}</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Section>

      <Section
        title="Les six statuts"
        note="status n'est pas variant : une variante dit à quel point une chose est forte, ceux-ci disent ce qui s'est passé. current est le seul qui n'est pas qu'une couleur — il est dessiné en anneau plutôt qu'en disque, donc « en cours » se distingue de « fait » sans dépendre d'une teinte."
      >
        <Timeline density="compact">
          {STATUSES.map(status => (
            <Timeline.Item key={status} status={status}>
              <Timeline.Rail />
              <Timeline.Content>
                <Timeline.Title>{status}</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Section>

      <Section
        title="Un rail composé"
        note="Rail sans enfants est l'arrangement de toute frise : la moitié haute de la ligne, la marque, la moitié basse. Avec des enfants, ils remplacent les trois — c'est ainsi qu'une marque porte une icône."
      >
        <Timeline>
          <Timeline.Item status="success">
            <Timeline.Rail>
              <Timeline.Connector edge="above" />
              <Timeline.Marker>
                <Check />
              </Timeline.Marker>
              <Timeline.Connector edge="below" />
            </Timeline.Rail>
            <Timeline.Content>
              <Timeline.Title>Validé</Timeline.Title>
              <Timeline.Description>La marque porte une icône.</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item status="current">
            <Timeline.Rail />
            <Timeline.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Timeline.Title>Revue en cours</Timeline.Title>
                <Chip size="sm" variant="warning-soft">
                  2 relecteurs
                </Chip>
              </View>
              <Timeline.Description>
                Le contenu prend le reste de la rangée, donc une longue description
                passe à la ligne au lieu de pousser le rail hors de l’écran.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </Section>

      <Section
        title="align"
        note="start met la marque au niveau de la première ligne du titre, ce que veut une liste d'événements. center la centre sur l'entrée entière, ce que veut une liste de cartes à deux lignes. La seule différence est de savoir si la moitié haute du rail est un inset fixe ou une part de la hauteur — c'est pour cela qu'il y a deux moitiés et non une ligne."
      >
        {(['start', 'center'] as const).map(align => (
          <Timeline key={align} itemAlign={align}>
            {[1, 2].map(n => (
              <Timeline.Item key={n} status={n === 1 ? 'success' : 'current'}>
                <Timeline.Rail />
                <Timeline.Content>
                  <Timeline.Title>
                    {align} — entrée {n}
                  </Timeline.Title>
                  <Timeline.Description>
                    Une deuxième ligne, pour que la différence se voie.
                  </Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        ))}
      </Section>

      <Section
        title="Les tailles et les densités"
        note="size bouge la marque, la largeur du rail et la typo. density est l'inset bas d'une entrée, et le connecteur le remplit."
      >
        {SIZES.map(size => (
          <Timeline key={size} size={size} density="compact">
            {[1, 2].map(n => (
              <Timeline.Item key={n} status={n === 1 ? 'success' : 'muted'}>
                <Timeline.Rail />
                <Timeline.Content>
                  <Timeline.Title>{size}</Timeline.Title>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        ))}

        {DENSITIES.map(density => (
          <Timeline key={density} density={density}>
            {[1, 2].map(n => (
              <Timeline.Item key={n} status="default">
                <Timeline.Rail />
                <Timeline.Content>
                  <Timeline.Title>{density}</Timeline.Title>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        ))}
      </Section>

      <Section
        title="force, et une teinte"
        note="force dessine le segment du bout quand même, pour une frise qui continue au-delà de ce qui est à l'écran. La teinte va sur default et current — les verts et les rouges d'une frise veulent dire réussi et échoué, et les repeindre serait une teinte qui ment."
      >
        <Timeline color="#0ea5e9" density="compact">
          <Timeline.Item status="default">
            <Timeline.Rail>
              <Timeline.Connector edge="above" force />
              <Timeline.Marker />
              <Timeline.Connector edge="below" />
            </Timeline.Rail>
            <Timeline.Content>
              <Timeline.Title>…et avant, autre chose</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item status="success">
            <Timeline.Rail />
            <Timeline.Content>
              <Timeline.Title>Le vert reste vert</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item status="current">
            <Timeline.Rail />
            <Timeline.Content>
              <Timeline.Title>L’anneau prend la teinte</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
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
