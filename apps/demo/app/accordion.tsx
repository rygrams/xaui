import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Accordion } from '@xaui/native/accordion'
import type { AccordionSize, AccordionVariant } from '@xaui/native/accordion'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: AccordionVariant[] = ['ghost', 'primary', 'default', 'tertiary']
const SIZES: AccordionSize[] = ['xs', 'sm', 'md', 'lg']

const FAQ = [
  {
    value: 'shipping',
    title: 'Livraison',
    body: 'Sous trois jours ouvrés en France métropolitaine, cinq en Europe.',
  },
  {
    value: 'returns',
    title: 'Retours',
    body: 'Trente jours, port payé, sans justification à donner.',
  },
  {
    value: 'warranty',
    title: 'Garantie',
    body: 'Deux ans, pièces et main-d’œuvre.',
  },
]

/**
 * The verification screen for the `Accordion`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it, only one for the
 * selection rule.
 *
 * What each section checks is in its subtitle: the height animates without a measured
 * value, the four levels are the `Card`'s, the separators are the root's and stop before
 * the last row, and `single` against `multiple` is one rule with four cases.
 */
export default function AccordionScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="One at a time"
        note="The default. Open a second row and the first closes. The height is animated by Reanimated's layout transition on HeroUI's spring — damping 140 against stiffness 1600, stiffer than the chevron's because a height is a longer distance than a rotation. Nothing is measured: the panel is mounted or it is not."
      >
        <Faq />
      </Section>

      <Section
        title="Several at a time"
        note="selectionMode='multiple'. The value becomes a list, in the order the rows were opened. Open all three: the container grows with them, and its own layout transition is what keeps that growth from jumping a frame ahead of the rows inside it."
      >
        <Faq selectionMode="multiple" />
      </Section>

      <Section
        title="The four levels"
        note="The Card's tokens under the Button's names: primary is the strong fill, default the neutral one. primary is HeroUI's surface variant. ghost is our default and is HeroUI's default — no container at all, only the hairlines separate the rows, and they run the full width because there is no edge to be inset from."
      >
        {VARIANTS.map(variant => (
          <Faq key={variant} variant={variant} only={variant} />
        ))}
      </Section>

      <Section
        title="Sizes"
        note="size moves the row's inset, the gap before the chevron and the type. The vertical padding is one value across all four: HeroUI puts sixteen points above and below against twelve on the sides, which is what gives a row of plain text a target big enough to hit without a border to aim at."
      >
        {SIZES.map(size => (
          <Faq key={size} size={size} variant="primary" only={size} />
        ))}
      </Section>

      <Section
        title="Always one open"
        note="isCollapsible={false}. Pressing the open row refuses rather than closing it, and onValueChange never fires for a change that did not happen. That is a set of tabs wearing an accordion."
      >
        <Faq defaultValue="shipping" isCollapsible={false} variant="primary" />
      </Section>

      <Section
        title="No separators"
        note="hasSeparator={false}. They are drawn by the root between its children, not by the rows — so there is never one under the last row to hide."
      >
        <Faq hasSeparator={false} variant="primary" />
      </Section>

      <Section
        title="A composed row"
        note="The trigger is a row of views: a stringifiable child is wrapped in a Text for you (R3), anything else is yours to place. Here a description sits under the title, and the chevron stays pinned to the end."
      >
        <Accordion variant="primary">
          <Accordion.Item value="a">
            <Accordion.Trigger>
              <View style={{ flexShrink: 1, gap: 2 }}>
                <Text
                  style={{
                    color: theme.colors.surfaceForeground,
                    fontSize: theme.fontSizes.md,
                    fontWeight: theme.fontWeights.medium,
                  }}
                >
                  Facturation
                </Text>
                <Text
                  style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
                >
                  Moyens de paiement, TVA, factures
                </Text>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text
                style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
              >
                Carte, virement SEPA et prélèvement. La facture part le premier de
                chaque mois.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Section>

      <Section
        title="A row that paints its own state"
        note="children as a function, handed { isExpanded, isDisabled, value }. The escape hatch for a row whose whole appearance changes when it opens, without wiring useAccordionItem yourself."
      >
        <Accordion variant="primary">
          {FAQ.slice(0, 2).map(({ value, title, body }) => (
            <Accordion.Item key={value} value={value}>
              {({ isExpanded }) => (
                <>
                  <Accordion.Trigger>
                    <Text
                      style={{
                        color: isExpanded
                          ? theme.colors.accent
                          : theme.colors.surfaceForeground,
                        fontSize: theme.fontSizes.md,
                        fontWeight: theme.fontWeights.medium,
                      }}
                    >
                      {title}
                    </Text>
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <Text
                      style={{
                        color: theme.colors.muted,
                        fontSize: theme.fontSizes.sm,
                      }}
                    >
                      {body}
                    </Text>
                  </Accordion.Content>
                </>
              )}
            </Accordion.Item>
          ))}
        </Accordion>
      </Section>

      <Section
        title="A tint (R7), and disabled"
        note="color is a raw value, never a token. It lands where the variant says — the fill of a default container, the border of a tertiary one. isDisabled dims the whole accordion and stops every row; a single row takes it too."
      >
        <Faq variant="primary" color="#7c3aed" only="tinted" />
        <Faq variant="primary" isDisabled only="disabled" />
      </Section>

      <Section
        title="Controlled"
        note="Pass value and onValueChange and the root stops owning what is open. The buttons below drive it from outside, which is what proves it."
      >
        <ControlledFaq />
      </Section>
    </ScrollView>
  )
}

type FaqProps = {
  variant?: AccordionVariant
  size?: AccordionSize
  selectionMode?: 'single' | 'multiple'
  defaultValue?: string
  isCollapsible?: boolean
  hasSeparator?: boolean
  isDisabled?: boolean
  color?: string
  /** Labels the section it belongs to, so four accordions in a row stay tellable apart. */
  only?: string
}

function Faq({ only, ...props }: FaqProps) {
  const theme = useXAUITheme()
  const rows = only ? FAQ.slice(0, 2) : FAQ

  return (
    <Accordion {...props}>
      {rows.map(({ value, title, body }) => (
        <Accordion.Item key={value} value={value}>
          <Accordion.Trigger>
            {only ? `${title} · ${only}` : title}
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
            >
              {body}
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

function ControlledFaq() {
  const theme = useXAUITheme()
  const [value, setValue] = useState<string>('returns')

  return (
    <View style={{ gap: 12 }}>
      <Accordion
        variant="primary"
        value={value}
        onValueChange={next => setValue(next as string)}
      >
        {FAQ.map(({ value: v, title, body }) => (
          <Accordion.Item key={v} value={v}>
            <Accordion.Trigger>
              {title}
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text
                style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
              >
                {body}
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {FAQ.map(({ value: v, title }) => (
          <Text
            key={v}
            onPress={() => setValue(v)}
            style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}
          >
            {title}
          </Text>
        ))}
      </View>
    </View>
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
