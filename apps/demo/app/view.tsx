import { ScrollView, Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { Button } from '@xaui/native/button'
import { Column, Row } from '@xaui/native/view'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for `Row` and `Column`.
 *
 * What it is really checking is that these two contribute **one declaration each** and
 * that everything else on them is R14 — the alignment, the gap and the padding below are
 * `ViewStyle` keys under React Native's own names, not a vocabulary this library invented.
 */
export default function ViewScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <Section
        title="Row — one declaration, the rest is R14"
        note="gap, alignItems and justifyContent are ViewStyle keys, so they are already props on every node. No mainAxisAlignment, no crossAxisAlignment: React Native's names, React Native's values."
      >
        <Row gap={8} alignItems="center">
          <Button size="sm">first</Button>
          <Button size="sm" variant="secondary">
            second
          </Button>
        </Row>

        <Row justifyContent="space-between" alignItems="center">
          <Text style={{ color: theme.colors.foreground }}>space-between</Text>
          <Button size="sm" variant="tertiary">
            pushed to the end
          </Button>
        </Row>
      </Section>

      <Section
        title="A button in a row hugs its content"
        note="Nothing in the recipe sets a width, so React Native's own behaviour answers: stretched in a column, hugging in a row. That is why there is no fullWidth prop."
      >
        <Row gap={8}>
          <Button size="sm">hugs</Button>
          <Button size="sm" variant="secondary">
            hugs too
          </Button>
        </Row>
        <Button size="sm">stretched, in a column</Button>
      </Section>

      <Section
        title="Column — the axis said out loud"
        note="It declares React Native's own default, so it changes nothing on its own. It exists for what it says: a layout whose axes are all named reads without inference, and it keeps its direction when composed into a row."
      >
        <Row gap={12}>
          <Column gap={6} flex={1} padding={12} backgroundColor={theme.colors.surface}>
            <Text style={{ color: theme.colors.foreground }}>a column</Text>
            <Text style={{ color: theme.colors.muted }}>inside a row</Text>
          </Column>
          <Column gap={6} flex={1} padding={12} backgroundColor={theme.colors.surface}>
            <Text style={{ color: theme.colors.foreground }}>another</Text>
            <Text style={{ color: theme.colors.muted }}>sharing the width</Text>
          </Column>
        </Row>
      </Section>

      <Section
        title="Nested, which is all a layout is"
        note="Two components and R14 cover the whole of it. Nothing here needed a prop the library had to invent."
      >
        <Column
          gap={12}
          padding={16}
          borderRadius={12}
          backgroundColor={theme.colors.surface}
        >
          <Row justifyContent="space-between" alignItems="center">
            <Text
              style={{
                color: theme.colors.foreground,
                fontSize: theme.fontSizes.lg,
                fontWeight: theme.fontWeights.semibold,
              }}
            >
              Facture #2024-118
            </Text>
            <Text style={{ color: theme.colors.muted }}>payée</Text>
          </Row>

          <Text style={{ color: theme.colors.muted }}>Émise le 3 septembre — 1 240 €</Text>

          <Row gap={8} justifyContent="flex-end">
            <Button size="sm" variant="tertiary">
              Télécharger
            </Button>
            <Button size="sm" variant="danger-soft">
              Annuler
            </Button>
          </Row>
        </Column>
      </Section>

      <Section
        title="asChild — R12"
        note="The child element becomes the axis and keeps its direction."
      >
        <Row asChild gap={8} alignItems="center">
          <View style={{ borderWidth: 1, borderColor: theme.colors.border, padding: 8 }}>
            <Text style={{ color: theme.colors.foreground }}>a View,</Text>
            <Text style={{ color: theme.colors.muted }}>wearing the row</Text>
          </View>
        </Row>
      </Section>
    </ScrollView>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 10 }}>
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
