import { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { NumberField } from '@xaui/tram/number-field'
import type { NumberFieldSize } from '@xaui/tram/number-field'
import { TramSection } from '../../components/tram-section'

const SIZES: NumberFieldSize[] = ['sm', 'md', 'lg']

const EURO: Intl.NumberFormatOptions = { style: 'currency', currency: 'EUR' }

/**
 * Where the Tram `NumberField` is verified, in dark and in light: the three sizes, the
 * bounds that turn a stepper out, controlled and not, a currency and a fractional step,
 * invalid, disabled, a named accent, the field on its own, and the style props.
 */
export default function TramNumberFieldScreen() {
  const theme = useXAUITheme()
  const [copies, setCopies] = useState<number | null>(1)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut ; des cases de 36, 44, 52 aux deux bouts, la valeur centrée en chiffres tabulaires."
      >
        {SIZES.map(size => (
          <NumberField key={size} size={size} defaultValue={4} min={0} max={10}>
            <NumberField.Label>{size}</NumberField.Label>
            <NumberField.Group>
              <NumberField.Decrement accessibilityLabel="un de moins" />
              <NumberField.Field />
              <NumberField.Increment accessibilityLabel="un de plus" />
            </NumberField.Group>
            <NumberField.Description>entre 0 et 10.</NumberField.Description>
          </NumberField>
        ))}
      </TramSection>

      <TramSection
        title="aux bornes"
        note="Au minimum le moins s'éteint, au maximum le plus : gris, et il ne prend plus d'appui."
      >
        <NumberField defaultValue={0} min={0} max={3}>
          <NumberField.Label>au minimum</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un de plus" />
          </NumberField.Group>
        </NumberField>
        <NumberField defaultValue={3} min={0} max={3}>
          <NumberField.Label>au maximum</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un de plus" />
          </NumberField.Group>
        </NumberField>
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`Deux champs sur le même état, bornés de 1 à 5. Valeur : ${copies ?? 'vide'}`}
      >
        <NumberField value={copies} onValueChange={setCopies} min={1} max={5}>
          <NumberField.Label>exemplaires</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un exemplaire de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un exemplaire de plus" />
          </NumberField.Group>
        </NumberField>
        <NumberField
          size="sm"
          value={copies}
          onValueChange={setCopies}
          min={1}
          max={5}
        >
          <NumberField.Label>le même état</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un exemplaire de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un exemplaire de plus" />
          </NumberField.Group>
        </NumberField>
      </TramSection>

      <TramSection
        title="format et pas"
        note="Hors du champ, la valeur est écrite par Intl ; au focus, elle est réécrite simplement. Un pas de 0,5 ouvre le pavé décimal."
      >
        <NumberField
          locale="fr-FR"
          formatOptions={EURO}
          defaultValue={34}
          min={0}
          step={0.5}
        >
          <NumberField.Label>prix</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="cinquante centimes de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="cinquante centimes de plus" />
          </NumberField.Group>
        </NumberField>
      </TramSection>

      <TramSection
        title="invalide et désactivé"
        note="Invalide : la boîte en danger, focus compris. Désactivé : la boîte, la valeur et les marques en gris."
      >
        <NumberField isInvalid defaultValue={12} min={0} max={10}>
          <NumberField.Label>quantité</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un de plus" />
          </NumberField.Group>
          <NumberField.Error>dix au plus.</NumberField.Error>
        </NumberField>
        <NumberField isDisabled defaultValue={2}>
          <NumberField.Label>verrouillé</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un de plus" />
          </NumberField.Group>
        </NumberField>
      </TramSection>

      <TramSection
        title="accent"
        note="Au focus, la ligne de la boîte est l'accent lu comme encre."
      >
        <NumberField accent="magenta" defaultValue={1}>
          <NumberField.Label>magenta</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un de plus" />
          </NumberField.Group>
        </NumberField>
      </TramSection>

      <TramSection
        title="le champ seul"
        note="Sans Group, NumberField.Field est un champ Tram ordinaire, sa propre ligne autour de lui, sans boutons."
      >
        <NumberField defaultValue={1984}>
          <NumberField.Label>année</NumberField.Label>
          <NumberField.Field />
        </NumberField>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de style est une prop, sur la racine comme sur les slots."
      >
        <NumberField maxWidth={200} defaultValue={7}>
          <NumberField.Label>étroit</NumberField.Label>
          <NumberField.Group>
            <NumberField.Decrement accessibilityLabel="un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="un de plus">
              <Text style={{ color: theme.colors.foreground }}>+1</Text>
            </NumberField.Increment>
          </NumberField.Group>
          <NumberField.Description>
            un enfant remplace la marque dessinée.
          </NumberField.Description>
        </NumberField>
      </TramSection>
    </ScrollView>
  )
}
