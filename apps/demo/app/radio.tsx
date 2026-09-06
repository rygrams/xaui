import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Radio } from '@xaui/native/radio'
import type { RadioSize, RadioVariant } from '@xaui/native/radio'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: RadioVariant[] = ['primary', 'secondary', 'tertiary']
const SIZES: RadioSize[] = ['sm', 'md', 'lg']
const PLANS = ['monthly', 'yearly', 'lifetime'] as const

/**
 * The verification screen for the `Radio`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: a press selects and never clears, a set is
 * a `Radio.Group` around options that name a `value`, and everything else — the three
 * levels, the four sizes, the tint, `isInvalid`, `isDisabled` — is the `Checkbox`'s, on a
 * circle.
 */
export default function RadioScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Choice />

      <PlanCards />

      <Section
        title="A set hands its options their appearance"
        note="variant, size, radius and color are defaults — the second option names its own variant and keeps it. isDisabled and isInvalid are not defaults: they hold for every row."
      >
        <Radio.Group defaultValue="a" size="lg" color="#7c3aed">
          <Radio value="a">size et color viennent du groupe</Radio>
          <Radio value="b" variant="tertiary">
            variant=&quot;tertiary&quot; est à elle
          </Radio>
        </Radio.Group>
      </Section>

      <Section
        title="orientation — and a set that is disabled, then invalid"
        note="horizontal wraps rather than overflowing. A disabled set has no enabled option in it, and a set that is wrong is wrong on every row."
      >
        <Radio.Group defaultValue="s" orientation="horizontal" size="sm">
          <Radio value="s">S</Radio>
          <Radio value="m">M</Radio>
          <Radio value="l">L</Radio>
          <Radio value="xl">XL</Radio>
        </Radio.Group>
        <Radio.Group defaultValue="a" orientation="horizontal" isDisabled>
          <Radio value="a">Éteinte</Radio>
          <Radio value="b">Éteinte aussi</Radio>
        </Radio.Group>
        <Radio.Group orientation="horizontal" isInvalid>
          <Radio value="a">Aucune choisie</Radio>
          <Radio value="b">Et c’est l’erreur</Radio>
        </Radio.Group>
      </Section>

      <Section
        title="Membership is the value, not the nesting"
        note="Nothing walks the children: an option inside a wrapper is in the set, and one with no value is not in it at all — which is what keeps a standalone radio working inside a group."
      >
        <Radio.Group defaultValue="card">
          <View style={{ gap: 12 }}>
            <Radio value="card">Carte bancaire — dans un wrapper</Radio>
            <Radio value="transfer">Virement — dans le même</Radio>
          </View>
          <Radio defaultSelected>Sans value — hors du jeu, et cochée</Radio>
        </Radio.Group>
      </Section>

      <Section
        title="A press selects, it never clears"
        note="Tap the chosen option again: nothing happens, and onSelectedChange does not fire. A set of options has no “none of these” unless one of them says so."
      >
        <Radio defaultSelected>Déjà choisi — tapez encore</Radio>
      </Section>

      <Section
        title="The three levels — the circle at rest"
        note="The Checkbox's three rows, unchanged: an option that looked different from a checkbox in the same form would be a second design language rather than a second control."
      >
        {VARIANTS.map(variant => (
          <Radio
            key={variant}
            variant={variant}
            defaultSelected={variant === 'primary'}
          >
            {variant}
          </Radio>
        ))}
      </Section>

      <Section
        title="size — the circle, the dot, the gap and the type"
        note="The same four boxes as the Checkbox, so a radio and a checkbox in one form line up. The dot keeps HeroUI's ratio — 10 in 24 — at every size."
      >
        {SIZES.map(size => (
          <Radio key={size} size={size} defaultSelected>
            {`${size} · ${BOXES[size]}pt`}
          </Radio>
        ))}
      </Section>

      <Section
        title="color — the colour the option takes once chosen"
        note="A raw tint (R7), on the selected fill, with the dot derived to read against it. It reaches there because the fill is a role rather than an axis."
      >
        <Radio color="#7c3aed" defaultSelected>
          #7c3aed
        </Radio>
        <Radio color="#0f766e" defaultSelected>
          #0f766e
        </Radio>
        <Radio color="#f59e0b" defaultSelected>
          #f59e0b — le point se contraste
        </Radio>
      </Section>

      <Section
        title="isInvalid — and it outranks color"
        note="The border, the fill and the label turn danger, and the resting fill is dropped so an option that is wrong reads as an outline."
      >
        <Radio isInvalid>Aucune option choisie</Radio>
        <Radio isInvalid defaultSelected color="#7c3aed">
          Choisie, et invalide — la teinte est ignorée
        </Radio>
      </Section>

      <Section
        title="isDisabled, radius, a mark of your own"
        note="radius is on the root like everywhere else, and full is only its default — a squared-off option in a segmented row is a real design."
      >
        <Radio isDisabled>Indisponible</Radio>
        <Radio isDisabled defaultSelected>
          Indisponible, et choisie
        </Radio>
        <Radio radius="sm" defaultSelected>
          radius=&quot;sm&quot;
        </Radio>
        <Radio defaultSelected size="lg">
          <Radio.Indicator>
            <Text style={{ color: theme.colors.accentForeground, fontSize: 10 }}>
              ✓
            </Text>
          </Radio.Indicator>
          <Radio.Label>Une marque écrite</Radio.Label>
        </Radio>
      </Section>
    </ScrollView>
  )
}

