import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AddIcon } from '@xaui/icons/add'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { AppBarContent, AppBarEndContent, AppBarStartContent } from '@xaui/native/app-bar'
import { Button } from '@xaui/native/button'
import {
  Scaffold,
  ScaffoldAppBar,
  ScaffoldBody,
  ScaffoldFabButton,
  ScaffoldFooter,
} from '@xaui/native/scaffold'

export default function ScaffoldScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loadCount, setLoadCount] = useState(0)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLoadCount(c => c + 1)
    }, 1800)
  }

  const handleLoad = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2500)
  }

  return (
    <Scaffold isLoading={isLoading} isRefreshing={isRefreshing} themeColor="primary" onRefresh={handleRefresh}>
      <ScaffoldAppBar>
        <AppBarStartContent>
          <ArrowBackIcon size={22} color={colors.foreground} />
        </AppBarStartContent>
        <AppBarContent alignment="start">
          <Text style={[styles.title, { color: colors.foreground }]}>Scaffold</Text>
        </AppBarContent>
        <AppBarEndContent>
          <Text style={{ fontSize: 13, color: colors.foreground, opacity: 0.5 }}>
            Refreshed {loadCount}×
          </Text>
        </AppBarEndContent>
      </ScaffoldAppBar>

      <ScaffoldBody>
        <View style={[styles.content, { gap: theme.spacing.md }]}>
          <View style={[styles.card, { backgroundColor: colors.foreground + '08' }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>Pull to refresh</Text>
            <Text style={[styles.cardBody, { color: colors.foreground + 'aa' }]}>
              Pull down on this page to trigger the native refresh control.
            </Text>
          </View>

          {Array.from({ length: 8 }, (_, i) => (
            <View key={i} style={[styles.card, { backgroundColor: colors.foreground + '06' }]}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>Item {i + 1}</Text>
              <Text style={[styles.cardBody, { color: colors.foreground + '88' }]}>
                Scaffold body content scrolls naturally.
              </Text>
            </View>
          ))}
        </View>
      </ScaffoldBody>

      <ScaffoldFooter>
        <View
          style={[
            styles.footer,
            {
              backgroundColor: theme.mode === 'dark' ? theme.colors.default.background : '#ffffff',
              borderTopColor: colors.foreground + '14',
            },
          ]}
        >
          <Button
            variant="flat"
            themeColor="primary"
            fullWidth
            onPress={handleLoad}
            isLoading={isLoading}
          >
            {isLoading ? 'Loading…' : 'Trigger loader'}
          </Button>
        </View>
      </ScaffoldFooter>

      <ScaffoldFabButton icon={<AddIcon />} label="Add item" themeColor="primary" onPress={() => {}} />
    </Scaffold>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
  },
})
