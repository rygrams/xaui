import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Fab, useFab } from '@xaui/native/fab'
import type { FabProps } from '@xaui/native/fab'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<FabProps['variant']>
type FabScale = NonNullable<FabProps['size']>

const VARIANTS: Variant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'success',
  'success-soft',
  'warning',
  'warning-soft',
  'danger',
  'danger-soft',
]
const SIZES: FabScale[] = ['sm', 'md', 'lg']

/** A plus, drawn from two bars, so the screen needs no icon set. */
function Plus() {
  // What an `Icon` does: the size and the colour come from the FAB, not from here.
  const { icon } = useFab()
  const size = icon.size ?? 24
  const bar = Math.max(2, Math.round(size / 10))

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: size * 0.72,
          height: bar,
          borderRadius: bar,
          backgroundColor: icon.color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: bar,
          height: size * 0.72,
          borderRadius: bar,
          backgroundColor: icon.color,
        }}
      />
    </View>
  )
}

/**
 * The verification screen for the `Fab`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function FabScreen() {
  const theme = useXAUITheme()
  const [busy, setBusy] = useState(false)
  const [chosen, setChosen] = useState<string | null>(null)

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 140 }}
      >
        <Section
          title="Rond, et étendu"
          note="isExtended est une prop plutôt que « il y a un Fab.Label là-dedans » : la recette de la racine se résout avant ses enfants, donc la forme doit être connue quand la boîte est mesurée, et la boîte est mesurée avant que l'étiquette qu'elle contient existe."
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Fab accessibilityLabel="Nouveau message">
              <Plus />
            </Fab>

            <Fab isExtended>
              <Plus />
              <Fab.Label>Nouveau</Fab.Label>
            </Fab>

            <Fab isExtended>Composer</Fab>
          </View>
        </Section>

        <Section
          title="Les trois tailles"
          note="Material mesurées, et celles du legacy : 40, 56 et 96 points de côté. L'étendu garde la hauteur et abandonne la largeur, ce qui met un rond et un étendu sur la même ligne à la même hauteur."
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {SIZES.map(size => (
              <Fab key={size} size={size} accessibilityLabel={size}>
                <Plus />
              </Fab>
            ))}
          </View>

          <View style={{ gap: 12, alignItems: 'flex-start' }}>
            {SIZES.map(size => (
              <Fab key={size} size={size} isExtended>
                <Plus />
                <Fab.Label>{size}</Fab.Label>
              </Fab>
            ))}
          </View>
        </Section>

        <Section
          title="La table du Button, jeton pour jeton"
          note="Les mêmes sept intentions — le FAB par-dessus lequel il flotte est aussi bien une suppression qu'une rédaction. Ce n'est pas la recette du Button pour autant : un bouton est une rangée de texte avec du padding, et ceci est un carré fixe qui porte une ombre au repos."
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {VARIANTS.map(variant => (
              <Fab
                key={variant}
                variant={variant}
                size="sm"
                accessibilityLabel={variant}
              >
                <Plus />
              </Fab>
            ))}
          </View>
        </Section>

        <Section
          title="Teinté, chargé, désactivé"
          note="isLoading échange la marque contre un anneau et coupe la pression ; l'étiquette reste. L'anneau est celui que la recette possède, donc il suit la taille et la variante sans rien à passer."
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Fab color="#0ea5e9" accessibilityLabel="Teinté">
              <Plus />
            </Fab>

            <Fab isLoading accessibilityLabel="En cours" />

            <Fab isDisabled accessibilityLabel="Indisponible">
              <Plus />
            </Fab>
          </View>

          <Fab
            isExtended
            isLoading={busy}
            onPress={() => {
              setBusy(true)
              setTimeout(() => setBusy(false), 1600)
            }}
          >
            <Fab.Label>{busy ? 'Envoi…' : 'Envoyer'}</Fab.Label>
          </Fab>
        </Section>

        <Section
          title="Le radius, si vraiment"
          note="full est la valeur par défaut et c'est ce qui en fait un FAB. Le changer donne un carré arrondi — ce que certains systèmes appellent encore un FAB, et que celui-ci sait faire."
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Fab radius="lg" accessibilityLabel="lg">
              <Plus />
            </Fab>
            <Fab radius="2xl" isExtended>
              <Plus />
              <Fab.Label>2xl</Fab.Label>
            </Fab>
          </View>
        </Section>

        <Section
          title="Fab.Menu"
          note="Le FAB ne bouge pas quand le menu s'ouvre. Le legacy re-rendait son FAB à l'intérieur du portail, à l'inset du portail, donc un FAB posé ailleurs sautait à travers l'écran au moment où on le pressait. Ici le déclencheur n'est jamais reparenté : il se mesure, et les actions se placent contre ce rectangle. Ce n'est pas un Menu non plus — un menu est une surface avec des rangées dedans, ici chaque action est sa propre pastille avec de l'air entre elles."
        >
          <View
            style={{
              height: 260,
              borderRadius: 16,
              backgroundColor: theme.colors.surfaceSecondary,
            }}
          >
            <Fab.Menu>
              <Fab.Menu.Trigger placement="bottom-end" accessibilityLabel="Nouveau">
                <Plus />
              </Fab.Menu.Trigger>
              <Fab.Menu.Overlay backgroundColor={theme.colors.backdrop} />
              <Fab.Menu.Content>
                <Fab.Menu.Item onPress={() => setChosen('Nouveau message')}>
                  Nouveau message
                </Fab.Menu.Item>
                <Fab.Menu.Item onPress={() => setChosen('Nouveau libellé')}>
                  Nouveau libellé
                </Fab.Menu.Item>
                <Fab.Menu.Item onPress={() => setChosen('Nouveau dossier')}>
                  Nouveau dossier
                </Fab.Menu.Item>
                <Fab.Menu.Item isDisabled>Bientôt</Fab.Menu.Item>
              </Fab.Menu.Content>
            </Fab.Menu>
          </View>

          <Text style={{ color: theme.colors.muted }}>Choisi : {chosen ?? '—'}</Text>

          <View style={{ flexDirection: 'row', gap: 24, alignItems: 'flex-end' }}>
            {SIZES.map(size => (
              <Fab.Menu key={size} size={size}>
                <Fab.Menu.Trigger accessibilityLabel={size}>
                  <Plus />
                </Fab.Menu.Trigger>
                <Fab.Menu.Overlay />
                <Fab.Menu.Content>
                  <Fab.Menu.Item>Une action</Fab.Menu.Item>
                  <Fab.Menu.Item>Une autre</Fab.Menu.Item>
                </Fab.Menu.Content>
              </Fab.Menu>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 24, alignItems: 'flex-end' }}>
            <Fab.Menu color="#0ea5e9">
              <Fab.Menu.Trigger color="#0ea5e9" accessibilityLabel="Teinté">
                <Plus />
              </Fab.Menu.Trigger>
              <Fab.Menu.Overlay />
              <Fab.Menu.Content>
                <Fab.Menu.Item>Teintée</Fab.Menu.Item>
                <Fab.Menu.Item>Teintée aussi</Fab.Menu.Item>
              </Fab.Menu.Content>
            </Fab.Menu>

            <Fab.Menu isDisabled>
              <Fab.Menu.Trigger accessibilityLabel="Indisponible">
                <Plus />
              </Fab.Menu.Trigger>
              <Fab.Menu.Overlay />
              <Fab.Menu.Content>
                <Fab.Menu.Item>Inatteignable</Fab.Menu.Item>
              </Fab.Menu.Content>
            </Fab.Menu>
          </View>
        </Section>

        <Section
          title="placement"
          note="Non renseigné il est dans le flux, ce que veut un FAB dans une carte ou une barre d'outils. Les trois autres l'épinglent en bas de son ancêtre positionné le plus proche — start et end plutôt que gauche et droite, donc une mise en page de droite à gauche le déplace sans deuxième branche. Celui de cet écran est épinglé en bas à droite, par-dessus le défilement."
        >
          <View
            style={{
              height: 140,
              borderRadius: 16,
              backgroundColor: theme.colors.surfaceSecondary,
            }}
          >
            <Fab placement="bottom-start" size="sm" accessibilityLabel="Début">
              <Plus />
            </Fab>
            <Fab placement="bottom-center" size="sm" accessibilityLabel="Centre">
              <Plus />
            </Fab>
            <Fab placement="bottom-end" size="sm" accessibilityLabel="Fin">
              <Plus />
            </Fab>
          </View>
        </Section>
      </ScrollView>

      <Fab.Menu>
        <Fab.Menu.Trigger
          placement="bottom-end"
          accessibilityLabel="Nouveau message"
        >
          <Plus />
        </Fab.Menu.Trigger>
        <Fab.Menu.Overlay backgroundColor={theme.colors.backdrop} />
        <Fab.Menu.Content>
          <Fab.Menu.Item onPress={() => setChosen('Message')}>Message</Fab.Menu.Item>
          <Fab.Menu.Item onPress={() => setChosen('Libellé')}>Libellé</Fab.Menu.Item>
          <Fab.Menu.Item onPress={() => setChosen('Dossier')}>Dossier</Fab.Menu.Item>
        </Fab.Menu.Content>
      </Fab.Menu>
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