/** What each size measures, for the row's own label. */
const BOXES: Record<RadioSize, number> = { sm: 20, md: 24, lg: 28 }

/** The set: a `Radio.Group` over one value, and options that say what they stand for. */
function Choice() {
  const [plan, setPlan] = useState<(typeof PLANS)[number]>('monthly')

  return (
    <Section
      title="A set is a Radio.Group over one value"
      note="The group holds the chosen value and each option compares the one it stands for. Tap the chosen one: neither onValueChange nor onSelectedChange fires."
    >
      <Radio.Group
        value={plan}
        onValueChange={next => setPlan(next as (typeof PLANS)[number])}
      >
        {PLANS.map(value => (
          <Radio key={value} value={value}>
            {LABELS[value]}
          </Radio>
        ))}
      </Radio.Group>
    </Section>
  )
}

const LABELS: Record<(typeof PLANS)[number], string> = {
  monthly: 'Tous les mois',
  yearly: 'Tous les ans — deux mois offerts',
  lifetime: 'À vie',
}

/** The two plans behind the cards below — the count is its own line, so it is its own key. */
const OFFERS = [
  { id: 'quarterly', count: '3', unit: 'mois', price: '3,99 €/sem.', tag: '-73 %' },
  {
    id: 'monthly',
    count: '1',
    unit: 'mois',
    price: '5,77 €/sem.',
    tag: 'Populaire',
  },
] as const

/**
 * The set as a row of pressable cards. Nothing about the component changed: the `Radio` is
 * the whole card because the root is the press target, the card belongs to the set because
 * it names a `value` and not because of where the circle sits inside it, and the border and
 * fill react to the choice because the demo already holds it — the same `plan` the group
 * reads.
 *
 * The root is a row by default — it is what lines the circle up with its label. A card is
 * a column, and `style` is the last word (§2 ter), so the card says so there. The circle
 * is a plain `Radio.Indicator`, absolutely placed in the corner — `end`, never `right`.
 */
function PlanCards() {
  const theme = useXAUITheme()
  const [plan, setPlan] = useState<(typeof OFFERS)[number]['id']>('quarterly')

  return (
    <Section
      title="A set can be a row of cards"
      note="The card is the Radio — the root is the press target — and it is in the set because it names a value, whatever is nested inside it. The root is a row by default; the card turns it into a column through style, which is the last word. The selected border and fill are the demo's, driven by the same value the group holds."
    >
      <Radio.Group
        value={plan}
        onValueChange={next => setPlan(next as (typeof OFFERS)[number]['id'])}
        orientation="horizontal"
      >
        {OFFERS.map(offer => {
          const selected = plan === offer.id

          return (
            <Radio
              key={offer.id}
              value={offer.id}
              radius="lg"
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // Stretch, not the recipe's flex-start: both cards take the tallest's
                // height, which is what makes them read as one row of two offers.
                alignSelf: 'stretch',
                flexGrow: 1,
                flexBasis: 150,
                gap: 2,
                paddingHorizontal: 16,
                paddingTop: 20,
                paddingBottom: 16,
                borderWidth: 1,
                borderColor: selected ? theme.colors.accent : theme.colors.border,
                borderRadius: theme.radius.lg,
                backgroundColor: selected
                  ? theme.colors.accentSoft
                  : theme.colors.surface,
              }}
            >
              <Radio.Indicator style={{ position: 'absolute', top: 12, end: 12 }} />
              <Text
                style={{
                  color: theme.colors.foreground,
                  fontSize: theme.fontSizes['3xl'],
                  lineHeight: theme.lineHeights['3xl'],
                  fontWeight: theme.fontWeights.bold,
                }}
              >
                {offer.count}
              </Text>
              <Text
                style={{
                  color: theme.colors.foreground,
                  fontSize: theme.fontSizes.md,
                  fontWeight: theme.fontWeights.medium,
                }}
              >
                {offer.unit}
              </Text>
              <Text
                style={{
                  color: theme.colors.foreground,
                  fontSize: theme.fontSizes.md,
                  fontWeight: theme.fontWeights.semibold,
                }}
              >
                {offer.price}
              </Text>
              <View
                style={{
                  marginTop: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: theme.radius.full,
                  backgroundColor: selected
                    ? theme.colors.accent
                    : theme.colors.backgroundSecondary,
                }}
              >
                <Text
                  style={{
                    color: selected
                      ? theme.colors.accentForeground
                      : theme.colors.muted,
                    fontSize: theme.fontSizes.xs,
                    fontWeight: theme.fontWeights.semibold,
                  }}
                >
                  {offer.tag}
                </Text>
              </View>
            </Radio>
          )
        })}
      </Radio.Group>
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
