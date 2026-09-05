import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { BottomSheet } from '@xaui/native/bottom-sheet'
import { Button } from '@xaui/native/button'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for the `BottomSheet`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 */
export default function BottomSheetScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="It comes up, and it can be thrown back down"
        note="Drag the sheet down past a third of its own height and let go, or flick it quickly from anywhere — a quick flick from the top of a tall sheet has not covered a third of it, however clearly it meant to throw the thing away. Anything short of either springs back."
      >
        <Sheet />
      </Section>

      <Section
        title="The handle is written, not drawn for you"
        note="BottomSheet.Handle is the only thing telling a reader the sheet can be dragged — the gesture has no other affordance. It is a slot rather than something the content conjures, because a sheet with isSwipeable={false} should not advertise a gesture it refuses."
      >
        <Sheet withHandle={false} />
      </Section>

      <Section
        title="One that cannot be escaped"
        note="isSwipeable={false} on the content and isDismissable={false} on the overlay. Neither the drag nor a press outside does anything, so the only way out is a BottomSheet.Close — two separate refusals, because a sheet that can be tapped away but not dragged is a real design."
      >
        <Sheet isSwipeable={false} isDismissable={false} />
      </Section>

      <Section
        title="A tall one"
        note="The sheet is as tall as what is in it, and it measures its own height before it slides — nothing else on the screen knows that number. Until the first layout it waits off-screen rather than flashing at its resting place."
      >
        <Sheet tall />
      </Section>

      <Section
        title="Controlled"
        note="Pass isOpen and onOpenChange and the root stops owning it."
      >
        <Controlled />
      </Section>
    </ScrollView>
  )
}

function Sheet({
  withHandle = true,
  isSwipeable,
  isDismissable,
  tall,
}: {
  withHandle?: boolean
  isSwipeable?: boolean
  isDismissable?: boolean
  tall?: boolean
}) {
  const theme = useXAUITheme()

  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <Button variant="secondary" size="sm">
          Partager
        </Button>
      </BottomSheet.Trigger>
      <BottomSheet.Overlay isDismissable={isDismissable} />
      <BottomSheet.Content isSwipeable={isSwipeable}>
        {withHandle ? <BottomSheet.Handle /> : null}
        <BottomSheet.Title>Partager ce document</BottomSheet.Title>
        <BottomSheet.Description>
          Un lien valable sept jours. Les personnes qui l’ouvrent pourront lire, pas
          modifier.
        </BottomSheet.Description>
        {tall
          ? Array.from({ length: 6 }, (_, i) => (
              <Text
                key={i}
                style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
              >
                {`Une ligne de plus, pour que la feuille ait de quoi être haute — ${i + 1}.`}
              </Text>
            ))
          : null}
        <BottomSheet.Close asChild>
          <Button size="sm">Copier le lien</Button>
        </BottomSheet.Close>
      </BottomSheet.Content>
    </BottomSheet>
  )
}

function Controlled() {
  const theme = useXAUITheme()
  const [isOpen, setOpen] = useState(false)

  return (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <BottomSheet isOpen={isOpen} onOpenChange={setOpen}>
        <BottomSheet.Trigger asChild>
          <Button variant="secondary" size="sm">
            {isOpen ? 'Ouverte' : 'Fermée'}
          </Button>
        </BottomSheet.Trigger>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <BottomSheet.Handle />
          <BottomSheet.Title>Pilotée de l’extérieur</BottomSheet.Title>
          <BottomSheet.Description>
            La racine ne possède plus l’état.
          </BottomSheet.Description>
        </BottomSheet.Content>
      </BottomSheet>
      <Text
        onPress={() => setOpen(true)}
        style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}
      >
        Ouvrir depuis l’extérieur
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
