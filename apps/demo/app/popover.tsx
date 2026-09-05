import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Popover } from '@xaui/native/popover'
import type { PopoverAlign, PopoverPlacement } from '@xaui/native/popover'
import { useXAUITheme } from '@xaui/native/theme'

const PLACEMENTS: PopoverPlacement[] = ['top', 'bottom', 'start', 'end']
const ALIGNS: PopoverAlign[] = ['start', 'center', 'end']

/**
 * The verification screen for the `Popover`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the placement
 * arithmetic it shares with the `Select`.
 *
 * What each section checks is in its subtitle: the four sides, the three alignments, the
 * flip when the room runs out, and the entrance pointing back at the trigger.
 */
export default function PopoverScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 240 }}
    >
      <Section
        title="The four sides"
        note="placement takes start and end as well as top and bottom, which is what separates this from the Select — a list as wide as its own field hanging off the side of it reads as a menu, and a popover has no field. The entrance points back at the trigger either way: a panel below enters upwards, one beside enters sideways."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {PLACEMENTS.map(placement => (
            <Demo key={placement} placement={placement} label={placement} />
          ))}
        </View>
      </Section>

      <Section
        title="The three alignments"
        note="align runs along the axis the side does not pin — horizontal for a panel above or below, vertical for one beside. It clamps to the screen insets, so an aligned panel near an edge slides rather than hanging off."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {ALIGNS.map(align => (
            <Demo key={align} align={align} label={align} />
          ))}
        </View>
      </Section>

      <Section
        title="It flips when the room runs out"
        note="The panel measures itself invisibly, then places itself. Scroll so this trigger sits near the bottom and open it: the panel opens upwards. It flips only when the opposite side has strictly more room — a panel two points short stays where it was asked, because a flip on a near miss reads as a glitch."
      >
        <Demo placement="bottom" label="Près du bas" />
      </Section>

      <Section
        title="No backdrop"
        note="Popover.Overlay is optional. Without it nothing captures the press outside, and only a Popover.Close or your own state closes the panel — which is what a popover inside a sheet that already dims its background needs."
      >
        <Demo label="Sans overlay" hasOverlay={false} withClose />
      </Section>

      <Section
        title="A trigger of your own"
        note="asChild renders the caller's element as the trigger. A popover's trigger is usually a Button, an Icon or a word in a sentence, so the trigger paints nothing of its own — giving it a surface would put a second box around one of those."
      >
        <Popover>
          <Popover.Trigger asChild>
            <Button variant="tertiary">Un vrai bouton</Button>
          </Popover.Trigger>
          <Popover.Overlay />
          <Popover.Content placement="top">
            <Popover.Title>Le trigger est le bouton</Popover.Title>
            <Popover.Description>
              Pas un conteneur autour de lui. Un seul nœud, celui que vous avez
              écrit.
            </Popover.Description>
          </Popover.Content>
        </Popover>
      </Section>

      <Section
        title="Controlled"
        note="Pass isOpen and onOpenChange and the root stops owning it. The link below opens the panel from outside, which is what proves it."
      >
        <ControlledDemo />
      </Section>

      <Section
        title="A wide panel"
        note="width takes a number, 'content-fit' (the default) or 'trigger'. Whatever it resolves to is clamped by the screen insets, so a panel wider than the window becomes a panel the width of the window less twelve points a side."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Demo label="content-fit" />
          <Demo label="280" width={280} />
        </View>
      </Section>
    </ScrollView>
  )
}

type DemoProps = {
  label: string
  placement?: PopoverPlacement
  align?: PopoverAlign
  width?: number
  hasOverlay?: boolean
  withClose?: boolean
}

function Demo({
  label,
  placement,
  align,
  width,
  hasOverlay = true,
  withClose,
}: DemoProps) {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" size="sm">
          {label}
        </Button>
      </Popover.Trigger>
      {hasOverlay ? <Popover.Overlay /> : null}
      <Popover.Content placement={placement} align={align} width={width}>
        <Popover.Title>Livraison</Popover.Title>
        <Popover.Description>
          Sous trois jours ouvrés en France métropolitaine, cinq en Europe.
        </Popover.Description>
        {withClose ? (
          <Popover.Close asChild>
            <Button size="sm">Compris</Button>
          </Popover.Close>
        ) : null}
      </Popover.Content>
    </Popover>
  )
}

function ControlledDemo() {
  const theme = useXAUITheme()
  const [isOpen, setOpen] = useState(false)

  return (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Popover isOpen={isOpen} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button variant="secondary" size="sm">
            {isOpen ? 'Ouvert' : 'Fermé'}
          </Button>
        </Popover.Trigger>
        <Popover.Overlay />
        <Popover.Content placement="top">
          <Popover.Title>Piloté de l'extérieur</Popover.Title>
          <Popover.Description>
            La racine ne possède plus l'état d'ouverture.
          </Popover.Description>
        </Popover.Content>
      </Popover>
      <Text
        onPress={() => setOpen(true)}
        style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}
      >
        Ouvrir depuis l'extérieur
      </Text>
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
