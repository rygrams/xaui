import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Card } from '@xaui/tram/card'
import type { CardSize, CardVariant } from '@xaui/tram/card'
import { TramSection } from '../../components/tram-section'

const VARIANTS: CardVariant[] = ['default', 'secondary', 'tertiary', 'ghost']

const SIZES: CardSize[] = ['sm', 'md', 'lg']

const COVER = { uri: 'https://picsum.photos/seed/tram-card/800/480' }

/**
 * Where the Tram `Card` is verified, in dark and in light: the mock-up's card, the four
 * grounds, the sizes, a photo behind the text, a pressable card that leans, and colour.
 */
export default function TramCardScreen() {
  const theme = useXAUITheme()
  const [count, setCount] = useState(0)
  const press = () => setCount(value => value + 1)
  const [actions, setActions] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="la carte"
        note="La surface discrète, sans trait ni ombre : un titre, un détail un rôle plus bas, et les actions en rangée."
      >
        <Card>
          <Card.Header>
            <Card.Title>marché de nuit</Card.Title>
            <Card.Description>ce soir, 21 h, place du marché</Card.Description>
          </Card.Header>
          <Card.Body>
            <Card.Description>
              Le contenu est posé sur la surface, séparé par l'espace et la
              typographie.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button variant="outline" size="sm" onPress={press}>
              j'y vais
            </Button>
            <Button variant="text" size="sm" onPress={press}>
              plus tard
            </Button>
          </Card.Footer>
        </Card>
      </TramSection>

      <TramSection
        title="les quatre sols"
        note="default, secondary, tertiary (le trait de 3) et ghost : rien, le contenu sur la page comme Metro."
      >
        {VARIANTS.map(variant => (
          <Card key={variant} variant={variant}>
            <Card.Title>{variant}</Card.Title>
            <Card.Description>une carte de ce sol</Card.Description>
          </Card>
        ))}
      </TramSection>

      <TramSection
        title="les tailles"
        note="Le titre en body, subtitle et title ; le détail en caption, caption et body."
      >
        {SIZES.map(size => (
          <Card key={size} size={size}>
            <Card.Title>{size}</Card.Title>
            <Card.Description>
              la marge et le texte suivent la taille
            </Card.Description>
          </Card>
        ))}
      </TramSection>

      <TramSection
        title="une photo derrière"
        note="Card.Background est peint en premier, où qu'il soit écrit, et coupé au coin de la carte."
      >
        <Card variant="ghost" style={{ minHeight: 180, justifyContent: 'flex-end' }}>
          <Card.Header>
            <Card.Title color="#FFFFFF">marrakech</Card.Title>
            <Card.Description color="#FFFFFF">écrit avant la photo</Card.Description>
          </Card.Header>
          <Card.Background source={COVER} />
        </Card>
      </TramSection>

      <TramSection
        title="une carte qu'on presse"
        note={`isPressable : la carte penche vers le doigt, ses couleurs ne bougent pas ; le bouton du pied reçoit son propre appui. Carte : ${count}, bouton : ${actions}`}
      >
        <Card isPressable onPress={press}>
          <Card.Header>
            <Card.Title>ouvrir le détail</Card.Title>
            <Card.Description>appuyez près d'un bord</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setActions(value => value + 1)}
            >
              partager
            </Button>
          </Card.Footer>
        </Card>
        <Card isPressable isDisabled onPress={press}>
          <Card.Title>désactivée</Card.Title>
          <Card.Description>atténuée, et le toucher ne passe pas</Card.Description>
        </Card>
      </TramSection>

      <TramSection
        title="en couleur"
        note="Un accent remplit default et secondary, le titre dans l'encre qui s'y lit ; sur tertiary et ghost il est le trait ou le titre, en encre."
      >
        <View style={{ gap: 12 }}>
          <Card accent="cobalt">
            <Card.Title>default, cobalt</Card.Title>
            <Card.Description>le détail reste lisible sur l'aplat</Card.Description>
          </Card>
          <Card variant="secondary" accent="lime">
            <Card.Title>secondary, lime</Card.Title>
            <Card.Description>encre noire sur le lime</Card.Description>
          </Card>
          <Card variant="tertiary" accent="magenta">
            <Card.Title>tertiary, magenta</Card.Title>
          </Card>
          <Card variant="ghost" color="#7c3aed">
            <Card.Title>ghost, brut</Card.Title>
          </Card>
        </View>
      </TramSection>
    </ScrollView>
  )
}
