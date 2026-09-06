import { ScrollView, Text, View } from 'react-native'
import { CloseButton } from '@xaui/native/close-button'
import type { CloseButtonSize, CloseButtonVariant } from '@xaui/native/close-button'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: CloseButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: CloseButtonSize[] = ['xs', 'sm', 'md', 'lg']

/** What each size measures, for the row's own label. */
const BOXES: Record<CloseButtonSize, number> = { xs: 24, sm: 28, md: 32, lg: 40 }

/**
 * The verification screen for the `CloseButton`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 *
 * The two things to look at are the ones a table cannot show: that the cross stays one
 * mark across the four sizes because its stroke does not scale with the box, and that the
 * press is the shared feedback rather than a colour of its own.
 */
export default function CloseButtonScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="The four levels — and secondary is the default"
        note="A cross floating with nothing under it reads as decoration; the disc is what makes it a target. ghost is the bare cross, for a component already providing one."
      >
        <Row>
          {VARIANTS.map(variant => (
            <View key={variant} style={{ alignItems: 'center', gap: 6 }}>
              <CloseButton
                variant={variant}
                accessibilityLabel={`Fermer ${variant}`}
              />
              <Caption>{variant}</Caption>
            </View>
          ))}
        </Row>
      </Section>

      <Section
        title="size — the box, and the cross in it"
        note="The bar is a ratio of the box, so it is one cross at four sizes. The stroke is the shared thickness and does not scale: four crosses that thickened with their box would read as four marks."
      >
        <Row>
          {SIZES.map(size => (
            <View key={size} style={{ alignItems: 'center', gap: 6 }}>
              <CloseButton size={size} accessibilityLabel={`Fermer ${size}`} />
              <Caption>{`${size} · ${BOXES[size]}pt`}</Caption>
            </View>
          ))}
        </Row>
      </Section>

      <Section
        title="color — the disc, or the cross"
        note="A raw tint (R7), and where it lands follows the variant: the disc on primary and secondary, the cross on tertiary and ghost."
      >
        <Row>
          <CloseButton color="#7c3aed" accessibilityLabel="Fermer" />
          <CloseButton
            variant="primary"
            color="#0f766e"
            accessibilityLabel="Fermer"
          />
          <CloseButton
            variant="tertiary"
            color="#b91c1c"
            accessibilityLabel="Fermer"
          />
          <CloseButton variant="ghost" color="#b45309" accessibilityLabel="Fermer" />
        </Row>
      </Section>

      <Section
        title="radius, isDisabled, and a mark of your own"
        note="radius overrides the circle size sets — xs is the sharpest corner the scale has, there is no none. Children replace the built-in cross — which is drawn rather than imported, so this works with no icon set installed."
      >
        <Row>
          <CloseButton radius="md" accessibilityLabel="Fermer" />
          <CloseButton radius="xs" variant="tertiary" accessibilityLabel="Fermer" />
          <CloseButton isDisabled accessibilityLabel="Fermer" />
          <CloseButton size="lg" accessibilityLabel="Fermer">
            <Text style={{ color: theme.colors.defaultForeground, fontSize: 16 }}>
              ✕
            </Text>
          </CloseButton>
        </Row>
      </Section>

      <Section
        title="In a corner, over something"
        note="The case the component exists for: a dismiss on a surface the library does not own. The target is 8 points wider than the box on every side, so the cross stays small and stays hittable."
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: 16,
            gap: 8,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text
              style={{
                flex: 1,
                color: theme.colors.foreground,
                fontSize: theme.fontSizes.md,
                fontWeight: theme.fontWeights.semibold,
              }}
            >
              Sauvegarde terminée
            </Text>
            <CloseButton
              variant="ghost"
              size="sm"
              accessibilityLabel="Fermer la bannière"
            />
          </View>
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            Une bannière que la bibliothèque ne possède pas, et sa sortie.
          </Text>
        </View>
      </Section>
    </ScrollView>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </View>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
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
