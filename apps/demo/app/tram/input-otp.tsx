import { useRef, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { InputOTP, OTP_ALPHANUMERIC } from '@xaui/tram/input-otp'
import type {
  InputOTPHandle,
  InputOTPProps,
  InputOTPSize,
  InputOTPVariant,
  OTPSlotState,
} from '@xaui/tram/input-otp'
import type { TramAccentName } from '@xaui/tram/theme'
import { Button } from '@xaui/tram/button'
import { TramSection } from '../../components/tram-section'

const SIZES: InputOTPSize[] = ['sm', 'md', 'lg']
const VARIANTS: InputOTPVariant[] = ['primary', 'secondary']
const ACCENTS: TramAccentName[] = ['lime', 'magenta']

/** The code the "vérifié" section accepts. */
const GOOD_CODE = '482913'

function boxes(slots: readonly OTPSlotState[]) {
  return slots.map(slot => <InputOTP.Box key={slot.index} index={slot.index} />)
}

/** Six boxes, in two groups of three with the dash between them. */
function SixDigits(props: Omit<InputOTPProps, 'maxLength' | 'children'>) {
  return (
    <InputOTP maxLength={6} {...props}>
      <InputOTP.Group>{({ slots }) => boxes(slots.slice(0, 3))}</InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>{({ slots }) => boxes(slots.slice(3))}</InputOTP.Group>
    </InputOTP>
  )
}

/**
 * Where the Tram `InputOTP` is verified, in dark and in light: the three sizes, the two
 * drawings, a code checked on completion, a pasted message, the placeholder, named
 * accents, a raw `color`, letters, disabled, the handle, and a narrow row.
 */
export default function TramInputOTPScreen() {
  const theme = useXAUITheme()
  const [code, setCode] = useState('')
  const [checked, setChecked] = useState<'idle' | 'ok' | 'wrong'>('idle')
  const handle = useRef<InputOTPHandle>(null)

  const note = { color: theme.colors.muted, fontSize: 13 }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — 36 × 44, 44 × 52, 52 × 60. Ligne pâle à vide, à l'encre une fois remplie, à l'accent sur la case en cours."
      >
        {SIZES.map(size => (
          <SixDigits key={size} size={size} defaultValue="48" />
        ))}
      </TramSection>

      <TramSection
        title="les dessins"
        note="primary : le fond dans une ligne. secondary : la surface discrète, sans ligne hors de la case en cours."
      >
        {VARIANTS.map(variant => (
          <SixDigits key={variant} variant={variant} defaultValue="482" />
        ))}
      </TramSection>

      <TramSection
        title="vérifié"
        note={`onComplete compare le code à ${GOOD_CODE}. Faux : toutes les lignes en danger. Collez « Votre code est ${GOOD_CODE} » : seul le code est pris.`}
      >
        <SixDigits
          value={code}
          onChangeText={next => {
            setCode(next)
            setChecked('idle')
          }}
          onComplete={next => setChecked(next === GOOD_CODE ? 'ok' : 'wrong')}
          isInvalid={checked === 'wrong'}
          placeholder="·"
        />
        <Text style={note}>
          {checked === 'ok'
            ? 'code accepté.'
            : checked === 'wrong'
              ? 'ce code ne correspond pas.'
              : `${code.length} sur 6`}
        </Text>
      </TramSection>

      <TramSection
        title="le handle"
        note="ref : focus, blur, clear — sans toucher les cases."
      >
        <InputOTP ref={handle} maxLength={6} defaultValue="4829">
          <InputOTP.Group>{({ slots }) => boxes(slots)}</InputOTP.Group>
        </InputOTP>
        <Button
          variant="outline"
          size="sm"
          alignSelf="flex-start"
          onPress={() => handle.current?.focus()}
        >
          focus
        </Button>
        <Button
          variant="outline"
          size="sm"
          alignSelf="flex-start"
          onPress={() => handle.current?.clear()}
        >
          effacer
        </Button>
      </TramSection>

      <TramSection
        title="accent et color"
        note="La case en cours et le curseur dans l'accent lu comme encre ; une teinte brute telle quelle."
      >
        {ACCENTS.map(accent => (
          <SixDigits key={accent} accent={accent} defaultValue="4" />
        ))}
        <SixDigits color={theme.colors.success} defaultValue="4" />
      </TramSection>

      <TramSection
        title="lettres et chiffres"
        note="pattern OTP_ALPHANUMERIC, clavier par défaut ; quatre cases, un seul groupe."
      >
        <InputOTP maxLength={4} pattern={OTP_ALPHANUMERIC} inputMode="text">
          <InputOTP.Group>{({ slots }) => boxes(slots)}</InputOTP.Group>
        </InputOTP>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Les lignes et les chiffres en gris, sans accent ; le champ ne prend pas le focus."
      >
        <SixDigits isDisabled defaultValue="4829" />
        <SixDigits isDisabled variant="secondary" defaultValue="4829" />
      </TramSection>

      <TramSection
        title="à l'étroit"
        note="Dans 220 points, les cases rétrécissent au lieu de déborder ; 44 au plus."
      >
        <SixDigits width={220} defaultValue="482913" />
      </TramSection>
    </ScrollView>
  )
}
