import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@xaui/native/dialog'

export default function DialogScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [isBasicOpen, setIsBasicOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState('No action taken yet.')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic Dialog
        </Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Open a simple informational dialog.
        </Text>
        <Button themeColor="primary" onPress={() => setIsBasicOpen(true)}>
          Open Basic Dialog
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Confirm Dialog
        </Text>
        <Text style={[styles.description, { color: colors.foreground }]}>
          Example with cancel and confirm actions.
        </Text>
        <Text style={[styles.statusText, { color: colors.foreground }]}>
          Status: {confirmMessage}
        </Text>
        <Button themeColor="warning" onPress={() => setIsConfirmOpen(true)}>
          Open Confirm Dialog
        </Button>
      </View>

      <Dialog
        isOpen={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        closeOnBackdropPress
      >
        <DialogHeader isClosable onClose={() => setIsBasicOpen(false)}>
          Basic Dialog
        </DialogHeader>
        <DialogBody>
          This is a basic dialog content area. You can place any custom component
          here.
        </DialogBody>
        <DialogFooter>
          <Button
            themeColor="primary"
            fullWidth
            onPress={() => setIsBasicOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        closeOnBackdropPress
      >
        <DialogHeader isClosable onClose={() => setIsConfirmOpen(false)}>
          Delete Item
        </DialogHeader>
        <DialogBody>
          This action cannot be undone. Do you want to continue?
        </DialogBody>
        <DialogFooter style={styles.actionRow}>
          <Button
            variant="flat"
            themeColor="default"
            onPress={() => {
              setConfirmMessage('Cancelled.')
              setIsConfirmOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            themeColor="danger"
            onPress={() => {
              setConfirmMessage('Item deleted.')
              setIsConfirmOpen(false)
            }}
          >
            Confirm
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
    opacity: 0.8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
})
