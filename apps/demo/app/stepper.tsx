import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Stepper, StepperItem } from '@xaui/native/stepper'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function StepperScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [activeKey, setActiveKey] = useState('details')

  return (
    <ScrollView
      style={[localStyles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[localStyles.content, { gap: theme.spacing.lg }]}
    >
      <View style={localStyles.section}>
        <Text style={[localStyles.title, { color: colors.foreground }]}>Horizontal</Text>
        <Stepper activeKey={activeKey} onStepChange={setActiveKey}>
          <StepperItem itemKey="account" title="Account" description="Create profile" />
          <StepperItem itemKey="details" title="Details" description="Personal info" />
          <StepperItem itemKey="payment" title="Payment" description="Card details" />
          <StepperItem itemKey="review" title="Review" description="Confirm" isLocked />
        </Stepper>
        <Text style={[localStyles.label, { color: colors.foreground }]}>Active: {activeKey}</Text>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.title, { color: colors.foreground }]}>
          Vertical (No Lines)
        </Text>
        <Stepper direction="vertical" showLines={false} defaultActiveKey="ship">
          <StepperItem itemKey="cart" title="Cart" description="Items selected" />
          <StepperItem itemKey="ship" title="Shipping" description="Address details" />
          <StepperItem itemKey="pay" title="Payment" description="Choose method" />
          <StepperItem itemKey="done" title="Done" description="Order confirmed" />
        </Stepper>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.title, { color: colors.foreground }]}>Custom Indicator</Text>
        <Stepper direction="vertical" defaultActiveKey="sync" themeColor="success">
          <StepperItem
            itemKey="queue"
            title="Queued"
            description="Waiting for worker"
            indicator={({ index }) => (
              <Text style={[localStyles.badge, { color: colors.foreground }]}>{index + 1}</Text>
            )}
          />
          <StepperItem
            itemKey="sync"
            title="Syncing"
            description="Upload in progress"
            indicator={({ isActive, isCompleted }) => (
              <Text style={[localStyles.badge, { color: colors.foreground }]}>
                {isCompleted ? 'DONE' : isActive ? 'NOW' : 'WAIT'}
              </Text>
            )}
          />
          <StepperItem
            itemKey="finish"
            title="Finish"
            description="Ready"
            isLocked
            indicator="L"
          />
        </Stepper>
      </View>
    </ScrollView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
  },
})
