import { Button } from '@xaui/native/button'
import { Drawer } from '@xaui/native/drawer'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function DrawerScreen() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [themedOpen, setThemedOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)
  const [widthOpen, setWidthOpen] = useState(false)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Drawer Positions</Text>
        <Text style={styles.description}>
          Drawer component with 4 positions: left, right, top, bottom
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Left Drawer</Text>
        <Button onPress={() => setLeftOpen(true)}>Open Left Drawer</Button>
        <Drawer isOpen={leftOpen} position="left" onClose={() => setLeftOpen(false)}>
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Left Drawer</Text>
            <Text style={styles.drawerText}>This is a left drawer</Text>
            <Button onPress={() => setLeftOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Right Drawer</Text>
        <Button onPress={() => setRightOpen(true)}>Open Right Drawer</Button>
        <Drawer
          isOpen={rightOpen}
          position="right"
          onClose={() => setRightOpen(false)}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Right Drawer</Text>
            <Text style={styles.drawerText}>This is a right drawer</Text>
            <Button onPress={() => setRightOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Drawer</Text>
        <Button onPress={() => setTopOpen(true)}>Open Top Drawer</Button>
        <Drawer
          isOpen={topOpen}
          position="top"
          height={300}
          onClose={() => setTopOpen(false)}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Top Drawer</Text>
            <Text style={styles.drawerText}>This is a top drawer</Text>
            <Button onPress={() => setTopOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bottom Drawer</Text>
        <Button onPress={() => setBottomOpen(true)}>Open Bottom Drawer</Button>
        <Drawer
          isOpen={bottomOpen}
          position="bottom"
          height={300}
          onClose={() => setBottomOpen(false)}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Bottom Drawer</Text>
            <Text style={styles.drawerText}>This is a bottom drawer</Text>
            <Button onPress={() => setBottomOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Width Drawer</Text>
        <Button onPress={() => setWidthOpen(true)}>Open Wide Drawer</Button>
        <Drawer
          isOpen={widthOpen}
          position="left"
          width={350}
          onClose={() => setWidthOpen(false)}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Wide Drawer</Text>
            <Text style={styles.drawerText}>
              This drawer has custom width of 350px
            </Text>
            <Button onPress={() => setWidthOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Themed Drawer</Text>
        <Button onPress={() => setThemedOpen(true)} themeColor="primary">
          Open Themed Drawer
        </Button>
        <Drawer
          isOpen={themedOpen}
          position="right"
          themeColor="primary"
          onClose={() => setThemedOpen(false)}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Themed Drawer</Text>
            <Text style={styles.drawerText}>
              This drawer uses primary theme color
            </Text>
            <Button onPress={() => setThemedOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Overlay Drawer</Text>
        <Button onPress={() => setCustomOpen(true)} themeColor="secondary">
          Open Without Overlay
        </Button>
        <Drawer
          isOpen={customOpen}
          position="left"
          showOverlay={false}
          onClose={() => setCustomOpen(false)}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>No Overlay</Text>
            <Text style={styles.drawerText}>
              This drawer has no overlay backdrop
            </Text>
            <Button onPress={() => setCustomOpen(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </Drawer>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  drawerContent: {
    flex: 1,
    padding: 24,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  drawerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  closeButton: {
    marginTop: 16,
  },
})
