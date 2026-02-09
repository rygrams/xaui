import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Pager, PagerItem } from '@xaui/native/pager'
import type { PagerIndicatorRenderState } from '@xaui/native/pager'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

type Slide = {
  key: string
  title: string
  subtitle: string
  color: string
}

const slides: Slide[] = [
  {
    key: 'welcome',
    title: 'Welcome',
    subtitle: 'Build swipeable onboarding in a few lines.',
    color: '#0EA5E9',
  },
  {
    key: 'customize',
    title: 'Customize',
    subtitle: 'Use custom indicator styles or your own renderer.',
    color: '#22C55E',
  },
  {
    key: 'ship',
    title: 'Ship',
    subtitle: 'Combine with any content inside PagerItem.',
    color: '#F97316',
  },
]

function SlideCard({ item, fullscreen = false }: { item: Slide; fullscreen?: boolean }) {
  return (
    <View style={[styles.card, fullscreen && styles.fullscreenCard, { backgroundColor: item.color }]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </View>
  )
}

export default function PagerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [page, setPage] = useState(0)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Fullscreen Indicator
        </Text>
        <View style={styles.fullscreenDemo}>
          <Pager
            isFullscreen
            defaultPage={0}
            onPageChange={setPage}
            customAppearance={{ container: styles.fullscreenPagerContainer }}
          >
            {slides.map(item => (
              <PagerItem key={item.key}>
                <SlideCard item={item} fullscreen />
              </PagerItem>
            ))}
          </Pager>
        </View>
        <Text style={[styles.helperText, { color: colors.foreground }]}>
          Active page: {page + 1}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Indicator
        </Text>
        <Pager
          defaultPage={1}
          renderIndicator={({ index, isActive }: PagerIndicatorRenderState) => (
            <View
              key={`pill-${String(index)}`}
              style={[
                styles.customIndicator,
                {
                  backgroundColor: isActive
                    ? theme.palette.blue[600]
                    : theme.palette.gray[300],
                  width: isActive ? 24 : 10,
                },
              ]}
            />
          )}
        >
          {slides.map(item => (
            <PagerItem key={`custom-${item.key}`}>
              <SlideCard item={item} />
            </PagerItem>
          ))}
        </Pager>
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
    paddingBottom: 32,
  },
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  helperText: {
    marginTop: 8,
    fontSize: 14,
  },
  fullscreenDemo: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
  },
  fullscreenPagerContainer: {
    flex: 1,
  },
  card: {
    height: 186,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },
  fullscreenCard: {
    flex: 1,
    height: '100%',
    borderRadius: 0,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  cardSubtitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
  customIndicator: {
    height: 10,
    borderRadius: 999,
  },
})
