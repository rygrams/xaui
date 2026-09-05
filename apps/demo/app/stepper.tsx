import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Stepper } from '@xaui/native/stepper'
import type { StepperSize } from '@xaui/native/stepper'
import { useXAUITheme } from '@xaui/native/theme'

const SIZES: StepperSize[] = ['xs', 'sm', 'md', 'lg']

const STEPS = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Settings', description: 'Configure preferences' },
  { title: 'Review', description: 'Review and confirm' },
]

const CHECKOUT = ['Cart', 'Shipping', 'Payment']

/**
 * The verification screen for the `Stepper`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function StepperScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Section
        title="Vertical, which is the layout that carries a description"
        note="The indicator sits at the top of the text beside it, and the line runs down through whatever height that text takes — so the connector is the indicator's rather than the root's. A completed step keeps its full contrast: it is a thing you did, not a thing greyed out."
      >
        <Stepper value={2}>
          {STEPS.map(step => (
            <Stepper.Item key={step.title}>
              <Stepper.Indicator />
              <Stepper.Content>
                <Stepper.Title>{step.title}</Stepper.Title>
                <Stepper.Description>{step.description}</Stepper.Description>
              </Stepper.Content>
            </Stepper.Item>
          ))}
        </Stepper>
      </Section>

      <Controlled />

      <Section
        title="Horizontal centres each step over its label"
        note="Every step gets the same width and carries a line on both sides of its circle, so the circles land at even intervals whatever the labels say. The two ends of the rail are drawn transparent rather than dropped — removing them would slide the first and last circles off their labels."
      >
        <Stepper orientation="horizontal" value={1}>
          {CHECKOUT.map(label => (
            <Stepper.Item key={label}>
              <Stepper.Indicator />
              <Stepper.Content>
                <Stepper.Title>{label}</Stepper.Title>
              </Stepper.Content>
            </Stepper.Item>
          ))}
        </Stepper>
      </Section>

      <Section
        title="Sizes move the indicator and the type"
        note="Never a width. A vertical stepper is as wide as its parent lets it be and a horizontal one splits that width evenly, which is RN's own behaviour and the reason there is no fullWidth prop here either."
      >
        {SIZES.map(size => (
          <View key={size} style={{ gap: 8 }}>
            <Label>{size}</Label>
            <Stepper orientation="horizontal" size={size} value={2}>
              {CHECKOUT.map(step => (
                <Stepper.Item key={step}>
                  <Stepper.Indicator />
                  <Stepper.Content>
                    <Stepper.Title>{step}</Stepper.Title>
                  </Stepper.Content>
                </Stepper.Item>
              ))}
            </Stepper>
          </View>
        ))}
      </Section>

      <Section
        title="A tint paints the progress, not the track"
        note="color is a raw value, never a token. It moves the travelled line, the ring around the step you are on and the disc behind the ones you are past — and leaves the road ahead grey, which is the whole point of showing progress."
      >
        <Stepper color="#15803d" value={3}>
          {STEPS.slice(0, 3).map(step => (
            <Stepper.Item key={step.title}>
              <Stepper.Indicator />
              <Stepper.Content>
                <Stepper.Title>{step.title}</Stepper.Title>
                <Stepper.Description>{step.description}</Stepper.Description>
              </Stepper.Content>
            </Stepper.Item>
          ))}
        </Stepper>
      </Section>

      <Section
        title="Without the rail, and with a step of your own"
        note="hasConnector={false} leaves the circles on their own. An Indicator with children replaces the number and the check — here the last step is locked, and the item is pressable through asChild rather than through a prop the component would have had to invent."
      >
        <Stepper hasConnector={false} value={2}>
          {STEPS.slice(0, 3).map((step, index) => (
            <Stepper.Item key={step.title} asChild>
              <Pressable onPress={() => {}}>
                <Stepper.Indicator>
                  {index === 2 ? <Label>×</Label> : undefined}
                </Stepper.Indicator>
                <Stepper.Content>
                  <Stepper.Title>{step.title}</Stepper.Title>
                  <Stepper.Description>{step.description}</Stepper.Description>
                </Stepper.Content>
              </Pressable>
            </Stepper.Item>
          ))}
        </Stepper>
      </Section>
    </ScrollView>
  )
}

/** The value is the caller's, always — there is no state inside a stepper to move. */
function Controlled() {
  const [step, setStep] = useState(1)

  return (
    <Section
      title="Controlled, because there is no other kind"
      note="There is no defaultValue and no onValueChange: nothing inside a stepper can move the value, so it comes from the form, the wizard or the route that actually knows. An uncontrolled one would be a piece of state that could never change."
    >
      <Stepper value={step}>
        {STEPS.map(item => (
          <Stepper.Item key={item.title}>
            <Stepper.Indicator />
            <Stepper.Content>
              <Stepper.Title>{item.title}</Stepper.Title>
              <Stepper.Description>{item.description}</Stepper.Description>
            </Stepper.Content>
          </Stepper.Item>
        ))}
      </Stepper>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <Button
          variant="tertiary"
          size="sm"
          isDisabled={step === 1}
          onPress={() => setStep(current => current - 1)}
        >
          Précédent
        </Button>
        <Label>{`${step} / ${STEPS.length}`}</Label>
        <Button
          variant="tertiary"
          size="sm"
          isDisabled={step === STEPS.length}
          onPress={() => setStep(current => current + 1)}
        >
          Suivant
        </Button>
      </View>
    </Section>
  )
}

function Label({ children }: { children: string }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
      {children}
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
