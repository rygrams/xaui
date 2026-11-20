import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { DummyField } from '@xaui/tram/dummy-field'
import type { DummyFieldSize } from '@xaui/tram/dummy-field'
import { TramSection } from '../../components/tram-section'

const SIZES: DummyFieldSize[] = ['sm', 'md', 'lg']

const SLOTS = [
  'jeudi 21 nov. · 8 h – 10 h',
  'jeudi 21 nov. · 12 h – 14 h',
  'vendredi 22 nov. · 8 h – 10 h',
  'samedi 23 nov. · 10 h – 12 h',
]

/**
 * Where the Tram `DummyField` is verified, in dark and in light: the three sizes, a value
 * and a placeholder, the press that turns the line to the accent, the label that presses
 * the field, the indicator, invalid, disabled, a named accent and the style props.
 */
export default function TramDummyFieldScreen() {
  const theme = useXAUITheme()
  const [slot, setSlot] = useState(0)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [relay, setRelay] = useState<string | undefined>(undefined)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="un appui"
        note="La boîte du TextField, sans saisie. Sous le doigt la ligne prend l'accent, au relâchement elle le rend. Toucher le libellé fait de même."
      >
        <DummyField onPress={() => setSlot(current => (current + 1) % SLOTS.length)}>
          <DummyField.Label>livraison</DummyField.Label>
          <DummyField.Field>{SLOTS[slot]}</DummyField.Field>
          <DummyField.Description>
            touchez pour changer de créneau.
          </DummyField.Description>
        </DummyField>
        <DummyField
          onPress={() =>
            setAddress(current =>
              current ? undefined : '12 rue des Martyrs, Paris 9e'
            )
          }
        >
          <DummyField.Label>adresse</DummyField.Label>
          <DummyField.Field placeholder="choisir une adresse" value={address} />
        </DummyField>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut, la valeur sur l'échelle du TextField."
      >
        {SIZES.map(size => (
          <DummyField key={size} size={size} onPress={() => undefined}>
            <DummyField.Label>{size}</DummyField.Label>
            <DummyField.Field>Lyon, Part-Dieu</DummyField.Field>
          </DummyField>
        ))}
      </TramSection>

      <TramSection
        title="l'indicateur"
        note="Écrit, il pose le chevron du Select au bout de la ligne ; sans lui, la valeur est seule, comme un champ Metro."
      >
        <DummyField onPress={() => undefined}>
          <DummyField.Label>pays</DummyField.Label>
          <DummyField.Field>
            <DummyField.Value placeholder="choisir un pays">France</DummyField.Value>
            <DummyField.Indicator />
          </DummyField.Field>
        </DummyField>
      </TramSection>

      <TramSection
        title="invalide et désactivé"
        note="Invalide : la ligne en danger et l'erreur dessous, le libellé garde son encre. Désactivé : tout en gris, aucun appui."
      >
        <DummyField
          isInvalid={!relay}
          onPress={() =>
            setRelay(current => (current ? undefined : 'Tabac des Abbesses'))
          }
        >
          <DummyField.Label>point relais</DummyField.Label>
          <DummyField.Field placeholder="aucun" value={relay} />
          {relay ? null : (
            <DummyField.Error>choisissez un point relais.</DummyField.Error>
          )}
        </DummyField>
        <DummyField isDisabled onPress={() => undefined}>
          <DummyField.Label>verrouillé</DummyField.Label>
          <DummyField.Field>
            <DummyField.Value>Marseille</DummyField.Value>
            <DummyField.Indicator />
          </DummyField.Field>
        </DummyField>
      </TramSection>

      <TramSection
        title="accent et props de style"
        note="Sous le doigt, la ligne est l'accent nommé, lu comme encre. Toute clé de style est une prop."
      >
        <DummyField accent="lime" onPress={() => undefined}>
          <DummyField.Label>lime</DummyField.Label>
          <DummyField.Field>appuyez ici</DummyField.Field>
        </DummyField>
        <DummyField maxWidth={220} onPress={() => undefined}>
          <DummyField.Label>étroit</DummyField.Label>
          <DummyField.Field>
            une valeur bien trop longue pour la boîte
          </DummyField.Field>
        </DummyField>
      </TramSection>
    </ScrollView>
  )
}
