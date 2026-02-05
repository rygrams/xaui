import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Alert } from '@xaui/native/alert'
import { Button } from '@xaui/native/button'

export default function AlertsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [showDismissable, setShowDismissable] = useState(true)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="Default Alert"
            description="This is a default alert with some description text."
            themeColor="default"
          />
          <Alert
            title="Primary Alert"
            description="This is a primary alert with some description text."
            themeColor="primary"
          />
          <Alert
            title="Success Alert"
            description="Your action was completed successfully!"
            themeColor="success"
          />
          <Alert
            title="Warning Alert"
            description="Please be careful with this action."
            themeColor="warning"
          />
          <Alert
            title="Danger Alert"
            description="Something went wrong. Please try again."
            themeColor="danger"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="Solid Variant"
            description="This is a solid variant alert."
            variant="solid"
            themeColor="primary"
          />
          <Alert
            title="Bordered Variant"
            description="This is a bordered variant alert."
            variant="bordered"
            themeColor="primary"
          />
          <Alert
            title="Flat Variant"
            description="This is a flat variant alert."
            variant="flat"
            themeColor="primary"
          />
          <Alert
            title="Faded Variant"
            description="This is a faded variant alert."
            variant="faded"
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius Options
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="No Radius"
            description="Alert with no border radius."
            radius="none"
            themeColor="primary"
          />
          <Alert
            title="Small Radius"
            description="Alert with small border radius."
            radius="sm"
            themeColor="primary"
          />
          <Alert
            title="Medium Radius"
            description="Alert with medium border radius."
            radius="md"
            themeColor="primary"
          />
          <Alert
            title="Large Radius"
            description="Alert with large border radius."
            radius="lg"
            themeColor="primary"
          />
          <Alert
            title="Full Radius"
            description="Alert with full border radius."
            radius="full"
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Closable Alerts
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="Closable Alert"
            description="Click the X button to close this alert."
            isClosable
            themeColor="success"
          />
          {showDismissable && (
            <Alert
              title="Dismissable Alert"
              description="This alert can be dismissed programmatically."
              isClosable
              themeColor="warning"
              onClose={() => setShowDismissable(false)}
            />
          )}
          {!showDismissable && (
            <Button onPress={() => setShowDismissable(true)} variant="flat">
              Show Dismissable Alert
            </Button>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Without Icon
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="Alert Without Icon"
            description="This alert doesn't show an icon."
            hideIcon
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Custom Content
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="Alert with Children"
            description="This alert has additional content below."
            themeColor="primary"
          >
            <Text style={{ color: colors.foreground, marginTop: theme.spacing.sm }}>
              This is additional custom content that can be added as children.
            </Text>
          </Alert>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Styles
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert
            title="Custom Styled Alert"
            description="This alert has custom styling applied."
            themeColor="primary"
            customAppearance={{
              container: {
                borderWidth: 2,
                borderColor: colors.primary.main,
              },
              title: {
                fontSize: 18,
                fontWeight: 'bold',
              },
              description: {
                fontSize: 14,
                fontStyle: 'italic',
              },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Title Only
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Alert title="Simple Alert" themeColor="success" />
          <Alert title="Another Simple Alert" themeColor="danger" isClosable />
        </View>
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
})
