import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { EmptyState, useEmptyState } from '@xaui/native/empty-state'
import type { EmptyStateProps } from '@xaui/native/empty-state'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<EmptyStateProps['variant']>
type StateSize = NonNullable<EmptyStateProps['size']>

const VARIANTS: Variant[] = ['plain', 'surface', 'outlined']
const SIZES: StateSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * A mark drawn from two views, so the screen needs no icon set — an open envelope, which is
 * what an empty inbox looks like.
 */
function Glyph() {
  // What an `Icon` does: the size and the colour come from the media slot, not from here.
  const { icon } = useEmptyState()
  const size = icon.size ?? 28
  const color = icon.color
  const stroke = Math.max(1, Math.round(size / 14))

  return (
    <View style={{ width: size, height: size * 0.78 }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: size,
          height: size * 0.6,
          borderWidth: stroke,
          borderColor: color,
          borderRadius: stroke * 2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          start: size * 0.14,
          width: size * 0.72,
          height: size * 0.5,
          borderWidth: stroke,
          borderColor: color,
          borderBottomWidth: 0,
          borderTopStartRadius: stroke * 2,
          borderTopEndRadius: stroke * 2,
        }}
      />
    </View>
  )
}

/**
 * The verification screen for the `EmptyState`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function EmptyStateScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Le cas complet"
        note="L'en-tête et le contenu sont deux racines et non une colonne : l'écart entre une marque, un titre et une phrase n'est pas celui entre ce bloc et les boutons dessous, et R4 pose la mise en page sur une racine — donc deux écarts demandent deux racines."
      >
        <EmptyState variant="surface">
          <EmptyState.Header>
            <EmptyState.Media variant="icon">
              <Glyph />
            </EmptyState.Media>
            <EmptyState.Title>Aucun message</EmptyState.Title>
            <EmptyState.Description>
              Ce qu’on vous envoie arrivera ici. Rien à faire en attendant.
            </EmptyState.Description>
          </EmptyState.Header>

          <EmptyState.Content>
            <Button variant="tertiary">Actualiser</Button>
            <Button>Écrire un message</Button>
          </EmptyState.Content>
        </EmptyState>
      </Section>

      <Section
        title="Sans rien à faire"
        note="Un état vide sans action laisse EmptyState.Content dehors plutôt que de rendre une rangée vide avec un écart au-dessus. C'est ce que le fait d'avoir deux racines permet."
      >
        <EmptyState variant="surface">
          <EmptyState.Header>
            <EmptyState.Title>Rien à afficher</EmptyState.Title>
            <EmptyState.Description>
              Cette liste se remplira toute seule.
            </EmptyState.Description>
          </EmptyState.Header>
        </EmptyState>
      </Section>

      <Section
        title="Les trois variantes"
        note="plain est la valeur par défaut et ne dessine rien : la plupart des états vides remplissent un écran, et un écran a déjà un fond. outlined est celle qui n'est pas un fond — une arête pointillée autour de la place que le contenu occuperait, ce que veulent une cible de dépôt et une colonne vide."
      >
        {VARIANTS.map(variant => (
          <EmptyState key={variant} variant={variant} size="sm">
            <EmptyState.Header>
              <EmptyState.Media variant="icon">
                <Glyph />
              </EmptyState.Media>
              <EmptyState.Title>{variant}</EmptyState.Title>
              <EmptyState.Description>
                Le même bloc, sur trois fonds.
              </EmptyState.Description>
            </EmptyState.Header>
          </EmptyState>
        ))}
      </Section>

      <Section
        title="La media, avec ou sans son cercle"
        note="Une marque de 24 points seule au milieu d'un écran se lit comme une image qui n'a pas chargé. Le cercle lui donne une taille, et le fond estompé dit que c'est une marque et non une photographie. plain est la valeur par défaut, parce qu'un avatar ou une illustration apporte sa propre forme."
      >
        <EmptyState variant="surface" size="sm">
          <EmptyState.Header>
            <EmptyState.Media>
              <Glyph />
            </EmptyState.Media>
            <EmptyState.Title>plain</EmptyState.Title>
          </EmptyState.Header>
        </EmptyState>

        <EmptyState variant="surface" size="sm">
          <EmptyState.Header>
            <EmptyState.Media variant="icon">
              <Glyph />
            </EmptyState.Media>
            <EmptyState.Title>icon</EmptyState.Title>
          </EmptyState.Header>
        </EmptyState>
      </Section>

      <Section
        title="Les tailles"
        note="La media, les écarts et la typo. Jamais une hauteur : un état vide est aussi haut que ce qu'il y a dedans, et la hauteur de l'espace qu'il remplit est l'affaire de la mise en page."
      >
        {SIZES.map(size => (
          <EmptyState key={size} variant="surface" size={size}>
            <EmptyState.Header>
              <EmptyState.Media variant="icon">
                <Glyph />
              </EmptyState.Media>
              <EmptyState.Title>{size}</EmptyState.Title>
              <EmptyState.Description>Une phrase de plus.</EmptyState.Description>
            </EmptyState.Header>
          </EmptyState>
        ))}
      </Section>

      <Section
        title="Teinté"
        note="color est une valeur brute (R7) et va sur le cercle de la marque et sur l'arête. Jamais sur les mots : le texte d'un état vide est l'encre de la page, et le teinter ferait de la chose la plus discrète de l'écran la plus forte."
      >
        <EmptyState variant="outlined" color="#0ea5e9">
          <EmptyState.Header>
            <EmptyState.Media variant="icon">
              <Glyph />
            </EmptyState.Media>
            <EmptyState.Title>Déposez un fichier ici</EmptyState.Title>
            <EmptyState.Description>
              PNG ou JPEG, 10 Mo au plus.
            </EmptyState.Description>
          </EmptyState.Header>
          <EmptyState.Content>
            <Button size="sm">Parcourir</Button>
          </EmptyState.Content>
        </EmptyState>
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
