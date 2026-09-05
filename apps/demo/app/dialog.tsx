import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Dialog } from '@xaui/native/dialog'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for the `Dialog`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function DialogScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="A question the page waits on"
        note="The backdrop dims, where the Popover's paints nothing: a popover is an aside you read the page around, a dialog is a question and the page behind it is not available until it is answered. It grows from its own centre rather than out of a trigger — a dialog belongs to the screen, not to a control, so the absence of a direction is the message."
      >
        <Confirm />
      </Section>

      <Section
        title="One that must be answered"
        note="isDismissable={false} on the overlay. A press outside does nothing, so the only way out is through one of the buttons — which is what a destructive confirmation is for."
      >
        <Confirm isDismissable={false} />
      </Section>

      <Section
        title="A cross, or the answer in words"
        note="Dialog.Close is empty here and draws its own cross — two rotated bars, not an icon, so it works with no icon set installed. It places itself nowhere: the first sits above the title with alignSelf, the second floats in the corner over a title that has room beside it. A title with space next to it and one without do not want the same answer, and that is layout."
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <CrossAbove />
          <CrossInTheCorner />
        </View>
      </Section>

      <Section
        title="Two layers, and why"
        note="A centred box cannot also be the thing that centres it. An outer layer fills the portal and does the centring; the panel is the box. The outer one takes no touches, so a press that misses the panel reaches the overlay under it and closes the dialog — try pressing beside the panel rather than on the dimmed area."
      >
        <Confirm />
      </Section>

      <Section
        title="Controlled"
        note="Pass isOpen and onOpenChange and the root stops owning it. The link below opens it from outside."
      >
        <Controlled />
      </Section>
    </ScrollView>
  )
}

function Confirm({ isDismissable }: { isDismissable?: boolean }) {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="danger" size="sm">
          Supprimer
        </Button>
      </Dialog.Trigger>
      <Dialog.Overlay isDismissable={isDismissable} />
      <Dialog.Content>
        <Dialog.Title>Supprimer ce document ?</Dialog.Title>
        <Dialog.Description>
          Définitif, sans corbeille. Les personnes à qui vous l’avez partagé perdront
          leur lien.
        </Dialog.Description>
        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <Button variant="tertiary" size="sm">
              Annuler
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button variant="danger" size="sm">
              Supprimer
            </Button>
          </Dialog.Close>
        </View>
      </Dialog.Content>
    </Dialog>
  )
}

/** The cross on its own line, which is what a title spanning the panel leaves room for. */
function CrossAbove() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="sm">
          Croix au-dessus
        </Button>
      </Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Close accessibilityLabel="Fermer" alignSelf="flex-end" />
        <Dialog.Title>Mettre à jour le profil</Dialog.Title>
        <Dialog.Description>
          Le titre tient sur toute la largeur, donc la croix prend sa propre ligne.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog>
  )
}

/** The same cross, absolute, over a title short enough to leave the corner free. */
function CrossInTheCorner() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="sm">
          Croix dans le coin
        </Button>
      </Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Close
          accessibilityLabel="Fermer"
          position="absolute"
          top={12}
          end={12}
        />
        <Dialog.Title>Terminé</Dialog.Title>
        <Dialog.Description>
          Un titre court laisse le coin libre : la croix flotte par-dessus au lieu de
          coûter une ligne.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog>
  )
}

function Controlled() {
  const theme = useXAUITheme()
  const [isOpen, setOpen] = useState(false)

  return (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Dialog isOpen={isOpen} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant="secondary" size="sm">
            {isOpen ? 'Ouvert' : 'Fermé'}
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close
            accessibilityLabel="Fermer"
            position="absolute"
            top={12}
            end={12}
          />
          <Dialog.Title>Piloté de l’extérieur</Dialog.Title>
          <Dialog.Description>La racine ne possède plus l’état.</Dialog.Description>
          <Dialog.Close asChild>
            <Button size="sm">Compris</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog>
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
