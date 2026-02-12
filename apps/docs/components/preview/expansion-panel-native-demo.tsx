'use client'

import { Text, View } from 'react-native'
import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'
import { WebPreview } from '@/components/ui/web-preview'

const itemAppearance = {
  title: { fontSize: 16 },
}

const itemBodyText = { color: '#666', paddingBottom: 12 }

export function ExpansionPanelNativeDemo() {
  return (
    <WebPreview>
      <View style={{ width: '100%', paddingBottom: 16 }}>
        <ExpansionPanel variant="splitted" showDivider>
          <ExpansionPanelItem
            title="What is Xaui?"
            customAppearance={itemAppearance}
          >
            <Text style={itemBodyText}>
              Xaui is a modern React Native UI library inspired by Flutter.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem title="Key Features" customAppearance={itemAppearance}>
            <Text style={itemBodyText}>
              Flutter-inspired API, smooth animations, complete design system.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem
            title="Getting Started"
            customAppearance={itemAppearance}
          >
            <Text style={itemBodyText}>
              Install @xaui/native, wrap your app with XUIProvider, and start
              building.
            </Text>
          </ExpansionPanelItem>
        </ExpansionPanel>

        <div className="mt-8">
          <ExpansionPanel variant="bordered" showDivider>
            <ExpansionPanelItem
              title="What is Xaui?"
              customAppearance={itemAppearance}
            >
              <Text style={itemBodyText}>
                Xaui is a modern React Native UI library inspired by Flutter.
              </Text>
            </ExpansionPanelItem>
            <ExpansionPanelItem
              title="Key Features"
              customAppearance={itemAppearance}
            >
              <Text style={itemBodyText}>
                Flutter-inspired API, smooth animations, complete design system.
              </Text>
            </ExpansionPanelItem>
            <ExpansionPanelItem
              title="Getting Started"
              customAppearance={itemAppearance}
            >
              <Text style={itemBodyText}>
                Install @xaui/native, wrap your app with XUIProvider, and start
                building.
              </Text>
            </ExpansionPanelItem>
          </ExpansionPanel>
        </div>
      </View>
    </WebPreview>
  )
}
