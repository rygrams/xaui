import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Fab, FabMenu, useFab } from '@xaui/native/fab'
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
  const [tour, setTour] = useState(false)

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
          title="FabMenu"
          note="Le FAB ne bouge pas quand le menu s'ouvre. Le legacy re-rendait son FAB à l'intérieur du portail, à l'inset du portail, donc un FAB posé ailleurs sautait à travers l'écran au moment où on le pressait. Ici le déclencheur n'est jamais reparenté : il se mesure, et les actions se placent contre ce rectangle. Ce n'est pas un Menu non plus — un menu est une surface avec des rangées dedans, ici chaque action est sa propre pastille avec de l'air entre elles."
        >
          <View
            style={{
              height: 260,
              borderRadius: 16,
              backgroundColor: theme.colors.surfaceSecondary,
            }}
          >
            <FabMenu>
              <FabMenu.Trigger placement="bottom-end" accessibilityLabel="Nouveau">
                <Plus />
              </FabMenu.Trigger>
              <FabMenu.Overlay />
              <FabMenu.Content>
                <FabMenu.Item onPress={() => setChosen('Nouveau message')}>
                  Nouveau message
                </FabMenu.Item>
                <FabMenu.Item onPress={() => setChosen('Nouveau libellé')}>
                  Nouveau libellé
                </FabMenu.Item>
                <FabMenu.Item onPress={() => setChosen('Nouveau dossier')}>
                  Nouveau dossier
                </FabMenu.Item>
                <FabMenu.Item isDisabled>Bientôt</FabMenu.Item>
              </FabMenu.Content>
            </FabMenu>
          </View>

          <Text style={{ color: theme.colors.muted }}>Choisi : {chosen ?? '—'}</Text>

          <View style={{ flexDirection: 'row', gap: 24, alignItems: 'flex-end' }}>
            {SIZES.map(size => (
              <FabMenu key={size} size={size}>
                <FabMenu.Trigger accessibilityLabel={size}>
                  <Plus />
                </FabMenu.Trigger>
                <FabMenu.Overlay />
                <FabMenu.Content>
                  <FabMenu.Item>Une action</FabMenu.Item>
                  <FabMenu.Item>Une autre</FabMenu.Item>
                </FabMenu.Content>
              </FabMenu>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 24, alignItems: 'flex-end' }}>
            <FabMenu color="#0ea5e9">
              <FabMenu.Trigger color="#0ea5e9" accessibilityLabel="Teinté">
                <Plus />
              </FabMenu.Trigger>
              <FabMenu.Overlay />
              <FabMenu.Content>
                <FabMenu.Item>Teintée</FabMenu.Item>
                <FabMenu.Item>Teintée aussi</FabMenu.Item>
              </FabMenu.Content>
            </FabMenu>

            <FabMenu isDisabled>
              <FabMenu.Trigger accessibilityLabel="Indisponible">
                <Plus />
              </FabMenu.Trigger>
              <FabMenu.Overlay />
              <FabMenu.Content>
                <FabMenu.Item>Inatteignable</FabMenu.Item>
              </FabMenu.Content>
            </FabMenu>
          </View>
        </Section>

        <Section
          title="Fab.Discovery"
          note="Le FAB ne bouge pas, et il reste le FAB. Le legacy prenait un targetRef et dessinait une copie de ce qu'on lui passait en highlightContent : la chose enseignée était une image d'elle-même, non pressable, et juste seulement tant que l'appelant gardait la copie en phase. Ici la cible EST le Fab, hissé dans le portail à son propre rectangle mesuré — au-dessus du disque, toujours pressable, aux coordonnées qu'il occupait déjà. Le texte est mis en page à la corde du disque à sa hauteur, pas à son diamètre."
        >
          <View
            style={{
              height: 320,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: theme.colors.surfaceSecondary,
            }}
          >
            <Fab.Discovery isOpen={tour} onOpenChange={setTour}>
              <Fab.Discovery.Target
                placement="bottom-end"
                accessibilityLabel="Composer"
                onPress={() => setChosen('Composer')}
              >
                <Plus />
              </Fab.Discovery.Target>
              <Fab.Discovery.Overlay />
              <Fab.Discovery.Content>
                <Fab.Discovery.Title>Composez d’où vous voulez</Fab.Discovery.Title>
                <Fab.Discovery.Description>
                  Ce bouton suit chaque écran de la boîte de réception. Appuyez
                  dessus pour commencer un message sans revenir en arrière.
                </Fab.Discovery.Description>
                <Fab.Discovery.Action>Compris</Fab.Discovery.Action>
              </Fab.Discovery.Content>
            </Fab.Discovery>
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button variant="secondary" onPress={() => setTour(true)}>
              Montrer la découverte
            </Button>
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

      <FabMenu>
        <FabMenu.Trigger placement="bottom-end" accessibilityLabel="Nouveau message">
          <Plus />
        </FabMenu.Trigger>
        <FabMenu.Overlay />
        <FabMenu.Content>
          <FabMenu.Item onPress={() => setChosen('Message')}>Message</FabMenu.Item>
          <FabMenu.Item onPress={() => setChosen('Libellé')}>Libellé</FabMenu.Item>
          <FabMenu.Item onPress={() => setChosen('Dossier')}>Dossier</FabMenu.Item>
        </FabMenu.Content>
      </FabMenu>
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
