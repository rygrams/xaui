import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Carousel } from '@xaui/native/carousel'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

type Slide = {
  id: string
  title: string
  subtitle: string
  color: string
}

const marketingSlides: Slide[] = [
  {
    id: '1',
    title: 'Discover',
    subtitle: 'Browse personalized picks and trending content.',
    color: '#0EA5E9',
  },
  {
    id: '2',
    title: 'Save',
    subtitle: 'Pin your favorites and come back later.',
    color: '#22C55E',
  },
  {
    id: '3',
    title: 'Share',
    subtitle: 'Send collections to your team in one tap.',
    color: '#F97316',
  },
  {
    id: '4',
    title: 'Track',
    subtitle: 'Follow progress with real-time updates.',
    color: '#A855F7',
  },
]

const photoSlides: Slide[] = [
  {
    id: 'a',
    title: 'Desert',
    subtitle: 'Editorial campaign',
    color: '#78350F',
  },
  {
    id: 'b',
    title: 'City',
    subtitle: 'Street collection',
    color: '#1E293B',
  },
  {
    id: 'c',
    title: 'Forest',
    subtitle: 'Outdoor essentials',
    color: '#166534',
  },
]

function SlideCard({
  item,
  index,
  foreground,
}: {
  item: Slide
  index: number
  foreground: string
}) {
  return (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.badge}>#{index + 1}</Text>
      <Text style={[styles.cardTitle, { color: foreground }]}>{item.title}</Text>
      <Text style={[styles.cardSubtitle, { color: foreground }]}>
        {item.subtitle}
      </Text>
    </View>
  )
}

export default function CarouselScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Multi Browse
        </Text>
        <Carousel
          data={marketingSlides}
          layout="multi-browse"
          itemWidth={220}
          itemHeight={170}
          showIndicator
          onActiveItemChange={setActiveSlide}
          renderItem={({ item, index }) => (
            <SlideCard item={item} index={index} foreground="#FFFFFF" />
          )}
          keyExtractor={item => item.id}
        />
        <Text style={[styles.helperText, { color: colors.foreground }]}>
          Active item: {activeSlide + 1}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Hero Layout
        </Text>
        <Carousel
          data={marketingSlides}
          layout="hero"
          itemHeight={190}
          showIndicator
          initialIndex={1}
          renderItem={({ item, index }) => (
            <SlideCard item={item} index={index} foreground="#FFFFFF" />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Full Screen + Auto Play
        </Text>
        <Carousel
          data={photoSlides}
          layout="full-screen"
          itemHeight={220}
          autoPlay
          autoPlayInterval={2500}
          showIndicator
          radius="none"
          renderItem={({ item, index }) => (
            <SlideCard item={item} index={index} foreground="#FFFFFF" />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Uncontained + Custom Appearance
        </Text>
        <Carousel
          data={marketingSlides}
          layout="uncontained"
          itemWidth={180}
          itemHeight={150}
          itemSpacing={16}
          contentPadding={8}
          radius="sm"
          showIndicator
          customAppearance={{
            container: { borderRadius: theme.borderRadius.lg },
            item: { borderWidth: 2, borderColor: theme.palette.gray[300] },
            indicator: { backgroundColor: theme.palette.gray[300] },
            activeIndicator: { backgroundColor: theme.palette.gray[900] },
          }}
          renderItem={({ item, index }) => (
            <SlideCard item={item} index={index} foreground="#FFFFFF" />
          )}
          keyExtractor={item => item.id}
        />
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
  card: {
    flex: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.85,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
})
