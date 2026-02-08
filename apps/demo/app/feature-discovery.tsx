import { useMemo, useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from '@xaui/native/button'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { FeatureDiscovery } from '@xaui/native/feature-discovery'

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

export default function FeatureDiscoveryScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [items, setItems] = useState(() => createWords(9))
  const [isDiscoveryVisible, setIsDiscoveryVisible] = useState(false)
  const plusButtonRef = useRef<View>(null)

  const contentTitle = useMemo(() => 'Plus one', [])
  const contentDescription = useMemo(
    () => 'Tap the plus icon to add an item to your list.',
    []
  )

  const addOne = () => {
    setItems(prev => [...prev, randomWord()])
  }

  const removeOne = () => {
    setItems(prev => prev.slice(0, -1))
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.description, { color: colors.foreground }]}>This is a simple page showing a list of random words, and has 3 buttons: add one / remove one / refresh.</Text>

        <Text style={[styles.description, { color: colors.foreground }]}>Feature discovery will go through and introduce them.</Text>

        <Button
          themeColor="primary"
          variant="solid"
          startContent={<Text style={{ color: theme.colors.primary.foreground }}>▶</Text>}
          onPress={() => setIsDiscoveryVisible(true)}
          customAppearance={{
            container: { marginTop: 6, marginBottom: 12, alignSelf: 'center' },
          }}
        >
          Start feature discovery
        </Button>

        <View style={styles.listContainer}>
          {items.map((item, index) => (
            <View
              key={`${item}-${index}`}
              style={[
                styles.listItem,
                {
                  backgroundColor: theme.colors.default.background,
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                },
              ]}
            >
              <Text style={[styles.itemText, { color: colors.foreground }]}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.fabStack}>
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
            <Text style={[styles.fabText, { color: theme.colors.primary.foreground }]}>+1</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={removeOne}
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.primary.main,
            },
          ]}
        >
          <Text style={[styles.fabText, { color: theme.colors.primary.foreground }]}>-1</Text>
        </Pressable>
      </View>

      <FeatureDiscovery
        isVisible={isDiscoveryVisible}
        targetRef={plusButtonRef}
        title={contentTitle}
        description={contentDescription}
        actionText="Got it"
        onActionPress={() => setIsDiscoveryVisible(false)}
        onDismiss={() => setIsDiscoveryVisible(false)}
        highlightContent={
          <View
            style={[
              styles.discoveryFab,
              {
                backgroundColor: '#FFFFFF',
              },
            ]}
          >
            <Text style={styles.discoveryFabText}>+1</Text>
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
  fabStack: {
    position: 'absolute',
    right: 18,
    bottom: 34,
    gap: 10,
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
