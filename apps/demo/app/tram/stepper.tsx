import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Stepper } from '@xaui/tram/stepper'
import type { StepperSize } from '@xaui/tram/stepper'
import { TramSection } from '../../components/tram-section'

const STEPS = [
  ['dates', 'du 24 au 28 novembre'],
  ['chambre', 'la verte, vue sur les crêtes'],
  ['coordonnées', 'nom, téléphone, heure d’arrivée'],
  ['paiement', 'arrhes de 30 %'],
] as const

const SIZES: StepperSize[] = ['sm', 'md', 'lg']

/**
 * The steps as an array, not a component: the root numbers its **direct** children, and
 * a `<Steps />` element would be one child, numbered once.
 */
function steps(withDescription = true) {
  return STEPS.map(([title, description]) => (
    <Stepper.Item key={title}>
      <Stepper.Indicator />
      <Stepper.Content>
        <Stepper.Title>{title}</Stepper.Title>
        {withDescription ? (
          <Stepper.Description>{description}</Stepper.Description>
        ) : null}
      </Stepper.Content>
    </Stepper.Item>
  ))
}

/**
 * Where the Tram `Stepper` is verified, in dark and in light: a value held by the screen
 * and moved by its own two buttons, the same value lying down, the three sizes, a named
 * accent, and no bars.
 */
export default function TramStepperScreen() {
  const theme = useXAUITheme()
  const [step, setStep] = useState(3)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="vertical"
        note="Une barre par étape : l'accent pour les faites, l'encre pour celle en cours, le gris pâle devant. L'étape en cours a son titre plus grand."
      >
        <Stepper value={step}>{steps()}</Stepper>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button
            variant="outline"
            isDisabled={step <= 0}
            onPress={() => setStep(value => value - 1)}
          >
            précédent
          </Button>
          <Button
            variant="outline"
            isDisabled={step > STEPS.length}
            onPress={() => setStep(value => value + 1)}
          >
            suivant
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="horizontal"
        note="Les mêmes barres bout à bout, un nom sous chacune ; seul celui en cours est à l'encre."
      >
        <Stepper value={step} orientation="horizontal">
          {steps(false)}
        </Stepper>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — des chiffres de 24, 28, 34."
      >
        {SIZES.map(size => (
          <Stepper key={size} size={size} value={2}>
            {steps(false)}
          </Stepper>
        ))}
      </TramSection>

      <TramSection
        title="accent et sans barres"
        note="Un accent nommé pour les étapes faites ; hasConnector à faux, il reste les chiffres et les mots."
      >
        <Stepper accent="orange" value={3}>
          {steps(false)}
        </Stepper>
        <Stepper hasConnector={false} value={2}>
          {steps(false)}
        </Stepper>
      </TramSection>
    </ScrollView>
  )
}
