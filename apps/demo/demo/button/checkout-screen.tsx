import { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
// #region snippet:solution
import { Button } from '@xaui/native/button'
// #endregion
import { useXAUITheme } from '@xaui/native/theme'
import { DemoFrame } from './demo-frame'
import { CheckIcon, LockIcon, TagIcon } from './icons'
import { ORDER_TOTAL, OrderSummary, formatPrice } from './order-summary'

type PayStatus = 'idle' | 'paying' | 'paid'

/** How long the fake payment takes: long enough to read the spinner on screen. */
const PAYMENT_MS = 1400

function usePayment() {
  const [status, setStatus] = useState<PayStatus>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  function pay() {
    if (status !== 'idle') return
    setStatus('paying')
    timer.current = setTimeout(() => setStatus('paid'), PAYMENT_MS)
  }

  return { status, pay }
}

/** The problem: the order is there, the action that completes it is not. */
export function CheckoutProblem() {
  const theme = useXAUITheme()

  return (
    <DemoFrame
      title="Checkout"
      subtitle="Brewline · Canal Street"
      footer={
        <View
          testID="problem-slot"
          style={{
            height: 56,
            borderRadius: theme.radius.lg,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: theme.colors.muted,
              fontSize: theme.fontSizes['2xl'],
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            ?
          </Text>
        </View>
      }
    >
      <OrderSummary />
    </DemoFrame>
  )
}

/** The minimal usage, exactly as the solution scene shows it. */
export function CheckoutBasic() {
  const { pay } = usePayment()

  return (
    <DemoFrame
      title="Checkout"
      subtitle="Brewline · Canal Street"
      footer={
        // #region snippet:solution
        <Button testID="pay-button" onPress={pay}>
          Pay {formatPrice(ORDER_TOTAL)}
        </Button>
        // #endregion
      }
    >
      <OrderSummary />
    </DemoFrame>
  )
}

/** The finished screen: an emphasis ladder, icons, and a press that loads then lands. */
export function CheckoutFinal() {
  const theme = useXAUITheme()
  const { status, pay } = usePayment()
  const paid = status === 'paid'

  return (
    <DemoFrame
      title="Checkout"
      subtitle="Brewline · Canal Street"
      footer={
        <>
          <Button
            testID="pay-button"
            size="lg"
            isLoading={status === 'paying'}
            color={paid ? theme.colors.success : undefined}
            onPress={pay}
          >
            <Button.Icon as={paid ? CheckIcon : LockIcon} />
            <Button.Label>
              {paid ? 'Paid · see you at 8:15' : `Pay ${formatPrice(ORDER_TOTAL)}`}
            </Button.Label>
          </Button>
          <Button testID="promo-button" variant="secondary">
            <Button.Icon as={TagIcon} />
            <Button.Label>Apply promo code</Button.Label>
          </Button>
          <Button testID="shop-button" variant="ghost">
            Keep shopping
          </Button>
        </>
      }
    >
      <OrderSummary />
    </DemoFrame>
  )
}
