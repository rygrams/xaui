import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { BottomSheet } from '@xaui/native/bottom-sheet'
import { Button } from '@xaui/native/button'

export default function BottomSheetScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [basicOpen, setBasicOpen] = useState(false)
  const [expandableOpen, setExpandableOpen] = useState(false)
  const [themedOpen, setThemedOpen] = useState(false)
  const [noBackdropOpen, setNoBackdropOpen] = useState(false)
  const [customHandleOpen, setCustomHandleOpen] = useState(false)
  const [nonDismissibleOpen, setNonDismissibleOpen] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic Bottom Sheet
        </Text>
        <Button
          onPress={() => setBasicOpen(true)}
          variant="flat"
          themeColor="primary"
        >
          Open Basic Sheet
        </Button>
        <BottomSheet isOpen={basicOpen} onClose={() => setBasicOpen(false)}>
          <View style={[styles.sheetContent, { gap: theme.spacing.md }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              Basic Bottom Sheet
            </Text>
            <Text style={{ color: colors.foreground }}>
              This is a simple bottom sheet that slides up from the bottom. Swipe
              down to dismiss it.
            </Text>
          </View>
        </BottomSheet>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Expandable (3 snap points)
        </Text>
        <Button
          onPress={() => setExpandableOpen(true)}
          variant="flat"
          themeColor="success"
        >
          Open Expandable Sheet
        </Button>
        <BottomSheet
          isOpen={expandableOpen}
          snapPoints={[0.3, 0.6, 0.9]}
          onClose={() => setExpandableOpen(false)}
          onSnapChange={index => {
            const labels = ['collapsed', 'half', 'expanded']
            void labels[index]
          }}
        >
          <View style={[styles.sheetContent, { gap: theme.spacing.md }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              Expandable Sheet
            </Text>
            <Text style={{ color: colors.foreground }}>
              Swipe up to expand this sheet through 3 snap points: 30%, 60%, and 90%
              of the screen height.
            </Text>
            <Text style={{ color: colors.foreground }}>
              Try swiping up quickly to jump to the next snap point, or drag slowly
              to settle at the closest one.
            </Text>
            <View
              style={[
                styles.placeholder,
                { backgroundColor: `${colors.success.main}20` },
              ]}
            >
              <Text style={{ color: colors.success.main, textAlign: 'center' }}>
                Extra content visible when expanded
              </Text>
            </View>
            <View
              style={[
                styles.placeholder,
                { backgroundColor: `${colors.success.main}20` },
              ]}
            >
              <Text style={{ color: colors.success.main, textAlign: 'center' }}>
                More content here
              </Text>
            </View>
          </View>
        </BottomSheet>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <Button
          onPress={() => setThemedOpen(true)}
          variant="flat"
          themeColor="warning"
        >
          Open Themed Sheet
        </Button>
        <BottomSheet
          isOpen={themedOpen}
          themeColor="warning"
          radius="lg"
          onClose={() => setThemedOpen(false)}
        >
          <View style={[styles.sheetContent, { gap: theme.spacing.md }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              Warning Themed Sheet
            </Text>
            <Text style={{ color: colors.foreground }}>
              This bottom sheet uses the warning theme color for its handle
              indicator.
            </Text>
          </View>
        </BottomSheet>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Without Backdrop
        </Text>
        <Button
          onPress={() => setNoBackdropOpen(true)}
          variant="flat"
          themeColor="secondary"
        >
          Open Without Backdrop
        </Button>
        <BottomSheet
          isOpen={noBackdropOpen}
          showBackdrop={false}
          snapPoints={[0.35]}
          onClose={() => setNoBackdropOpen(false)}
        >
          <View style={[styles.sheetContent, { gap: theme.spacing.md }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              No Backdrop
            </Text>
            <Text style={{ color: colors.foreground }}>
              This sheet has no backdrop overlay. Swipe down to dismiss.
            </Text>
          </View>
        </BottomSheet>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Handle
        </Text>
        <Button
          onPress={() => setCustomHandleOpen(true)}
          variant="flat"
          themeColor="tertiary"
        >
          Open Custom Handle Sheet
        </Button>
        <BottomSheet
          isOpen={customHandleOpen}
          onClose={() => setCustomHandleOpen(false)}
          handleContent={
            <View style={styles.customHandle}>
              <View
                style={[
                  styles.customHandleBar,
                  { backgroundColor: colors.primary.main },
                ]}
              />
              <Text
                style={{
                  color: colors.foreground,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Drag here
              </Text>
            </View>
          }
        >
          <View style={[styles.sheetContent, { gap: theme.spacing.md }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              Custom Handle
            </Text>
            <Text style={{ color: colors.foreground }}>
              This sheet uses a custom handle element instead of the default
              indicator bar.
            </Text>
          </View>
        </BottomSheet>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Non-Dismissible
        </Text>
        <Button
          onPress={() => setNonDismissibleOpen(true)}
          variant="flat"
          themeColor="danger"
        >
          Open Non-Dismissible Sheet
        </Button>
        <BottomSheet
          isOpen={nonDismissibleOpen}
          enableSwipeToDismiss={false}
          closeOnBackdropPress={false}
          snapPoints={[0.4]}
        >
          <View style={[styles.sheetContent, { gap: theme.spacing.md }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              Non-Dismissible
            </Text>
            <Text style={{ color: colors.foreground }}>
              This sheet cannot be dismissed by swiping or tapping the backdrop. Use
              the button below to close it.
            </Text>
            <Button
              onPress={() => setNonDismissibleOpen(false)}
              variant="solid"
              themeColor="danger"
            >
              Close Sheet
            </Button>
          </View>
        </BottomSheet>
      </View>
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
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customHandle: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  customHandleBar: {
    width: 48,
    height: 5,
    borderRadius: 3,
  },
})
