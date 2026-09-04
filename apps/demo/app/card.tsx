import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Card } from '@xaui/native/card'
import type { CardVariant } from '@xaui/native/card'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: CardVariant[] = ['default', 'secondary', 'tertiary', 'ghost']

/**
 * The verification screen for the `Card`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the four levels name surface tokens and
 * nothing else, `size` moves the padding and the type and never a height, a raw `color`
 * lands where the variant put its tokens, and `isPressable` turns the surface into a
 * control without changing anything else about it.
 */
export default function CardScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <Section
        title="The four levels"
        note="One ladder, descending by how much surface is left: default is the card, secondary the level for a card inside a card, tertiary the outline, ghost nothing at all. No success and no danger — a card is what a status is reported on, not the status."
      >
        {VARIANTS.map(variant => (
          <Card key={variant} variant={variant}>
            <Card.Header>
              <Card.Title>{variant}</Card.Title>
              <Card.Description>
                The title takes the variant&apos;s foreground; the description sits
                behind it on a fraction of the same colour.
              </Card.Description>
            </Card.Header>
          </Card>
        ))}

        <Card>
          <Card.Header>
            <Card.Title>Nesting</Card.Title>
            <Card.Description>
              A secondary card inside a default one — the level above it, and no
              second shadow.
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Card variant="secondary" size="sm">
              <Card.Header>
                <Card.Title>Nested</Card.Title>
                <Card.Description>surfaceSecondary, no elevation</Card.Description>
              </Card.Header>
            </Card>
          </Card.Body>
        </Card>
      </Section>

      <Section
        title="Anatomy — header, body, footer"
        note="The root's gap separates the sections and the sections have no margin of their own, so JSX order is screen order. The header is a column pinned to the leading edge; the footer is a row, because a footer is an action row."
      >
        <Card>
          <Card.Header>
            <Card.Title>Facture #1024</Card.Title>
            <Card.Description>
              Émise le 3 mars, échéance le 2 avril.
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Text style={{ color: theme.colors.surfaceForeground }}>
              Trois lignes, 1 240 € hors taxes.
            </Text>
          </Card.Body>
          <Card.Footer>
            <Button size="sm">Payer</Button>
            <Button size="sm" variant="ghost">
              Plus tard
            </Button>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Header flexDirection="row" justifyContent="space-between">
            <Card.Title>A header as a bar</Card.Title>
            <Button size="xs" variant="tertiary">
              Voir
            </Button>
          </Card.Header>
          <Card.Description>
            flexDirection=&quot;row&quot; — one style prop, and the header is a
            title-and-action bar.
          </Card.Description>
        </Card>
      </Section>

      <Section
        title="size — padding and type, never a height"
        note="A card is a surface, not a control: it is as tall as what it holds. The two gaps move together — between the sections, and inside one."
      >
        {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
          <Card key={size} size={size} variant="secondary">
            <Card.Header>
              <Card.Title>size=&quot;{size}&quot;</Card.Title>
              <Card.Description>
                Padding, gaps, radius, and the type of both text slots.
              </Card.Description>
            </Card.Header>
          </Card>
        ))}
      </Section>

      <Section
        title="isPressable — the same surface, as a control"
        note='A PressableFeedback with accessibilityRole="button", the shared scale, and a wash over the surface. The wash, and not a pressed fill: a card has no pressed token per surface level, and on an area this large a flat overlay reads better than a fill a shade darker.'
      >
        <Card isPressable onPress={() => undefined}>
          <Card.Header>
            <Card.Title>Press me</Card.Title>
            <Card.Description>
              The card scales — less than a button would, because it is wider — and
              the wash rounds itself to the card&apos;s own corners.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card isPressable variant="tertiary" onPress={() => undefined}>
          <Card.Header>
            <Card.Title>Pressable, outlined</Card.Title>
            <Card.Description>
              The wash contrasts with whatever the card sits on, transparent
              included.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card isPressable isDisabled onPress={() => undefined}>
          <Card.Header>
            <Card.Title>isDisabled</Card.Title>
            <Card.Description>
              Dimmed, and it does not take the touch.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card
          isPressable
          animation={false}
          variant="secondary"
          onPress={() => undefined}
        >
          <Card.Header>
            <Card.Title>animation={'{false}'}</Card.Title>
            <Card.Description>
              Nothing moves, and no worklet is mounted.
            </Card.Description>
          </Card.Header>
        </Card>
      </Section>

      <Section
        title="color — one raw tint, placed by the variant"
        note="The fill of a default, the border of a tertiary, the text of a ghost. Derived in OKLab, like accent — which is what keeps the title readable on the fill without a second colour being named."
      >
        <Card color="#7c3aed">
          <Card.Header>
            <Card.Title>default — the tint is the fill</Card.Title>
            <Card.Description>
              And the text is its contrasted slice, not the surface foreground.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card variant="tertiary" color="#7c3aed">
          <Card.Header>
            <Card.Title>tertiary — border and text</Card.Title>
            <Card.Description>
              No fill to tint, so the edge carries it.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card variant="ghost" color="#7c3aed">
          <Card.Header>
            <Card.Title>ghost — the text alone</Card.Title>
            <Card.Description>
              Neither fill nor edge; only the words.
            </Card.Description>
          </Card.Header>
        </Card>
      </Section>

      <Section
        title="radius — the shape its size implies, or one you name"
        note="Unset, the radius follows the size. Set, it wins."
      >
        <Card size="sm" radius="xs" variant="secondary">
          <Card.Title>radius=&quot;xs&quot;</Card.Title>
        </Card>
        <Card size="sm" radius="3xl" variant="secondary">
          <Card.Title>radius=&quot;3xl&quot;</Card.Title>
        </Card>
      </Section>

      <Section
        title="Style props — R14"
        note="Full React Native names, so full React Native values: padding={16} is 16 points, never a step on a scale. They resolve after the recipe and before the card's own style."
      >
        <Card padding={32}>
          <Card.Title>padding={'{32}'} beats the padding size chose</Card.Title>
        </Card>
        <Card variant="secondary" width="70%">
          <Card.Title>width=&quot;70%&quot; — what replaced fullWidth</Card.Title>
        </Card>
        <Card variant="tertiary" borderColor={theme.colors.warning} borderWidth={2}>
          <Card.Title>A border the theme has no opinion about</Card.Title>
        </Card>
        <Card>
          <Card.Title fontSize={24} letterSpacing={-0.5}>
            A title sizing itself
          </Card.Title>
          <Card.Description opacity={1} color={theme.colors.link}>
            A description that is not behind its title at all
          </Card.Description>
        </Card>
      </Section>

      <Section
        title="A bare string child"
        note="R3 — a stringifiable tree is wrapped in a Card.Description. Description and not Title: a card with prose and no heading is ordinary, the reverse is not."
      >
        <Card>Une carte qui ne dit qu&apos;une chose.</Card>
      </Section>

      <Section
        title="A card with a height — the body is what grows"
        note="flexGrow on the body, so the footer sits at the bottom with no spacer. It grows rather than flexing: flex: 1 would measure the body as empty in a card sized by its content, which is every other card on this screen."
      >
        <Card height={220}>
          <Card.Header>
            <Card.Title>Fixed height</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description>The body takes what is left.</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="tertiary">
              Pinned to the bottom
            </Button>
          </Card.Footer>
        </Card>
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
  children: React.ReactNode
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
