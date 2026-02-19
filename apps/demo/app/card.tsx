import { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
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

const IMG_MOUNTAIN = 'https://picsum.photos/id/1043/800/400'
const IMG_FOREST = 'https://picsum.photos/id/1018/800/440'
const IMG_NATURE = 'https://picsum.photos/id/15/400/300'
const IMG_BANNER = 'https://picsum.photos/id/225/800/300'
const IMG_AVATAR = 'https://picsum.photos/id/91/100/100'

export default function CardScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [pressCount, setPressCount] = useState(0)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Cover Image
        </Text>
        <Card padding={0} elevation={2}>
          <Image
            source={{ uri: IMG_MOUNTAIN }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <CardBody>
            <CardTitle>Mountain Trail</CardTitle>
            <CardDescription>
              Explore the breathtaking alpine landscape of Patagonia's hidden trails.
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button size="sm" themeColor="primary" variant="solid">
              Explore
            </Button>
            <Button size="sm" variant="outlined">
              Save
            </Button>
          </CardFooter>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Image with Footer Overlay
        </Text>
        <Card padding={0} isPressable themeColor="primary">
          <View>
            <Image
              source={{ uri: IMG_FOREST }}
              style={styles.overlayImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.overlayTitle}>Misty Forest</Text>
              <Text style={styles.overlaySubtitle}>Black Forest, Germany</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Horizontal Card
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {[
            {
              title: 'Forest Hike',
              desc: '3.2 km · Easy · 1h 20min',
              color: 'success',
            },
            {
              title: 'Mountain Peak',
              desc: '8.5 km · Hard · 4h 10min',
              color: 'danger',
            },
          ].map((item, i) => (
            <Card
              key={item.title}
              padding={0}
              elevation={1}
              isPressable
              themeColor={item.color as 'success' | 'danger'}
            >
              <View style={styles.row}>
                <Image
                  source={{ uri: i === 0 ? IMG_NATURE : IMG_MOUNTAIN }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
                <View style={styles.rowContent}>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Profile Card
        </Text>
        <Card padding={0} elevation={2}>
          <Image
            source={{ uri: IMG_BANNER }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.profileContent}>
            <View style={[styles.avatarWrapper, { borderColor: colors.background }]}>
              <Image
                source={{ uri: IMG_AVATAR }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <CardTitle>Alex Moreau</CardTitle>
            <CardDescription>UI Designer · Paris, France</CardDescription>
          </View>
          <CardFooter>
            <Button size="sm" themeColor="primary" variant="solid">
              Follow
            </Button>
            <Button size="sm" variant="outlined">
              Message
            </Button>
          </CardFooter>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Basic</Text>
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>Card Header</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              Simple card with header, body and footer sections.
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
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {(
            [
              'primary',
              'secondary',
              'tertiary',
              'success',
              'warning',
              'danger',
            ] as const
          ).map(color => (
            <Card key={color} themeColor={color}>
              <CardBody>
                <CardTitle>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </CardTitle>
                <CardDescription>Card with {color} theme color.</CardDescription>
              </CardBody>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {(['none', 'sm', 'md', 'lg', 'full'] as const).map(r => (
            <Card key={r} themeColor="primary" radius={r}>
              <CardBody>
                <CardTitle>radius="{r}"</CardTitle>
              </CardBody>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Elevation
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {([0, 1, 2, 3, 4] as const).map(level => (
            <Card key={level} elevation={level}>
              <CardBody>
                <CardTitle>elevation={level}</CardTitle>
              </CardBody>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Pressable ({pressCount} presses)
        </Text>
        <Card
          themeColor="primary"
          isPressable
          isHoverable
          onPress={() => setPressCount(n => n + 1)}
        >
          <CardHeader>
            <CardTitle>Tap me</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              isPressable + isHoverable — tap to count presses.
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="outlined">
              Action
            </Button>
          </CardFooter>
        </Card>
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
          Full Width
        </Text>
        <Card themeColor="secondary" fullWidth>
          <CardBody>
            <CardTitle>Full Width Card</CardTitle>
            <CardDescription>
              This card stretches to fill its container.
            </CardDescription>
          </CardBody>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Disabled
        </Text>
        <Card themeColor="danger" isDisabled>
          <CardHeader>
            <CardTitle>Disabled Card</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              Interactions are disabled on this card.
            </CardDescription>
          </CardBody>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Appearance
        </Text>
        <Card
          themeColor="warning"
          customAppearance={{
            container: { borderWidth: 2 },
            title: { fontWeight: '700', fontSize: 18 },
            description: { fontStyle: 'italic' },
          }}
        >
          <CardHeader>
            <CardTitle>Custom Styled</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>
              Custom border, title weight and italic description.
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
  coverImage: {
    width: '100%',
    height: 180,
  },
  overlayImage: {
    width: '100%',
    height: 220,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  overlayTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  overlaySubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 110,
    height: 110,
  },
  rowContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  profileContent: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
    gap: 4,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -36,
    left: 16,
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 72,
    height: 72,
  },
})
