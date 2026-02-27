import { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Button } from '@xaui/native/button'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@xaui/native/dialog'

export default function DialogScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [basicOpen, setBasicOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [placementOpen, setPlacementOpen] = useState<'top' | 'bottom' | null>(null)
  const [backdropOpen, setBackdropOpen] = useState<'blurred' | 'transparent' | null>(null)
  const [sizeOpen, setSizeOpen] = useState<'sm' | 'lg' | 'full' | null>(null)
  const [successOpen, setSuccessOpen] = useState(false)

  const [deleteStatus, setDeleteStatus] = useState('')
  const [formName, setFormName] = useState('Alex Moreau')
  const [formEmail, setFormEmail] = useState('alex@example.com')
  const [savedProfile, setSavedProfile] = useState({ name: 'Alex Moreau', email: 'alex@example.com' })

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Basic</Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Simple informational dialog with a close action.
        </Text>
        <Button themeColor="primary" onPress={() => setBasicOpen(true)}>
          Open Dialog
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Destructive Confirm
        </Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          High-stakes action requiring explicit confirmation.
        </Text>
        {deleteStatus !== '' && (
          <Text style={[styles.status, { color: colors.foreground }]}>
            → {deleteStatus}
          </Text>
        )}
        <Button themeColor="danger" variant="bordered" onPress={() => setDeleteOpen(true)}>
          Delete Account
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Form Dialog</Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Edit profile with form inputs inside a dialog.
        </Text>
        <Text style={[styles.status, { color: colors.foreground }]}>
          {savedProfile.name} · {savedProfile.email}
        </Text>
        <Button themeColor="secondary" onPress={() => setFormOpen(true)}>
          Edit Profile
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Placement</Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Dialog can appear at the top or bottom of the screen.
        </Text>
        <View style={styles.row}>
          <Button
            size="sm"
            themeColor="primary"
            variant="bordered"
            onPress={() => setPlacementOpen('top')}
          >
            Top
          </Button>
          <Button
            size="sm"
            themeColor="primary"
            variant="bordered"
            onPress={() => setPlacementOpen('bottom')}
          >
            Bottom
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Backdrop</Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Control the backdrop appearance behind the dialog.
        </Text>
        <View style={styles.row}>
          <Button
            size="sm"
            themeColor="secondary"
            variant="bordered"
            onPress={() => setBackdropOpen('blurred')}
          >
            Blurred
          </Button>
          <Button
            size="sm"
            themeColor="secondary"
            variant="bordered"
            onPress={() => setBackdropOpen('transparent')}
          >
            Transparent
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Sizes</Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Three size presets: sm, lg, and full screen.
        </Text>
        <View style={styles.row}>
          <Button
            size="sm"
            themeColor="tertiary"
            variant="bordered"
            onPress={() => setSizeOpen('sm')}
          >
            Small
          </Button>
          <Button
            size="sm"
            themeColor="tertiary"
            variant="bordered"
            onPress={() => setSizeOpen('lg')}
          >
            Large
          </Button>
          <Button
            size="sm"
            themeColor="tertiary"
            variant="bordered"
            onPress={() => setSizeOpen('full')}
          >
            Full
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Success</Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Themed success notification dialog.
        </Text>
        <Button themeColor="success" onPress={() => setSuccessOpen(true)}>
          Show Success
        </Button>
      </View>

      {/* Basic Dialog */}
      <Dialog isOpen={basicOpen} onClose={() => setBasicOpen(false)} closeOnBackdropPress>
        <DialogHeader isClosable onClose={() => setBasicOpen(false)}>
          What's New in v2.0
        </DialogHeader>
        <DialogBody>
          <View style={styles.changelogList}>
            {[
              '✦  Redesigned component theming system',
              '✦  New animation engine with 60fps target',
              '✦  Dark mode support across all components',
              '✦  Improved accessibility & screen reader support',
            ].map(line => (
              <Text key={line} style={[styles.changelogItem, { color: colors.foreground }]}>
                {line}
              </Text>
            ))}
          </View>
        </DialogBody>
        <DialogFooter>
          <Button themeColor="primary" fullWidth onPress={() => setBasicOpen(false)}>
            Got it
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Destructive Dialog */}
      <Dialog isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} closeOnBackdropPress>
        <DialogHeader isClosable onClose={() => setDeleteOpen(false)}>
          Delete Account
        </DialogHeader>
        <DialogBody>
          <View style={{ gap: 8 }}>
            <Text style={[styles.bodyText, { color: colors.foreground }]}>
              This will permanently delete your account and all associated data:
            </Text>
            {['All projects and files', 'Billing history', 'Team memberships', 'API keys'].map(
              item => (
                <Text key={item} style={[styles.bulletItem, { color: colors.foreground }]}>
                  • {item}
                </Text>
              )
            )}
            <Text style={[styles.warningText, { color: theme.colors.danger.main }]}>
              This action cannot be undone.
            </Text>
          </View>
        </DialogBody>
        <DialogFooter style={styles.actionRow}>
          <Button
            variant="flat"
            themeColor="secondary"
            onPress={() => {
              setDeleteStatus('Cancelled.')
              setDeleteOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            themeColor="danger"
            onPress={() => {
              setDeleteStatus('Account deleted.')
              setDeleteOpen(false)
            }}
          >
            Delete Forever
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Form Dialog */}
      <Dialog isOpen={formOpen} onClose={() => setFormOpen(false)} closeOnBackdropPress>
        <DialogHeader isClosable onClose={() => setFormOpen(false)}>
          Edit Profile
        </DialogHeader>
        <DialogBody>
          <View style={{ gap: 14 }}>
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.foreground }]}>Full name</Text>
              <TextInput
                value={formName}
                onChangeText={setFormName}
                style={[
                  styles.textInput,
                  {
                    color: colors.foreground,
                    borderColor: theme.colors.primary.main,
                    backgroundColor: colors.background,
                  },
                ]}
                placeholderTextColor={`${colors.foreground}60`}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.foreground }]}>Email</Text>
              <TextInput
                value={formEmail}
                onChangeText={setFormEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[
                  styles.textInput,
                  {
                    color: colors.foreground,
                    borderColor: theme.colors.primary.main,
                    backgroundColor: colors.background,
                  },
                ]}
                placeholderTextColor={`${colors.foreground}60`}
              />
            </View>
          </View>
        </DialogBody>
        <DialogFooter style={styles.actionRow}>
          <Button variant="flat" themeColor="secondary" onPress={() => setFormOpen(false)}>
            Cancel
          </Button>
          <Button
            themeColor="primary"
            onPress={() => {
              setSavedProfile({ name: formName, email: formEmail })
              setFormOpen(false)
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Placement Dialogs */}
      <Dialog
        isOpen={placementOpen !== null}
        onClose={() => setPlacementOpen(null)}
        placement={placementOpen ?? 'center'}
        closeOnBackdropPress
      >
        <DialogHeader isClosable onClose={() => setPlacementOpen(null)}>
          Placement: {placementOpen}
        </DialogHeader>
        <DialogBody>
          This dialog appears at the {placementOpen} of the screen using the{' '}
          <Text style={{ fontWeight: '700' }}>placement</Text> prop.
        </DialogBody>
        <DialogFooter>
          <Button themeColor="primary" fullWidth onPress={() => setPlacementOpen(null)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Backdrop Dialogs */}
      <Dialog
        isOpen={backdropOpen !== null}
        onClose={() => setBackdropOpen(null)}
        backdrop={backdropOpen ?? 'opaque'}
        closeOnBackdropPress
      >
        <DialogHeader isClosable onClose={() => setBackdropOpen(null)}>
          Backdrop: {backdropOpen}
        </DialogHeader>
        <DialogBody>
          The background behind this dialog uses the{' '}
          <Text style={{ fontWeight: '700' }}>{backdropOpen}</Text> backdrop style.
        </DialogBody>
        <DialogFooter>
          <Button themeColor="secondary" fullWidth onPress={() => setBackdropOpen(null)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Size Dialogs */}
      <Dialog
        isOpen={sizeOpen !== null}
        onClose={() => setSizeOpen(null)}
        size={sizeOpen ?? 'md'}
        closeOnBackdropPress
      >
        <DialogHeader isClosable onClose={() => setSizeOpen(null)}>
          Size: {sizeOpen}
        </DialogHeader>
        <DialogBody>
          This dialog uses the <Text style={{ fontWeight: '700' }}>{sizeOpen}</Text> size preset.
          Adjust width and content area to fit your use case.
        </DialogBody>
        <DialogFooter>
          <Button themeColor="tertiary" fullWidth onPress={() => setSizeOpen(null)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        closeOnBackdropPress
        customAppearance={{
          container: { borderColor: theme.colors.success.main },
        }}
      >
        <DialogHeader>Payment Successful</DialogHeader>
        <DialogBody>
          <View style={styles.successContent}>
            <View style={[styles.successIcon, { backgroundColor: theme.colors.success.container }]}>
              <Text style={[styles.successEmoji, { color: theme.colors.success.main }]}>✓</Text>
            </View>
            <Text style={[styles.successAmount, { color: colors.foreground }]}>$129.00</Text>
            <Text style={[styles.successSub, { color: colors.foreground }]}>
              Your subscription has been renewed. A receipt has been sent to your email.
            </Text>
          </View>
        </DialogBody>
        <DialogFooter>
          <Button themeColor="success" fullWidth onPress={() => setSuccessOpen(false)}>
            Done
          </Button>
        </DialogFooter>
      </Dialog>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.85,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  changelogList: {
    gap: 10,
  },
  changelogItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bulletItem: {
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 6,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
  textInput: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  successContent: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successEmoji: {
    fontSize: 28,
    fontWeight: '700',
  },
  successAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  successSub: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    opacity: 0.7,
  },
})
