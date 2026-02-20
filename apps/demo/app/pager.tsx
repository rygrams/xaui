import { useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Pager, PagerItem } from '@xaui/native/pager'
import type { PagerIndicatorRenderState } from '@xaui/native/pager'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

type Slide = {
  key: string
  emoji: string
  title: string
  description: string
  accent: string
  bgLight: string
  bgDark: string
}

const slides: Slide[] = [
  {
    key: 'welcome',
    emoji: '✦',
    title: 'Welcome to XAUI',
    description:
      'A modern React Native UI library inspired by Flutter. Build beautiful mobile apps faster.',
    accent: '#7C3AED',
    bgLight: '#EDE9FE',
    bgDark: '#2E1065',
  },
  {
    key: 'components',
    emoji: '🧩',
    title: '50+ Components',
    description:
      'Buttons, inputs, dialogs, carousels and more. Everything you need, ready to use.',
    accent: '#0EA5E9',
    bgLight: '#E0F2FE',
    bgDark: '#082F49',
  },
  {
    key: 'animations',
    emoji: '⚡',
    title: 'Smooth Animations',
    description:
      'Native-thread animations powered by Reanimated. Silky 60 fps, no jank, ever.',
    accent: '#F59E0B',
    bgLight: '#FEF3C7',
    bgDark: '#451A03',
  },
  {
    key: 'theming',
    emoji: '🎨',
    title: 'Full Theming',
    description:
      'Light & dark mode, 20+ color palettes, and complete custom appearance control.',
    accent: '#10B981',
    bgLight: '#D1FAE5',
    bgDark: '#022C22',
  },
]

function SlideIllustration({ slide, isDark }: { slide: Slide; isDark: boolean }) {
  const bg = isDark ? slide.bgDark : slide.bgLight

  return (
    <View style={[styles.illustrationWrapper, { backgroundColor: bg }]}>
      <View style={[styles.circle, styles.circleOuter, { borderColor: slide.accent, opacity: 0.12 }]} />
      <View style={[styles.circle, styles.circleMid, { borderColor: slide.accent, opacity: 0.22 }]} />
      <View style={[styles.circle, styles.circleInner, { backgroundColor: slide.accent, opacity: 0.14 }]} />
      <Text style={styles.emoji}>{slide.emoji}</Text>
    </View>
  )
}

function PillIndicator({ index, isActive, total, accent }: PagerIndicatorRenderState & { accent: string }) {
  return (
    <View
      key={`dot-${String(index)}-${String(total)}`}
      style={[
        styles.dot,
        isActive
          ? [styles.dotActive, { backgroundColor: accent }]
          : styles.dotInactive,
      ]}
    />
  )
}

export default function PagerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const isDark = theme.mode === 'dark'
  const [page, setPage] = useState(0)

  const slide = slides[page] ?? slides[0]
  const isLast = page === slides.length - 1

  const handleNext = () => {
    if (!isLast) setPage(p => p + 1)
  }

  const handleSkip = () => setPage(slides.length - 1)

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.counter}>
          <Text style={[styles.counterText, { color: colors.foreground }]}>
            {page + 1}
            <Text style={{ opacity: 0.4 }}>/{slides.length}</Text>
          </Text>
        </View>
        {!isLast && (
          <Pressable onPress={handleSkip} hitSlop={12}>
            <Text style={[styles.skipText, { color: slide.accent }]}>Skip</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.pagerWrapper}>
        <Pager
          page={page}
          onPageChange={setPage}
          showIndicator={false}
          customAppearance={{ container: styles.pager }}
        >
          {slides.map(s => (
            <PagerItem key={s.key}>
              <View style={styles.slide}>
                <SlideIllustration slide={s} isDark={isDark} />
                <View style={styles.copy}>
                  <Text style={[styles.title, { color: colors.foreground }]}>{s.title}</Text>
                  <Text style={[styles.description, { color: colors.foreground }]}>
                    {s.description}
                  </Text>
                </View>
              </View>
            </PagerItem>
          ))}
        </Pager>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicators}>
          {slides.map((s, index) => (
            <PillIndicator
              key={s.key}
              index={index}
              isActive={index === page}
              total={slides.length}
              accent={slide.accent}
            />
          ))}
        </View>

        <Pressable
          onPress={isLast ? undefined : handleNext}
          style={[styles.button, { backgroundColor: slide.accent }]}
        >
          <Text style={styles.buttonText}>{isLast ? 'Get Started' : 'Next'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  counter: {},
  counterText: {
    fontSize: 15,
    fontWeight: '600',
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
  },
  pagerWrapper: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  illustrationWrapper: {
    flex: 1,
    marginVertical: 24,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
  },
  circleOuter: {
    width: 280,
    height: 280,
  },
  circleMid: {
    width: 200,
    height: 200,
  },
  circleInner: {
    width: 130,
    height: 130,
    borderWidth: 0,
  },
  emoji: {
    fontSize: 72,
  },
  copy: {
    gap: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.65,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 24,
    gap: 24,
  },
  indicators: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    width: 28,
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#D1D5DB',
  },
  button: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
})
