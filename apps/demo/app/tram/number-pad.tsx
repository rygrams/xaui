import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { NumberPad } from '@xaui/tram/number-pad'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const CODE = '2580'
const CODE_LENGTH = 4
const ASTERISK_SIDE = 28
const ASTERISK_BAR = 2.5

/** One asterisk of the code field: three bars crossing, square ends. Grey while empty. */
function Asterisk({ color }: { color: string }) {
  return (
    <View style={{ width: ASTERISK_SIDE, height: ASTERISK_SIDE }}>
      {[90, 30, -30].map(angle => (
        <View
          key={angle}
          style={{
            position: 'absolute',
            top: (ASTERISK_SIDE - ASTERISK_BAR) / 2,
            start: 0,
            width: ASTERISK_SIDE,
            height: ASTERISK_BAR,
            backgroundColor: color,
            transform: [{ rotate: `${angle}deg` }],
          }}
        />
      ))}
    </View>
  )
}

/**
 * Where the Tram `NumberPad` is verified, in dark and in light: a door code shown as
 * asterisks in a field drawn by the screen, an amount with a decimal key in the free
 * corner, the three sizes and disabled.
 */
export default function TramNumberPadScreen() {
  const theme = useXAUITheme()
  const [code, setCode] = useState('')
  const [verdict, setVerdict] = useState<'open' | 'wrong' | null>(null)
  const [amount, setAmount] = useState('12')

  // The verdict stays a moment, then the field is empty again.
  useEffect(() => {
    if (verdict === null) return
    const timer = setTimeout(() => {
      setVerdict(null)
      setCode('')
    }, 1400)
    return () => clearTimeout(timer)
  }, [verdict])

  const ink =
    verdict === 'open'
      ? theme.colors.accent
      : verdict === 'wrong'
        ? theme.colors.danger
        : theme.colors.foreground

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="un code"
        note="Le composeur Metro : les chiffres seuls sur le fond, centrés. Le champ est celui de l'écran, un astérisque par chiffre. Essayez 2580."
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
            height: 56,
            alignItems: 'center',
          }}
        >
          {Array.from({ length: CODE_LENGTH }, (_, index) => (
            <Asterisk
              key={index}
              color={index < code.length ? ink : theme.colors.surface}
            />
          ))}
        </View>
        <Typography
          variant="caption"
          color={verdict === 'wrong' ? theme.colors.danger : theme.colors.muted}
          textAlign="center"
        >
          {verdict === 'open'
            ? 'porte ouverte'
            : verdict === 'wrong'
              ? 'code faux, recommencez'
              : `${CODE_LENGTH} chiffres`}
        </Typography>
        <NumberPad
          value={code}
          onChangeText={setCode}
          maxLength={CODE_LENGTH}
          isDisabled={verdict !== null}
          onComplete={entered => setVerdict(entered === CODE ? 'open' : 'wrong')}
        >
          <NumberPad.Action
            onPress={() => setCode('')}
            accessibilityLabel="tout effacer"
          >
            <NumberPad.Label>effacer</NumberPad.Label>
          </NumberPad.Action>
        </NumberPad>
      </TramSection>

      <TramSection
        title="un montant"
        note="Sans maxLength, la valeur n'a pas de borne ; la virgule est une touche du coin libre. Un appui long sur le retour vide tout."
      >
        <Typography variant="section" alignSelf="flex-end">
          {`${amount || '0'} €`}
        </Typography>
        <NumberPad value={amount} onChangeText={setAmount} size="sm">
          <NumberPad.Key value="," />
        </NumberPad>
      </TramSection>

      <TramSection
        title="grand et désactivé"
        note="lg : des touches de 64, le chiffre sur pivot. Désactivé : tout en gris, aucun appui."
      >
        <NumberPad size="lg" />
        <NumberPad isDisabled size="sm" />
      </TramSection>
    </ScrollView>
  )
}
