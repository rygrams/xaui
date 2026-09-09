import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import { InputOTP } from '@xaui/native/input-otp'
import { NumberPad, useNumberPad } from '@xaui/native/number-pad'
import type { NumberPadSize, NumberPadVariant } from '@xaui/native/number-pad'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: NumberPadVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
]

const SIZES: NumberPadSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `NumberPad`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the pure value
 * functions.
 *
 * What each section checks is in its subtitle: the grid is rendered rather than composed, the
 * free corner is the one thing `children` fills, `maxLength` clamps instead of truncating,
 * the five variants name tokens and nothing else, `size` moves the key height and the type
 * and never a width, a raw `color` reaches the filled keys and deliberately not the bare
 * ones, and every cell presses on its own.
 */
export default function NumberPadScreen() {
  const theme = useXAUITheme()
  const [pin, setPin] = useState('')
  const [amount, setAmount] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Le pavé, sans rien composer"
        note="1 à 9, le 0 et le retour arrière ne sont pas une décision de l'appelant : la racine les rend. Onze cellules écrites à la main sont une grille qui se contredit dès qu'on en édite une."
      >
        <NumberPad />
      </Section>

      <Section
        title="Avec une longueur maximale"
        note="maxLength borne au lieu de tronquer : une pression au-delà ne change rien, donc onChangeText ne part pas et un code complet ne peut pas être validé deux fois en s'appuyant sur une touche. onComplete part à l'arrivée."
      >
        <View style={{ alignItems: 'center', gap: 8 }}>
          <InputOTP maxLength={4} value={pin} size="sm">
            <InputOTP.Group>
              {({ slots }) =>
                slots.map(slot => (
                  <InputOTP.Box key={slot.index} index={slot.index} />
                ))
              }
            </InputOTP.Group>
          </InputOTP>
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            {unlocked ? 'Code complet' : 'Entrez un code à 4 chiffres'}
          </Text>
        </View>

        <NumberPad
          maxLength={4}
          value={pin}
          onChangeText={next => {
            setPin(next)
            if (next.length < 4) setUnlocked(false)
          }}
          onComplete={() => setUnlocked(true)}
        />
      </Section>

      <Section
        title="Le coin libre"
        note="children remplit une cellule, celle qui reste en bas face au retour arrière. NumberPad.Action ne fait rien de lui-même — ce qui va là est à l'appelant. Sans elle, le coin reste une cellule, sinon le 0 glisserait en début de rangée."
      >
        <NumberPad>
          <NumberPad.Action
            accessibilityLabel="Déverrouiller par empreinte"
            onPress={() => setPin('1234')}
          >
            <NumberPad.Icon as={FingerprintIcon} color={theme.colors.accent} />
          </NumberPad.Action>
        </NumberPad>
      </Section>

      <Section
        title="Une onzième touche"
        note="NumberPad.Key est exportée pour ça : une virgule décimale ou un 00 sur un pavé de montant. value est ce qu'elle insère, et ce qu'elle affiche."
      >
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: theme.fontSizes['2xl'],
            fontWeight: theme.fontWeights.semibold,
            textAlign: 'center',
          }}
        >
          {amount === '' ? '0' : amount} €
        </Text>

        <NumberPad value={amount} onChangeText={setAmount} maxLength={9}>
          <NumberPad.Key value="," />
        </NumberPad>

        <Button
          variant="tertiary"
          alignSelf="flex-start"
          onPress={() => setAmount('')}
        >
          Effacer
        </Button>
      </Section>

      <Section
        title="Les cinq variantes"
        note="Cinq niveaux d'emphase et aucune intention : il n'existe pas de pavé danger. default est ce que le composant embarque, là où le Button embarque primary — onze touches dans l'accent sont un mur de couleur."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 8 }}>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {variant}
            </Text>
            <NumberPad variant={variant} size="sm" />
          </View>
        ))}
      </Section>

      <Section
        title="Les trois tailles"
        note="La hauteur d'une touche est un contrôle et demi, dérivée de controlHeights : on la frappe au pouce, onze fois de suite. xs est absent — 48 points portant un chiffre de 24 est un contrôle qui se fait passer pour une touche. Aucune largeur dans la recette."
      >
        {SIZES.map(size => (
          <View key={size} style={{ gap: 8 }}>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {size}
            </Text>
            <NumberPad size={size} />
          </View>
        ))}
      </Section>

      <Section
        title="Un tint, et les cellules nues"
        note="color atteint les touches pleines et volontairement pas les nues : une glyphe sans fond propre n'a rien de teinté sur quoi se lire. Le retour arrière garde le premier plan de la page — sur un pavé primary il prendrait blanc sur blanc."
      >
        <NumberPad color="#7c3aed" variant="primary" size="sm" />
      </Section>

      <Section
        title="Piloté depuis l'extérieur, et désactivé"
        note="useNumberPad() publie insert, backspace et clear, donc une commande à côté du pavé le conduit sans état propre. Un appui long sur le retour arrière vide tout. isDisabled éteint chaque touche."
      >
        <NumberPad size="sm" maxLength={6}>
          <NumberPad.Action accessibilityLabel="Tout effacer">
            <Clear />
          </NumberPad.Action>
        </NumberPad>

        <NumberPad isDisabled size="sm" />
      </Section>
    </ScrollView>
  )
}

/** A control inside a cell, written against the context — il ne coûte aucun état. */
function Clear() {
  const { clear } = useNumberPad()
  const theme = useXAUITheme()

  return (
    <Text
      onPress={clear}
      style={{
        color: theme.colors.danger,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
      }}
    >
      C
    </Text>
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

function FingerprintIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
      <Path
        d="M12 5a7 7 0 00-7 7m14 0a7 7 0 00-3.5-6.06M6.5 18A7 7 0 0019 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
