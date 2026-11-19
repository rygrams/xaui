import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { NumberStepper } from '@xaui/tram/number-stepper'
import type {
  NumberStepperSize,
  NumberStepperVariant,
} from '@xaui/tram/number-stepper'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: NumberStepperSize[] = ['sm', 'md', 'lg']

const VARIANTS: NumberStepperVariant[] = ['outline', 'contained', 'flat', 'text']

const EURO: Intl.NumberFormatOptions = { style: 'currency', currency: 'EUR' }

const COFFEES = [
  { name: 'Éthiopie Guji', note: 'filtre · 250 g', price: 9.5 },
  { name: 'Colombie Huila', note: 'espresso · 250 g', price: 8.9 },
  { name: 'Sumatra Gayo', note: 'filtre · 250 g', price: 10.2 },
]

const euro = new Intl.NumberFormat('fr-FR', EURO)

/**
 * Where the Tram `NumberStepper` is verified, in dark and in light: the four drawings, the
 * three sizes, the bounds that put a key out, a basket held by the screen, a currency, a
 * function value, disabled, a named accent and a painted track.
 */
export default function TramNumberStepperScreen() {
  const theme = useXAUITheme()
  const [basket, setBasket] = useState([2, 1, 0])

  const total = COFFEES.reduce(
    (sum, coffee, index) => sum + coffee.price * (basket[index] ?? 0),
    0
  )

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="un panier"
        note="Trois steppers sm, de 0 à 5, tenus par l'écran. Sous le doigt la touche bascule vers lui ; à la borne elle s'éteint."
      >
        {COFFEES.map((coffee, index) => (
          <View
            key={coffee.name}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
          >
            <View style={{ flex: 1 }}>
              <Typography variant="body">{coffee.name}</Typography>
              <Typography variant="caption" color={theme.colors.muted}>
                {`${coffee.note} · ${euro.format(coffee.price)}`}
              </Typography>
            </View>
            <NumberStepper
              size="sm"
              min={0}
              max={5}
              value={basket[index] ?? 0}
              onValueChange={next =>
                setBasket(current =>
                  current.map((count, at) => (at === index ? (next ?? 0) : count))
                )
              }
            >
              <NumberStepper.Decrement
                accessibilityLabel={`un ${coffee.name} de moins`}
              />
              <NumberStepper.Value />
              <NumberStepper.Increment
                accessibilityLabel={`un ${coffee.name} de plus`}
              />
            </NumberStepper>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <Typography variant="body" color={theme.colors.muted}>
            total
          </Typography>
          <Typography variant="title">{euro.format(total)}</Typography>
        </View>
      </TramSection>

      <TramSection
        title="les dessins"
        note="Ceux du Button : outline par défaut, contained, flat, text."
      >
        {VARIANTS.map(variant => (
          <View
            key={variant}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
          >
            <NumberStepper variant={variant} defaultValue={2} min={0} max={9}>
              <NumberStepper.Decrement accessibilityLabel="un de moins" />
              <NumberStepper.Value />
              <NumberStepper.Increment accessibilityLabel="un de plus" />
            </NumberStepper>
            <Typography variant="caption" color={theme.colors.muted}>
              {variant}
            </Typography>
          </View>
        ))}
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — des touches de 32, 40, 48, la valeur au moins aussi large."
      >
        {SIZES.map((size, index) => (
          <NumberStepper
            key={size}
            size={size}
            defaultValue={[0, 5, 10][index]}
            min={0}
            max={10}
          >
            <NumberStepper.Decrement accessibilityLabel="un de moins" />
            <NumberStepper.Value />
            <NumberStepper.Increment accessibilityLabel="un de plus" />
          </NumberStepper>
        ))}
      </TramSection>

      <TramSection
        title="format et valeur"
        note="Une devise par Intl, un pas de 0,5 ; une valeur écrite par une fonction ; un stepper vide affiche un tiret."
      >
        <NumberStepper
          locale="fr-FR"
          formatOptions={EURO}
          defaultValue={12}
          step={0.5}
        >
          <NumberStepper.Decrement accessibilityLabel="cinquante centimes de moins" />
          <NumberStepper.Value minWidth={96} />
          <NumberStepper.Increment accessibilityLabel="cinquante centimes de plus" />
        </NumberStepper>
        <NumberStepper defaultValue={2} min={1} max={8}>
          <NumberStepper.Decrement accessibilityLabel="un convive de moins" />
          <NumberStepper.Value minWidth={88}>
            {value => `${value ?? 0} pers.`}
          </NumberStepper.Value>
          <NumberStepper.Increment accessibilityLabel="un convive de plus" />
        </NumberStepper>
        <NumberStepper min={0}>
          <NumberStepper.Decrement accessibilityLabel="un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="un de plus" />
        </NumberStepper>
      </TramSection>

      <TramSection
        title="désactivé, accent, piste"
        note="Désactivé : les deux touches éteintes. Un accent nommé repeint les touches. La piste ne dessine rien, sauf si on la peint."
      >
        <NumberStepper isDisabled defaultValue={3}>
          <NumberStepper.Decrement accessibilityLabel="un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="un de plus" />
        </NumberStepper>
        <NumberStepper accent="magenta" variant="contained" defaultValue={1}>
          <NumberStepper.Decrement accessibilityLabel="un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="un de plus" />
        </NumberStepper>
        <NumberStepper variant="text" defaultValue={4} alignSelf="flex-start">
          <NumberStepper.Track backgroundColor={theme.colors.surface} />
          <NumberStepper.Decrement accessibilityLabel="un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="un de plus" />
        </NumberStepper>
      </TramSection>
    </ScrollView>
  )
}
