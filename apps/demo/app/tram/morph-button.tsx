import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { MorphButton, useMorphButton } from '@xaui/tram/morph-button'
import type { MorphButtonSize, MorphButtonVariant } from '@xaui/tram/morph-button'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const VARIANTS: MorphButtonVariant[] = ['contained', 'flat', 'outline', 'text']

const SIZES: MorphButtonSize[] = ['sm', 'md', 'lg']

/** One accent that takes black text, one that takes white. */
const ACCENTS: TramAccentName[] = ['lime', 'magenta']

const SHORT_NEWS = 'Chargement des nouveautés…'

const LONG_NEWS =
  "Trois accents ajoutés, le clavier numérique redessiné et un mode d'économie " +
  "d'énergie qui éteint les tuiles animées quand la batterie passe sous 20 %. " +
  'La boîte a grandi avec le texte : rien n’a été mesuré.'

function PlusIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v16M4 12h16" stroke={color} strokeWidth={3} />
    </Svg>
  )
}

/** A control inside the card, written against the root's `toggle`: it costs no state. */
function Fold() {
  const { toggle } = useMorphButton()

  return (
    <View style={{ flexDirection: 'row' }}>
      <Button size="sm" variant="outline" onPress={toggle}>
        replier
      </Button>
    </View>
  )
}

/**
 * Where the Tram `MorphButton` is verified, in dark and in light: the `Button` closed and
 * the same box open, its fill kept; the four variants, the three sizes, a controlled one,
 * a named `accent`, and a card whose sentence grows after it opened.
 */
export default function TramMorphButtonScreen() {
  const theme = useXAUITheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isNewsOpen, setIsNewsOpen] = useState(false)
  const [hasNews, setHasNews] = useState(false)

  // The sentence arrives after the card opened, as from the network: the box follows it.
  useEffect(() => {
    if (!isNewsOpen) return
    const timer = setTimeout(() => setHasNews(true), 1200)
    return () => clearTimeout(timer)
  }, [isNewsOpen])

  const toggleNews = (open: boolean) => {
    setIsNewsOpen(open)
    if (!open) setHasNews(false)
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les variantes"
        note="Fermé, c'est le Button. Ouvert, la même boîte grandit et garde son aplat."
      >
        {VARIANTS.map(variant => (
          <MorphButton key={variant} variant={variant} alignSelf="flex-start">
            <MorphButton.Collapsed>
              <MorphButton.Label>{variant}</MorphButton.Label>
            </MorphButton.Collapsed>
            <MorphButton.Expanded>
              <MorphButton.Title>nouveau thème</MorphButton.Title>
              <MorphButton.Description>
                Partir de l&apos;accent actuel et d&apos;un fond sombre, puis tout
                régler page par page.
              </MorphButton.Description>
            </MorphButton.Expanded>
          </MorphButton>
        ))}
      </TramSection>

      <TramSection
        title="les tailles"
        note="40, 48 et 56 fermé ; le titre et le cadre suivent la taille une fois ouvert."
      >
        {SIZES.map(size => (
          <MorphButton key={size} size={size} alignSelf="flex-start">
            <MorphButton.Collapsed>
              <MorphButton.Icon as={PlusIcon} />
              <MorphButton.Label>ajouter, {size}</MorphButton.Label>
            </MorphButton.Collapsed>
            <MorphButton.Expanded>
              <MorphButton.Icon as={PlusIcon} />
              <MorphButton.Title>ajouter un compte</MorphButton.Title>
              <MorphButton.Description>
                Courrier, calendrier et contacts, synchronisés au prochain démarrage.
              </MorphButton.Description>
            </MorphButton.Expanded>
          </MorphButton>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`L'état vit dans l'écran : ${isOpen ? 'ouvert' : 'fermé'}. Le bouton du dedans replie la carte.`}
      >
        <MorphButton
          variant="flat"
          isExpanded={isOpen}
          onExpandedChange={setIsOpen}
          alignSelf="flex-start"
        >
          <MorphButton.Collapsed>
            <MorphButton.Label>à propos des accents</MorphButton.Label>
          </MorphButton.Collapsed>
          <MorphButton.Expanded>
            <MorphButton.Title>vingt accents</MorphButton.Title>
            <MorphButton.Description>
              Les couleurs de Windows Phone, du lime au taupe. Le texte posé dessus
              est noir ou blanc selon la couleur.
            </MorphButton.Description>
            <Fold />
          </MorphButton.Expanded>
        </MorphButton>
        <View style={{ flexDirection: 'row' }}>
          <Button variant="text" onPress={() => setIsOpen(value => !value)}>
            {isOpen ? 'fermer depuis dehors' : 'ouvrir depuis dehors'}
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="accent"
        note="Un nom de la palette. Plein, du noir sur lime ; en trait ou en texte, une encre lisible."
      >
        {ACCENTS.flatMap(accent =>
          (['contained', 'outline'] as const).map(variant => (
            <MorphButton
              key={`${accent}-${variant}`}
              accent={accent}
              variant={variant}
              alignSelf="flex-start"
            >
              <MorphButton.Collapsed>
                <MorphButton.Label>
                  {accent}, {variant}
                </MorphButton.Label>
              </MorphButton.Collapsed>
              <MorphButton.Expanded>
                <MorphButton.Title>{accent}</MorphButton.Title>
                <MorphButton.Description>
                  L&apos;encre de la carte est celle du bouton fermé.
                </MorphButton.Description>
              </MorphButton.Expanded>
            </MorphButton>
          ))
        )}
      </TramSection>

      <TramSection
        title="le texte grandit"
        note="La phrase arrive une seconde après l'ouverture : la boîte la suit, sans mesure."
      >
        <MorphButton
          isExpanded={isNewsOpen}
          onExpandedChange={toggleNews}
          alignSelf="flex-start"
        >
          <MorphButton.Collapsed>
            <MorphButton.Label>quoi de neuf ?</MorphButton.Label>
          </MorphButton.Collapsed>
          <MorphButton.Expanded>
            <MorphButton.Title>quoi de neuf ?</MorphButton.Title>
            <MorphButton.Description>
              {hasNews ? LONG_NEWS : SHORT_NEWS}
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </TramSection>

      <TramSection
        title="désactivé, sans mouvement"
        note="Désactivé, il ne s'ouvre plus. animation={false} : la boîte saute, rien ne s'incline."
      >
        <MorphButton isDisabled alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Label>indisponible</MorphButton.Label>
          </MorphButton.Collapsed>
        </MorphButton>
        <MorphButton animation={false} variant="outline">
          <MorphButton.Collapsed>
            <MorphButton.Label>sans mouvement</MorphButton.Label>
          </MorphButton.Collapsed>
          <MorphButton.Expanded>
            <MorphButton.Title>sans mouvement</MorphButton.Title>
            <MorphButton.Description>
              Sans alignSelf, la boîte remplit la colonne, fermée comme ouverte.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </TramSection>
    </ScrollView>
  )
}
