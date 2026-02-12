'use client'

import { Text, View } from 'react-native'
import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'
import { WebPreview } from '@/components/ui/web-preview'

export function ExpansionPanelNativeDemo() {
  return (
    <WebPreview>
      <View style={{ width: '100%', maxWidth: 480 }}>
        <ExpansionPanel variant="splitted" showDivider>
          <ExpansionPanelItem title="What is Xaui?">
            <Text style={{ padding: 8, color: '#666' }}>
              Xaui is a modern React Native UI library inspired by Flutter.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem title="Key Features">
            <Text style={{ padding: 8, color: '#666' }}>
              Flutter-inspired API, smooth animations, complete design system.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem title="Getting Started">
            <Text style={{ padding: 8, color: '#666' }}>
              Install @xaui/native, wrap your app with XUIProvider, and start
              building.
            </Text>
          </ExpansionPanelItem>
        </ExpansionPanel>
      </View>
    </WebPreview>
  )
}
