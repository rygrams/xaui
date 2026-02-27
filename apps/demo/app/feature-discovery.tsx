import { useMemo, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { FeatureDiscovery } from '@xaui/native/feature-discovery'
import type { ThemeColor } from '@xaui/native/types'

const WORD_PARTS_A = [
  'Deep',
  'Smooth',
  'Neat',
  'Hour',
  'Strict',
  'Sharp',
  'Herb',
  'Box',
  'Ill',
  'Cloud',
]

const WORD_PARTS_B = [
  'Friend',
  'Round',
  'Cue',
  'Bit',
  'Breath',
  'Lung',
  'Trash',
  'Round',
  'Step',
  'Clock',
]

const randomWord = () => {
  const a = WORD_PARTS_A[Math.floor(Math.random() * WORD_PARTS_A.length)]
  const b = WORD_PARTS_B[Math.floor(Math.random() * WORD_PARTS_B.length)]
  return `${a}${b}`
}

const createWords = (count: number) => Array.from({ length: count }, randomWord)
const LEFT_THEME_COLORS: ThemeColor[] = ['primary', 'secondary', 'tertiary']

export default function FeatureDiscoveryScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [items, setItems] = useState(() => createWords(9))
  const [isDiscoveryVisible, setIsDiscoveryVisible] = useState(false)
  const [currentThemeColor, setCurrentThemeColor] = useState<ThemeColor>('primary')
  const plusButtonRef = useRef<View>(null)
  const minusButtonRef = useRef<View>(null)
  const isLeftExample = useMemo(
    () => LEFT_THEME_COLORS.includes(currentThemeColor),
    [currentThemeColor]
  )

  const contentTitle = useMemo(() => {
    return isLeftExample ? 'Plus one' : 'Minus one'
  }, [isLeftExample])

  const contentDescription = useMemo(() => {
    return isLeftExample
      ? 'Tap the plus icon to add an item to your list.'
      : 'Tap the minus icon to remove an item from your list.'
  }, [isLeftExample])

  const startDiscovery = (themeColor: ThemeColor) => {
    setCurrentThemeColor(themeColor)
    setIsDiscoveryVisible(true)
  }

  const addOne = () => {
    setItems(prev => [...prev, randomWord()])
  }

  const removeOne = () => {
    setItems(prev => prev.slice(0, -1))
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.description, { color: colors.foreground }]}>
          This is a simple page showing a list of random words, and has 2 buttons:
          add one / remove one.
        </Text>

        <Text style={[styles.description, { color: colors.foreground }]}>
          Feature discovery will highlight them with different theme colors.
        </Text>

        <View style={styles.buttonGrid}>
          <Button
            themeColor="primary"
            variant="solid"
            onPress={() => startDiscovery('primary')}
            customAppearance={{ container: { flex: 1 } }}
          >
            Primary
          </Button>
          <Button
            themeColor="secondary"
            variant="solid"
            onPress={() => startDiscovery('secondary')}
            customAppearance={{ container: { flex: 1 } }}
          >
            Secondary
          </Button>
        </View>

        <View style={styles.buttonGrid}>
          <Button
            themeColor="success"
            variant="solid"
            onPress={() => startDiscovery('success')}
            customAppearance={{ container: { flex: 1 } }}
          >
            Success
          </Button>
          <Button
            themeColor="warning"
            variant="solid"
            onPress={() => startDiscovery('warning')}
            customAppearance={{ container: { flex: 1 } }}
          >
            Warning
          </Button>
        </View>

        <View style={styles.buttonGrid}>
          <Button
            themeColor="danger"
            variant="solid"
            onPress={() => startDiscovery('danger')}
            customAppearance={{ container: { flex: 1 } }}
          >
            Danger
          </Button>
          <Button
            themeColor="tertiary"
            variant="solid"
            onPress={() => startDiscovery('tertiary')}
            customAppearance={{ container: { flex: 1 } }}
          >
            Tertiary
          </Button>
        </View>

        <View style={styles.listContainer}>
          {items.map((item, index) => (
            <View
              key={`${item}-${index}`}
              style={[
                styles.listItem,
                {
                  backgroundColor: theme.colors.default.container,
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                },
              ]}
            >
              <Text style={[styles.itemText, { color: colors.foreground }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.fabStackLeft}>
        <View ref={plusButtonRef} collapsable={false}>
          <Pressable
            onPress={addOne}
            style={[
              styles.fab,
              {
                backgroundColor: theme.colors.primary.main,
              },
            ]}
          >
            <Text
              style={[styles.fabText, { color: theme.colors.primary.onMain }]}
            >
              +1
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.fabStackRight}>
        <View ref={minusButtonRef} collapsable={false}>
          <Pressable
            onPress={removeOne}
            style={[
              styles.fab,
              {
                backgroundColor: theme.colors.danger.main,
              },
            ]}
          >
            <Text
              style={[styles.fabText, { color: theme.colors.danger.onMain }]}
            >
              -1
            </Text>
          </Pressable>
        </View>
      </View>

      <FeatureDiscovery
        isVisible={isDiscoveryVisible}
        targetRef={isLeftExample ? plusButtonRef : minusButtonRef}
        title={contentTitle}
        description={contentDescription}
        actionText="Got it"
        themeColor={currentThemeColor}
        onActionPress={() => setIsDiscoveryVisible(false)}
        onDismiss={() => setIsDiscoveryVisible(false)}
        highlightContent={
          <View
            style={[
              styles.discoveryFab,
              {
                backgroundColor: theme.colors[currentThemeColor].onMain,
              },
            ]}
          >
            <Text
              style={[
                styles.discoveryFabText,
                { color: theme.colors[currentThemeColor].main },
              ]}
            >
              {isLeftExample ? '+1' : '-1'}
            </Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 130,
    gap: 10,
  },
  description: {
    fontSize: 17,
    lineHeight: 23,
    paddingHorizontal: 2,
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    borderWidth: 1,
    borderRadius: 6,
    minHeight: 55,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  itemText: {
    fontSize: 32,
    fontWeight: '500',
  },
  fabStackLeft: {
    position: 'absolute',
    left: 18,
    bottom: 34,
    alignItems: 'center',
  },
  fabStackRight: {
    position: 'absolute',
    right: 18,
    bottom: 34,
    alignItems: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    fontSize: 18,
    fontWeight: '700',
  },
  discoveryFab: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    elevation: 6,
  },
  discoveryFabText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },
})
