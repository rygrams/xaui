import { useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { InputOTP, OTP_ALPHANUMERIC } from '@xaui/native/input-otp'
import type {
  InputOTPHandle,
  InputOTPRenderState,
  InputOTPVariant,
} from '@xaui/native/input-otp'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: InputOTPVariant[] = ['primary', 'secondary', 'tertiary']

/** The render function every group takes. Written once here rather than six times. */
const boxes = ({ slots }: InputOTPRenderState) =>
  slots.map(slot => <InputOTP.Box key={slot.index} index={slot.index} />)

/**
 * The verification screen for the `InputOTP`. A component is verified here and in the
 * docs preview, in light and in dark — the only test file is the one on its pure helpers.
 *
 * What each section checks is in its subtitle: one hidden input holds the whole code, the
 * active box takes a ring the others do not, a paste out of a message keeps only the
 * code, `onComplete` fires on the last character, and the three levels are the `Input`'s
 * minus `ghost` — six boxes with no fill and no edge say nothing about how many to type.
 */
export default function InputOTPScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      <Basic />

      <Section
        title="The three levels"
        note="The Input's, token for token — a box of a code is a field one character wide. Tap each: the box the next character lands in takes a two-point accent ring, which is HeroUI's outline done with a border, because React Native has no outline."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 6 }}>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {variant}
            </Text>
            <InputOTP maxLength={4} variant={variant}>
              <InputOTP.Group>{boxes}</InputOTP.Group>
            </InputOTP>
          </View>
        ))}
      </Section>

      <Section
        title="Groups and a separator"
        note="Two groups is a matter of slicing what the render function hands you, which is why there is no groupSize prop. The dash is hidden from the accessibility tree — the value is read off the hidden input, which has no gap in it."
      >
        <InputOTP maxLength={6}>
          <InputOTP.Group>
            {({ slots }) =>
              slots
                .slice(0, 3)
                .map(slot => <InputOTP.Box key={slot.index} index={slot.index} />)
            }
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            {({ slots }) =>
              slots
                .slice(3)
                .map(slot => <InputOTP.Box key={slot.index} index={slot.index} />)
            }
          </InputOTP.Group>
        </InputOTP>
      </Section>

      <Section
        title="size — the box, and the character in it"
        note="md is HeroUI's OTP exactly: a 48 box 44 wide, an 18/28 semibold character, 8 between boxes. The width is the control height less one spacing step, which holds the proportion at the other three sizes."
      >
        {(['sm', 'md', 'lg'] as const).map(size => (
          <InputOTP key={size} maxLength={4} size={size}>
            <InputOTP.Group>{boxes}</InputOTP.Group>
          </InputOTP>
        ))}
      </Section>

      <Section
        title="placeholder"
        note="One character repeated across every box, or one per box. It shows only where there is neither a typed character nor the caret — decided in one place, so two of them never appear at once."
      >
        <InputOTP maxLength={4} placeholder="•">
          <InputOTP.Group>{boxes}</InputOTP.Group>
        </InputOTP>
        <InputOTP maxLength={4} placeholder="1234">
          <InputOTP.Group>{boxes}</InputOTP.Group>
        </InputOTP>
      </Section>

      <Section
        title="pattern — letters and digits"
        note="Tested against the whole value rather than each character, so a rule about the shape of a code works too. OTP_DIGITS, OTP_LETTERS and OTP_ALPHANUMERIC are exported for the three usual answers."
      >
        <InputOTP maxLength={5} pattern={OTP_ALPHANUMERIC} inputMode="text">
          <InputOTP.Group>{boxes}</InputOTP.Group>
        </InputOTP>
      </Section>

      <Section
        title="isInvalid, isDisabled"
        note="An invalid code paints every box in danger and takes the active ring off — a seventh colour on one box says nothing the red did not. A disabled one dims the row and stops the hidden input."
      >
        <InputOTP maxLength={4} defaultValue="4821" isInvalid>
          <InputOTP.Group>{boxes}</InputOTP.Group>
        </InputOTP>
        <InputOTP maxLength={4} defaultValue="48" isDisabled>
          <InputOTP.Group>{boxes}</InputOTP.Group>
        </InputOTP>
      </Section>

      <Section
        title="color — a raw tint"
        note="It lands where the variant put its tokens, and it is also the ring the active box takes: the active colour is a role like any other, so nothing extra is passed."
      >
        <InputOTP maxLength={4} variant="tertiary" color="#7c3aed">
          <InputOTP.Group>{boxes}</InputOTP.Group>
        </InputOTP>
      </Section>

      <Imperative />
    </ScrollView>
  )
}

/** The majority case, and the one that shows `onComplete` and the paste path. */
function Basic() {
  const [code, setCode] = useState('')
  const [completed, setCompleted] = useState<string | null>(null)
  const theme = useXAUITheme()

  return (
    <Section
      title="One hidden input, six boxes"
      note="Type, then paste « Votre code est 482913, il expire dans 10 minutes » into the row: only the six digits land, because the pattern looks for a run of exactly maxLength digits with no digit on either side. That is what rules out the 10."
    >
      <InputOTP
        maxLength={6}
        value={code}
        onChangeText={setCode}
        onComplete={setCompleted}
      >
        <InputOTP.Group>{boxes}</InputOTP.Group>
      </InputOTP>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        valeur : « {code} »{completed ? ` · onComplete : ${completed}` : ''}
      </Text>
    </Section>
  )
}

/** `ref` is not the view here — it is the three things only the hidden input can do. */
function Imperative() {
  const otp = useRef<InputOTPHandle>(null)

  return (
    <Section
      title="ref — focus, blur, clear"
      note="The ref is the imperative handle rather than the view, because the useful actions all belong to an input nobody can reach. clear empties both halves: the native buffer and the value."
    >
      <InputOTP ref={otp} maxLength={4} defaultValue="12">
        <InputOTP.Group>{boxes}</InputOTP.Group>
      </InputOTP>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Button size="sm" variant="tertiary" onPress={() => otp.current?.focus()}>
          focus
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => otp.current?.blur()}>
          blur
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => otp.current?.clear()}>
          clear
        </Button>
      </View>
    </Section>
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
