import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Skeleton } from '@xaui/native/skeleton'

export default function SkeletonScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Interactive</Text>
        <Button
          variant="outlined"
          onPress={() => setIsLoaded(prev => !prev)}
          themeColor="secondary"
        >
          {isLoaded ? 'Show Skeleton' : 'Show Loaded Content'}
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Text Lines</Text>
        <View style={{ gap: theme.spacing.sm }}>
          <Skeleton isLoaded={isLoaded} width="100%" height={16}>
            <Text style={[styles.loadedText, { color: colors.foreground }]}>Account summary</Text>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} width="82%" height={16}>
            <Text style={[styles.loadedText, { color: colors.foreground }]}>Available balance</Text>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} width="68%" height={16}>
            <Text style={[styles.loadedText, { color: colors.foreground }]}>Updated 2 minutes ago</Text>
          </Skeleton>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Avatar Row</Text>
        <View style={styles.row}>
          <Skeleton
            isLoaded={isLoaded}
            width={48}
            height={48}
            radius="full"
          >
            <View style={[styles.avatarLoaded, { backgroundColor: theme.colors.primary.main }]} />
          </Skeleton>
          <View style={{ flex: 1, gap: theme.spacing.sm }}>
            <Skeleton isLoaded={isLoaded} width="75%" height={14}>
              <Text style={[styles.loadedText, { color: colors.foreground }]}>Jamie Park</Text>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} width="55%" height={14}>
              <Text style={[styles.loadedText, { color: colors.foreground }]}>Online now</Text>
            </Skeleton>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Custom & Static</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Skeleton
            isLoaded={false}
            width="100%"
            height={72}
            radius="lg"
            skeletonColor="#bae6fd"
          >
            <View />
          </Skeleton>
          <Skeleton
            isLoaded={false}
            width="100%"
            height={18}
            radius="full"
            disableAnimation
          >
            <View />
          </Skeleton>
        </View>
      </View>

      <View style={{ height: 40 }} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadedText: {
    fontSize: 14,
  },
  avatarLoaded: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
})
