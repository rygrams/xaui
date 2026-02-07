import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@xaui/native/card'
import { Button } from '@xaui/native/button'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function CardScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [, setPressedCount] = useState(0)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic
        </Text>
        <Card themeColor="default" elevation={2}>
          <CardHeader>
            <CardTitle>Card Header</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              This is a simple card with header, body and footer sections.
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="outlined">
              Learn more
            </Button>
          </CardFooter>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Pressable + Hoverable
        </Text>

        <Card
          elevation={2}
          themeColor="primary"
          isPressable
          isHoverable
          onPress={() => setPressedCount(value => value + 1)}
        >
          <CardHeader>
            <CardTitle>Card Header</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              This is a simple card with header, body and footer sections.
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="outlined">
              Learn more
            </Button>
          </CardFooter>
        </Card>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius + Shadow
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Card themeColor="secondary" radius="none">
            <CardBody>
              <CardTitle>No Radius / No Shadow</CardTitle>
            </CardBody>
          </Card>
          <Card themeColor="secondary" radius="full">
            <CardBody>
              <CardTitle>Full Radius / Large Shadow</CardTitle>
            </CardBody>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Blurred Footer
        </Text>
        <Card themeColor="success" isFooterBlurred>
          <CardBody>
            <CardTitle>Footer Blur</CardTitle>
            <CardDescription>
              Footer gets a translucent surface and top border.
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button size="sm" themeColor="success" variant="flat">
              Continue
            </Button>
          </CardFooter>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Disabled + Custom Appearance
        </Text>
        <Card
          themeColor="warning"
          isDisabled
          customAppearance={{
            container: {
              borderWidth: 2,
            },
            title: {
              fontWeight: '700',
            },
          }}
        >
          <CardHeader>
            <CardTitle>Disabled Card</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              Custom border and title weight with disabled state.
            </CardDescription>
          </CardBody>
        </Card>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
})
