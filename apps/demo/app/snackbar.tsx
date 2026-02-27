import { useCallback, useState } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Button } from '@xaui/native/button'
import { SnackbarStack, type SnackbarItem } from '@xaui/native/snackbar'

const createSnackbarId = () =>
  `snackbar-${Date.now()}-${Math.random().toString(16).slice(2)}`

type SnackbarPlacement = 'top' | 'bottom'

export default function SnackbarScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [bottomSnackbars, setBottomSnackbars] = useState<SnackbarItem[]>([])
  const [topSnackbars, setTopSnackbars] = useState<SnackbarItem[]>([])

  const addSnackbar = useCallback(
    (placement: SnackbarPlacement, item: Omit<SnackbarItem, 'id'>) => {
      const snackbar = { id: createSnackbarId(), ...item }

      if (placement === 'top') {
        setTopSnackbars(prev => [...prev, snackbar].slice(-4))
        return
      }

      setBottomSnackbars(prev => [...prev, snackbar].slice(-4))
    },
    []
  )

  const dismissSnackbar = useCallback((placement: SnackbarPlacement, id: string) => {
    if (placement === 'top') {
      setTopSnackbars(prev => prev.filter(snackbar => snackbar.id !== id))
      return
    }

    setBottomSnackbars(prev => prev.filter(snackbar => snackbar.id !== id))
  }, [])

  const clearAllSnackbars = useCallback(() => {
    setBottomSnackbars([])
    setTopSnackbars([])
  }, [])

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Basic Variants
          </Text>
          <View style={[styles.buttonGroup, { gap: theme.spacing.sm }]}>
            <Button
              variant="bordered"
              themeColor="primary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Single-line snackbar',
                })
              }
            >
              Single-line
            </Button>
            <Button
              variant="bordered"
              themeColor="primary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Single-line snackbar with close affordance',
                  showCloseAffordance: true,
                })
              }
            >
              With Close
            </Button>
            <Button
              variant="bordered"
              themeColor="secondary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Single-line snackbar with action',
                  actionLabel: 'Action',
                  onActionPress: () => {
                    addSnackbar('bottom', {
                      message: 'Action clicked',
                      duration: 1800,
                      themeColor: 'success',
                    })
                  },
                })
              }
            >
              With Action
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Multi-line & Long Action
          </Text>
          <View style={[styles.buttonGroup, { gap: theme.spacing.sm }]}>
            <Button
              variant="bordered"
              themeColor="secondary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Two-line snackbar without action and with more content',
                  numberOfLines: 2,
                })
              }
            >
              2 Lines
            </Button>
            <Button
              variant="bordered"
              themeColor="secondary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Two-line snackbar with action and close affordance',
                  numberOfLines: 2,
                  actionLabel: 'Action',
                  showCloseAffordance: true,
                })
              }
            >
              2 Lines + Action + Close
            </Button>
            <Button
              variant="bordered"
              themeColor="secondary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Two-line snackbar with longer action label',
                  numberOfLines: 2,
                  actionLabel: 'Longer Action',
                  showCloseAffordance: true,
                })
              }
            >
              Longer Action
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Theme & Timing
          </Text>
          <View style={[styles.buttonGroup, { gap: theme.spacing.sm }]}>
            <Button
              variant="bordered"
              themeColor="success"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Success snackbar',
                  themeColor: 'success',
                  duration: 2000,
                })
              }
            >
              Success (2s)
            </Button>
            <Button
              variant="bordered"
              themeColor="warning"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Warning snackbar',
                  themeColor: 'warning',
                  duration: 5000,
                  showCloseAffordance: true,
                })
              }
            >
              Warning (5s)
            </Button>
            <Button
              variant="bordered"
              themeColor="danger"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Persistent danger snackbar',
                  themeColor: 'danger',
                  duration: 0,
                  showCloseAffordance: true,
                })
              }
            >
              Persistent
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Stack Position
          </Text>
          <View style={[styles.buttonGroup, { gap: theme.spacing.sm }]}>
            <Button
              variant="bordered"
              themeColor="primary"
              size="sm"
              onPress={() =>
                addSnackbar('bottom', {
                  message: 'Bottom stack snackbar',
                  showCloseAffordance: true,
                })
              }
            >
              Add Bottom
            </Button>
            <Button
              variant="bordered"
              themeColor="primary"
              size="sm"
              onPress={() =>
                addSnackbar('top', {
                  message: 'Top stack snackbar',
                  showCloseAffordance: true,
                  duration: 3500,
                })
              }
            >
              Add Top
            </Button>
            <Button
              variant="flat"
              themeColor="danger"
              size="sm"
              onPress={clearAllSnackbars}
            >
              Clear All
            </Button>
          </View>
        </View>
      </ScrollView>

      <SnackbarStack
        items={bottomSnackbars}
        onDismiss={(id: string) => dismissSnackbar('bottom', id)}
        position="bottom"
        maxWidth={440}
        insetVertical={24}
      />
      <SnackbarStack
        items={topSnackbars}
        onDismiss={(id: string) => dismissSnackbar('top', id)}
        position="top"
        maxWidth={440}
        insetVertical={24}
      />
    </>
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
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
