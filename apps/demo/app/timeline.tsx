import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Chip } from '@xaui/native/chip'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { Timeline, useTimeline } from '@xaui/native/timeline'
import type {
  TimelineDensity,
  TimelineSize,
  TimelineStatus,
} from '@xaui/native/timeline'
import { useXAUITheme } from '@xaui/native/theme'

const PRODUCT = { uri: 'https://picsum.photos/seed/xaui-timeline/720/460' }

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

/* A handful of outline glyphs, drawn inline so the screen needs no icon set. The strokes
 * read the injected `color`, which is how they sit inside a `Marker` unchanged. */
function stroke(path: string) {
  return function Glyph({ size, color }: IconComponentProps) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d={path}
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
}

const PlusSquareIcon = stroke(
  'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3M12 8v8m-4-4h8'
)
const ShareIcon = stroke(
  'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4'
)
const ShieldAlertIcon = stroke(
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm0-6v-4m0-4h.01'
)
const BellIcon = stroke(
  'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9m4.7 19a2 2 0 0 0 3.6 0'
)
const BoxIcon = stroke(
  'M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.3 7 12 12l8.7-5M12 22V12'
)
const ShieldCheckIcon = stroke(
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-2-10 2 2 4-4'
)

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

      <Section
        title="Rendu « Default » — colonne d'heures, marqueur cerclé à icône, pastille de statut"
        note="Ni composant nouveau ni option manquante : la colonne d'heures est Timeline.Leading, le cercle cerclé est un Rail composé qui déclare sa taille avec marker — sans ça le rail place un anneau de 28 comme s'il tenait le point de 12, huit points sous le titre — et la pastille est un Chip posé dans une rangée du Content. Tout est de l'API actuelle."
      >
        <Timeline density="compact">
          {ROLLOUT.map(step => {
            const tint = toneColor(theme, step.tone)

            return (
              <Timeline.Item key={step.at}>
                <Timeline.Leading>{step.at}</Timeline.Leading>
                <RingRail color={tint} icon={step.icon} />
                <Timeline.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Timeline.Title>{step.title}</Timeline.Title>
                    <Chip
                      size="sm"
                      variant={step.pill.variant}
                      paddingHorizontal={8}
                    >
                      {step.pill.label}
                    </Chip>
                  </View>
                  <Timeline.Description>{step.note}</Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Section>

      <Section
        title="Rendu « Studio review » — marqueur plein, heure à droite, carte média"
        note="L'heure à droite est le même JSX écrit dans l'autre sens : un Content dont la rangée pousse le temps avec flex: 1. La carte image + chips tient entièrement dans le Content, qui prend le reste de la ligne — aucune prop ne manquait pour ça."
      >
        <Timeline density="comfortable">
          <Timeline.Item status="current">
            <Timeline.Rail />
            <Timeline.Content>
              <TitleRow title="Produit ajouté" pill="Review" at="10:18" />
              <View
                style={{
                  // Its own top margin on top of the content's gap: the gap is the air
                  // between two lines of text, and a card set that close to the title it
                  // belongs to reads as part of it.
                  marginTop: theme.spacing(1.5),
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radius.lg,
                  overflow: 'hidden',
                  gap: 10,
                }}
              >
                <Image
                  source={PRODUCT}
                  style={{ width: '100%', aspectRatio: 16 / 10 }}
                  resizeMode="cover"
                />
                <View style={{ padding: 12, gap: 10 }}>
                  <Timeline.Description>
                    Le crop final est prêt pour la retouche : profil, détail des
                    lacets et vignette marketplace en file.
                  </Timeline.Description>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Chip size="sm" variant="secondary">
                      PDP hero
                    </Chip>
                    <Chip size="sm" variant="tertiary">
                      4 crops
                    </Chip>
                  </View>
                </View>
              </View>
            </Timeline.Content>
          </Timeline.Item>

          {[
            {
              title: 'Passe de lumière validée',
              at: '10:27',
              note: 'Le profil se lit clairement ; garder l’ombre extérieure douce.',
            },
            {
              title: 'Note résolue',
              at: '10:43',
              note: 'Le texte de la tuile aligné sur celui de la campagne.',
            },
            {
              title: 'Dossier de revue prêt',
              at: '11:06',
              note: 'Export du crop carré, de la vue PDP et de la vignette.',
            },
          ].map(step => (
            <Timeline.Item key={step.at} status="default">
              <Timeline.Rail />
              <Timeline.Content>
                <TitleRow title={step.title} at={step.at} />
                <Timeline.Description>{step.note}</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Section>
    </ScrollView>
  )
}

/**
 * A composed rail whose marker is an outlined circle around an icon.
 *
 * It is a **rail** rather than just a marker because the size is the rail's business: the
 * circle is wider and taller than the dot it replaces, so the rail has to be told — `marker`
 * is what keeps the icon on the title's line instead of half its own height below it.
 */
function RingRail({
  color,
  icon,
}: {
  color: string
  icon: (props: IconComponentProps) => React.ReactElement
}) {
  const theme = useXAUITheme()
  const { rail } = useTimeline()
  const side = rail.marker + 16

  return (
    <Timeline.Rail marker={side}>
      <Timeline.Connector edge="above" />
      <View
        style={{
          width: side,
          height: side,
          borderRadius: side / 2,
          borderWidth: 1.5,
          borderColor: color,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon as={icon} color={color} size={20} />
      </View>
      <Timeline.Connector edge="below" />
    </Timeline.Rail>
  )
}

/** The ring's hue, read from the status it stands for — `muted` is the separator's grey. */
function toneColor(
  theme: ReturnType<typeof useXAUITheme>,
  tone: RolloutStep['tone']
): string {
  if (tone === 'accent') return theme.colors.accent
  if (tone === 'warning') return theme.colors.warning
  if (tone === 'success') return theme.colors.success

  return theme.colors.muted
}

/** A title with an optional pill and a right-aligned time, on one row. */
function TitleRow({
  title,
  at,
  pill,
}: {
  title: string
  at: string
  pill?: string
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Timeline.Title>{title}</Timeline.Title>
      {pill ? (
        <Chip size="sm" variant="secondary">
          {pill}
        </Chip>
      ) : null}
      <Text
        style={{
          flex: 1,
          textAlign: 'right',
          color: theme.colors.muted,
          fontSize: theme.fontSizes.sm,
          // The same figures `Timeline.Leading` uses: a time written on the right is still a
          // column, and proportional digits are what make one read ragged.
          fontVariant: ['tabular-nums'],
        }}
      >
        {at}
      </Text>
    </View>
  )
}

/* The rollout audit's steps. The ring, its glyph and the connector take a status hue;
 * the pill beside the title is a status *word*, so it rides on the chip's own vocabulary.
 * Colours are resolved from the theme at render, so light and dark both stay correct. */
type RolloutStep = {
  at: string
  title: string
  note: string
  tone: 'muted' | 'accent' | 'warning' | 'success'
  icon: (props: IconComponentProps) => React.ReactElement
  pill: {
    label: string
    variant: 'secondary' | 'primary' | 'warning-soft' | 'success-soft'
  }
}

const ROLLOUT: RolloutStep[] = [
  {
    at: '09:12',
    title: 'Feature flag créé',
    note: 'Checkout-redesign créé pour le workspace de facturation.',
    tone: 'muted',
    icon: PlusSquareIcon,
    pill: { label: 'Owner assigné', variant: 'secondary' },
  },
  {
    at: '09:34',
    title: 'Rollout canary lancé',
    note: 'Activé pour 5 % des workspaces avec le replay de session.',
    tone: 'accent',
    icon: ShareIcon,
    pill: { label: 'Canary', variant: 'primary' },
  },
  {
    at: '09:51',
    title: 'Garde-fou régional déclenché',
    note: 'Latence en hausse dans eu-central-1 ; le rollout attend.',
    tone: 'warning',
    icon: ShieldAlertIcon,
    pill: { label: 'En pause', variant: 'warning-soft' },
  },
  {
    at: '10:05',
    title: 'Messagerie client prête',
    note: 'Macro support et changelog brouillon dans les notes de lancement.',
    tone: 'muted',
    icon: BellIcon,
    pill: { label: 'Docs', variant: 'secondary' },
  },
  {
    at: '10:30',
    title: 'Fenêtre de lancement planifiée',
    note: 'Le rollout complet attend le prochain balayage du budget d’erreur.',
    tone: 'muted',
    icon: BoxIcon,
    pill: { label: 'En file', variant: 'secondary' },
  },
  {
    at: '10:42',
    title: 'Checklist de release vérifiée',
    note: 'Owner du rollback et contrôles du dashboard enregistrés.',
    tone: 'success',
    icon: ShieldCheckIcon,
    pill: { label: 'Prêt', variant: 'success-soft' },
  },
]

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
