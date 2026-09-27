import { Text, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { DemoCard } from './demo-frame'

const ITEMS = [
  { name: 'Oat flat white', detail: 'Large · extra shot', price: 5.4 },
  { name: 'Almond croissant', detail: 'Warmed', price: 4.2 },
  { name: 'Cold brew beans', detail: 'Ethiopia Guji · 250 g', price: 4.8 },
]

export const ORDER_TOTAL = ITEMS.reduce((sum, item) => sum + item.price, 0)

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`
}

/** A realistic order, so the button under it has something worth paying for. */
export function OrderSummary() {
  const theme = useXAUITheme()

  return (
    <DemoCard>
      <Text
        style={{
          color: theme.colors.muted,
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.fontWeights.semibold,
          letterSpacing: 1,
        }}
      >
        ORDER #4821 · PICKUP 8:15
      </Text>
      {ITEMS.map(item => (
        <View
          key={item.name}
          style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}
        >
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                color: theme.colors.foreground,
                fontSize: theme.fontSizes.md,
                fontWeight: theme.fontWeights.medium,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
            >
              {item.detail}
            </Text>
          </View>
          <Text
            style={{ color: theme.colors.foreground, fontSize: theme.fontSizes.md }}
          >
            {formatPrice(item.price)}
          </Text>
        </View>
      ))}
      <View style={{ height: 1, backgroundColor: theme.colors.separator }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          Total
        </Text>
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          {formatPrice(ORDER_TOTAL)}
        </Text>
      </View>
    </DemoCard>
  )
}
