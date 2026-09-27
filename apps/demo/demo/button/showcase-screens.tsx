import { useState } from 'react'
import { View } from 'react-native'
import { Button } from '@xaui/native/button'
import { PressableFeedback } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { DemoCard, DemoFrame } from './demo-frame'
import {
  CartIcon,
  CheckIcon,
  HeartIcon,
  LockIcon,
  ShareIcon,
  TrashIcon,
} from './icons'

/**
 * The screens the code scenes film. Each region is the snippet shown in the code card, so
 * what is on the phone is what the code says, line for line (`testID`s are stripped).
 */
export function VariantsScreen() {
  return (
    <DemoFrame title="Membership" subtitle="Seven variants, one prop">
      {/* #region snippet:variants */}
      <Button variant="primary">Start free trial</Button>
      <Button variant="secondary">Compare plans</Button>
      <Button variant="default">Maybe later</Button>
      <Button variant="tertiary">Restore purchase</Button>
      <Button variant="ghost">Terms of service</Button>
      <Button variant="danger">Cancel subscription</Button>
      <Button variant="danger-soft">Delete account</Button>
      {/* #endregion */}
    </DemoFrame>
  )
}

export function SizesScreen() {
  return (
    <DemoFrame title="Sizes" subtitle="Height, padding and type. Never width.">
      {/* #region snippet:sizes */}
      <Button size="xs">Follow</Button>
      <Button size="sm">Add to list</Button>
      <Button size="md">Book a table</Button>
      <Button size="lg">Continue</Button>
      {/* #endregion */}
    </DemoFrame>
  )
}

export function ColorsScreen() {
  return (
    <DemoFrame title="Your brand" subtitle="One hex, placed by the variant">
      {/* #region snippet:color */}
      <Button color="#7c3aed">Upgrade to Pro</Button>
      <Button variant="secondary" color="#7c3aed">
        See what’s new
      </Button>
      <Button variant="tertiary" color="#7c3aed">
        Invite a teammate
      </Button>
      {/* #endregion */}
    </DemoFrame>
  )
}

/** Slots in JSX order, an icon-only save, and a loading state the press triggers. */
export function ComposeScreen() {
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  function add() {
    if (adding || added) return
    setAdding(true)
    setTimeout(() => {
      setAdding(false)
      setAdded(true)
    }, 1200)
  }

  const label = added ? 'Added' : 'Add to cart'

  return (
    <DemoFrame title="Oat flat white" subtitle="Large · extra shot · $5.40">
      <ProductArt />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* #region snippet:compose */}
        <Button
          testID="save-button"
          isIconOnly
          variant="tertiary"
          accessibilityLabel="Save"
        >
          <Button.Icon as={HeartIcon} />
        </Button>
        <Button testID="add-button" flex={1} isLoading={adding} onPress={add}>
          <Button.Icon as={CartIcon} />
          <Button.Label>{label}</Button.Label>
        </Button>
        {/* #endregion */}
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button flex={1} variant="ghost">
          <Button.Icon as={ShareIcon} />
          <Button.Label>Share</Button.Label>
        </Button>
        <Button flex={1} variant="danger-soft">
          <Button.Icon as={TrashIcon} />
          <Button.Label>Remove</Button.Label>
        </Button>
      </View>
    </DemoFrame>
  )
}

function ProductArt() {
  const theme = useXAUITheme()

  return (
    <DemoCard>
      <View
        style={{
          height: 180,
          borderRadius: theme.radius.xl,
          backgroundColor: theme.colors.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* A flat white seen from above: saucer, cup, crema. */}
        <View
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: theme.colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            ...theme.shadows.surface,
          }}
        >
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: '#8a5a3b',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 58,
                height: 58,
                borderRadius: 29,
                backgroundColor: '#e8d5bd',
              }}
            />
          </View>
        </View>
      </View>
    </DemoCard>
  )
}

/** The short's close-up: one large button, a wave under the finger, a load, a landing. */
export function HookScreen() {
  const theme = useXAUITheme()
  const [status, setStatus] = useState<'idle' | 'paying' | 'paid'>('idle')
  const paid = status === 'paid'

  function pay() {
    if (status !== 'idle') return
    setStatus('paying')
    setTimeout(() => setStatus('paid'), 1400)
  }

  return (
    <View
      testID="scene-ready"
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        backgroundColor: theme.colors.background,
      }}
    >
      <Button
        testID="hook-button"
        size="lg"
        isLoading={status === 'paying'}
        color={paid ? theme.colors.success : undefined}
        onPress={pay}
      >
        <PressableFeedback.Ripple />
        <Button.Icon as={paid ? CheckIcon : LockIcon} />
        <Button.Label>{paid ? 'Paid' : 'Pay $14.40'}</Button.Label>
      </Button>
    </View>
  )
}
