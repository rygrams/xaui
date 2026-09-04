import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Skeleton } from '@xaui/native/skeleton'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for the `Skeleton`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the two variants are the two backgrounds a
 * placeholder is drawn on, the block takes its shape from R14 and nothing else, a
 * paragraph is composition rather than a `lines` prop, and `isLoading` is a gate the
 * caller's content passes through.
 */
export default function SkeletonScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Loading />

      <Section
        title="The two levels"
        note="default is the neutral fill, for a block on the page. secondary is that fill at half, for a block on a surface that already carries a neutral — on the card below, the default one reads as a hole."
      >
        <View style={{ gap: 8 }}>
          <Caption>default · on the page</Caption>
          <Skeleton height={16} />
          <Caption>secondary · on the page</Caption>
          <Skeleton height={16} variant="secondary" />
        </View>

        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: 16,
            gap: 8,
          }}
        >
          <Caption>default · on a surface</Caption>
          <Skeleton height={16} />
          <Caption>secondary · on a surface</Caption>
          <Skeleton height={16} variant="secondary" />
        </View>
      </Section>

      <Section
        title="No size — R14 is the whole sizing API"
        note="Only the caller knows the shape of the thing that is missing. Full React Native names and values: width='60%' as readily as width={140}. A size token here would be a scale of rectangles nobody's content happens to be."
      >
        <Skeleton width={140} height={20} />
        <Skeleton width="60%" height={20} />
        <Skeleton height={20} />
      </Section>

      <Section
        title="radius — md is the block, full is the avatar"
        note="A circle is a shape the vocabulary names, so it survives a theme redrawing every corner in the library."
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Skeleton width={48} height={48} radius="xs" />
          <Skeleton width={48} height={48} radius="md" />
          <Skeleton width={48} height={48} radius="2xl" />
          <Skeleton width={48} height={48} radius="full" />
        </View>
      </Section>

      <Section
        title="A paragraph is three of them, not lines={3}"
        note="Composition puts the short last line where a prop would have hard-coded it — and that shorter line is the only reason the block reads as a paragraph."
      >
        <View style={{ gap: 8 }}>
          <Skeleton height={12} />
          <Skeleton height={12} />
          <Skeleton height={12} width="60%" />
        </View>
      </Section>

      <Section
        title="A row of one, mirroring the layout it stands in for"
        note="The placeholder has the shape of the thing arriving, so nothing jumps when it does. Compare with the loaded row at the top of this screen."
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Skeleton width={40} height={40} radius="full" />
          <View style={{ gap: 6, flex: 1 }}>
            <Skeleton height={12} width="50%" />
            <Skeleton height={12} width="80%" />
          </View>
        </View>
      </Section>

      <Section
        title="color — one raw tint (R7)"
        note="One thing to colour on a block, so the tint lands on the block. Hex only: the slices are derived in OKLab."
      >
        <Skeleton height={20} color="#7c3aed" />
        <Skeleton height={20} color="#0f766e" variant="secondary" />
      </Section>

      <Section
        title="animation={false} — frozen at full, no worklet"
        note="The branch renders a plain View, so a long list frozen for a screenshot costs nothing. Watch the one above it breathe and this one hold."
      >
        <Skeleton height={20} />
        <Skeleton height={20} animation={false} />
      </Section>
    </ScrollView>
  )
}

/**
 * The component as it is actually used: a gate the real content passes through once it
 * exists. Press to send it back, and nothing should shift when it returns.
 */
function Loading() {
  const theme = useXAUITheme()
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    if (user) return
    const id = setTimeout(() => setUser('Amina Traoré'), 1800)
    return () => clearTimeout(id)
  }, [user])

  return (
    <Section
      title="isLoading — the gate, which is the whole point"
      note="isLoading={false} renders children and nothing else: no wrapper, so the parent's gap and flex measure the real node. Press reload and watch the row hold its shape."
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Skeleton isLoading={!user} width={40} height={40} radius="full">
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.accentSoft,
            }}
          />
        </Skeleton>
        <Skeleton isLoading={!user} height={20} width={140}>
          <Text
            style={{ color: theme.colors.foreground, fontSize: theme.fontSizes.md }}
          >
            {user}
          </Text>
        </Skeleton>
      </View>

      <Button
        variant="tertiary"
        size="sm"
        alignSelf="flex-start"
        onPress={() => setUser(null)}
      >
        recharger
      </Button>
    </Section>
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
