import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { MenuBox, MenuBoxItem } from '@xaui/native/menubox'
import { Margin } from '@xaui/native/view'
import {
  PersonCircleIcon,
  ColorPaletteIcon,
  SettingsIcon,
  NotificationsIcon,
  MicIcon,
  ServerIcon,
  LockClosedIcon,
  InformationCircleIcon,
  WifiIcon,
  BluetoothIcon,
  CheckmarkIcon,
  ChevronDownIcon,
  ChevronForwardIcon,
  LogOutIcon,
  SunnyIcon,
  MoonIcon,
} from '@xaui/icons'

export default function MenuBoxScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const cardBackground =
    theme.mode === 'dark' ? theme.colors.default.background : '#f5f5f5'

  const iconContainerStyle = (bgColor: string) => ({
    width: 32,
    height: 32,
    backgroundColor: bgColor,
    borderRadius: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  })

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            MenuBox Basique
          </Text>
          <MenuBox spacing={theme.spacing.xs} backgroundColor={cardBackground}>
            <MenuBoxItem
              itemKey="1"
              title="Vérification de l'âge"
              startContent={
                <View style={iconContainerStyle(colors.primary.main + '20')}>
                  <PersonCircleIcon size={20} color={colors.primary.main} />
                </View>
              }
            />
          </MenuBox>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            MenuBox avec Description
          </Text>
          <MenuBox spacing={theme.spacing.xs} backgroundColor={cardBackground}>
            <MenuBoxItem
              itemKey="1"
              title="Apparence"
              description="Système (par défaut)"
              startContent={
                <View style={iconContainerStyle(colors.warning.main + '20')}>
                  <SunnyIcon size={20} color={colors.warning.main} />
                </View>
              }
              endContent={
                <ChevronDownIcon size={20} color={colors.foreground + '60'} />
              }
            />
            <MenuBoxItem
              itemKey="2"
              title="Couleur d'accentuation"
              description="Par défaut"
              startContent={
                <View style={iconContainerStyle(colors.secondary.main + '20')}>
                  <ColorPaletteIcon size={20} color={colors.secondary.main} />
                </View>
              }
              endContent={
                <ChevronDownIcon size={20} color={colors.foreground + '60'} />
              }
            />
          </MenuBox>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            MenuBox Multiple Items
          </Text>
          <MenuBox backgroundColor={cardBackground} spacing={3}>
            <MenuBoxItem
              itemKey="1"
              title="Général"
              startContent={
                <View style={iconContainerStyle(colors.primary.main + '20')}>
                  <SettingsIcon size={20} color={colors.primary.main} />
                </View>
              }
              endContent={
                <ChevronForwardIcon size={20} color={colors.foreground + '40'} />
              }
            />
            <MenuBoxItem
              itemKey="2"
              title="Notifications"
              startContent={
                <View style={iconContainerStyle(colors.warning.main + '20')}>
                  <NotificationsIcon size={20} color={colors.warning.main} />
                </View>
              }
              endContent={
                <ChevronForwardIcon size={20} color={colors.foreground + '40'} />
              }
            />
            <MenuBoxItem
              itemKey="3"
              title="Voix"
              startContent={
                <View style={iconContainerStyle(colors.success.main + '20')}>
                  <MicIcon size={20} color={colors.success.main} />
                </View>
              }
              endContent={
                <ChevronForwardIcon size={20} color={colors.foreground + '40'} />
              }
            />
            <MenuBoxItem
              itemKey="4"
              title="Gestion des données"
              startContent={
                <View style={iconContainerStyle(colors.tertiary.main + '20')}>
                  <ServerIcon size={20} color={colors.tertiary.main} />
                </View>
              }
              endContent={
                <ChevronForwardIcon size={20} color={colors.foreground + '40'} />
              }
            />
            <MenuBoxItem
              itemKey="5"
              title="Sécurité"
              startContent={
                <View style={iconContainerStyle(colors.danger.main + '20')}>
                  <LockClosedIcon size={20} color={colors.danger.main} />
                </View>
              }
              endContent={
                <ChevronForwardIcon size={20} color={colors.foreground + '40'} />
              }
            />
            <MenuBoxItem
              itemKey="6"
              title="À propos de"
              startContent={
                <View style={iconContainerStyle(colors.secondary.main + '20')}>
                  <InformationCircleIcon size={20} color={colors.secondary.main} />
                </View>
              }
              endContent={
                <ChevronForwardIcon size={20} color={colors.foreground + '40'} />
              }
            />
          </MenuBox>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            MenuBox avec End Content
          </Text>
          <MenuBox backgroundColor={cardBackground}>
            <MenuBoxItem
              itemKey="1"
              title="Wi-Fi"
              description="Connecté à Home Network"
              startContent={
                <View style={iconContainerStyle(colors.primary.main + '20')}>
                  <WifiIcon size={20} color={colors.primary.main} />
                </View>
              }
              endContent={<CheckmarkIcon size={20} color={colors.success.main} />}
            />
            <MenuBoxItem
              itemKey="2"
              title="Bluetooth"
              description="On - 3 devices connected"
              startContent={
                <View style={iconContainerStyle(colors.secondary.main + '20')}>
                  <BluetoothIcon size={20} color={colors.secondary.main} />
                </View>
              }
              endContent={<CheckmarkIcon size={20} color={colors.success.main} />}
            />
          </MenuBox>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            MenuBox avec Spacing
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
            Spacing Small
          </Text>
          <MenuBox spacing={2} backgroundColor={cardBackground}>
            <MenuBoxItem
              itemKey="1"
              title="Item 1"
              startContent={
                <View style={iconContainerStyle(colors.primary.main + '20')}>
                  <SettingsIcon size={20} color={colors.primary.main} />
                </View>
              }
            />
            <MenuBoxItem
              itemKey="2"
              title="Item 2"
              startContent={
                <View style={iconContainerStyle(colors.secondary.main + '20')}>
                  <NotificationsIcon size={20} color={colors.secondary.main} />
                </View>
              }
            />
            <MenuBoxItem
              itemKey="3"
              title="Item 3"
              startContent={
                <View style={iconContainerStyle(colors.success.main + '20')}>
                  <CheckmarkIcon size={20} color={colors.success.main} />
                </View>
              }
            />
          </MenuBox>

          <Margin top={theme.spacing.md}>
            <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
              Spacing Medium
            </Text>
            <MenuBox spacing={theme.spacing.md} backgroundColor={cardBackground}>
              <MenuBoxItem
                itemKey="1"
                title="Item 1"
                startContent={
                  <View style={iconContainerStyle(colors.primary.main + '20')}>
                    <SettingsIcon size={20} color={colors.primary.main} />
                  </View>
                }
              />
              <MenuBoxItem
                itemKey="2"
                title="Item 2"
                startContent={
                  <View style={iconContainerStyle(colors.secondary.main + '20')}>
                    <NotificationsIcon size={20} color={colors.secondary.main} />
                  </View>
                }
              />
            </MenuBox>
          </Margin>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            MenuBox Item Disabled
          </Text>
          <MenuBox backgroundColor={cardBackground}>
            <MenuBoxItem
              itemKey="1"
              title="Active Item"
              startContent={
                <View style={iconContainerStyle(colors.success.main + '20')}>
                  <CheckmarkIcon size={20} color={colors.success.main} />
                </View>
              }
            />
            <MenuBoxItem
              itemKey="2"
              title="Disabled Item"
              isDisabled
              startContent={
                <View style={iconContainerStyle(colors.default.main + '20')}>
                  <MoonIcon size={20} color={colors.default.main} />
                </View>
              }
            />
          </MenuBox>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Différentes Tailles
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
            Small
          </Text>
          <MenuBox size="sm" backgroundColor={cardBackground}>
            <MenuBoxItem
              itemKey="1"
              title="Petit Item 1"
              startContent={
                <View style={iconContainerStyle(colors.primary.main + '20')}>
                  <SettingsIcon size={18} color={colors.primary.main} />
                </View>
              }
            />
            <MenuBoxItem
              itemKey="2"
              title="Petit Item 2"
              startContent={
                <View style={iconContainerStyle(colors.secondary.main + '20')}>
                  <NotificationsIcon size={18} color={colors.secondary.main} />
                </View>
              }
            />
          </MenuBox>

          <Margin top={theme.spacing.md}>
            <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
              Large
            </Text>
            <MenuBox size="lg" backgroundColor={cardBackground}>
              <MenuBoxItem
                itemKey="1"
                title="Grand Item 1"
                startContent={
                  <View style={iconContainerStyle(colors.primary.main + '20')}>
                    <SettingsIcon size={24} color={colors.primary.main} />
                  </View>
                }
              />
              <MenuBoxItem
                itemKey="2"
                title="Grand Item 2"
                startContent={
                  <View style={iconContainerStyle(colors.secondary.main + '20')}>
                    <NotificationsIcon size={24} color={colors.secondary.main} />
                  </View>
                }
              />
            </MenuBox>
          </Margin>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Différents Rayons
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
            Radius Small
          </Text>
          <MenuBox radius="sm" backgroundColor={cardBackground}>
            <MenuBoxItem itemKey="1" title="Item 1" />
            <MenuBoxItem itemKey="2" title="Item 2" />
          </MenuBox>

          <Margin top={theme.spacing.md}>
            <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
              Radius Full
            </Text>
            <MenuBox radius="full" backgroundColor={cardBackground}>
              <MenuBoxItem itemKey="1" title="Item 1" />
              <MenuBoxItem itemKey="2" title="Item 2" />
            </MenuBox>
          </Margin>
        </View>
      </Margin>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          MenuBox Danger
        </Text>
        <MenuBox backgroundColor={cardBackground}>
          <MenuBoxItem
            itemKey="1"
            title="Se déconnecter"
            startContent={
              <View style={iconContainerStyle(colors.danger.main + '20')}>
                <LogOutIcon size={20} color={colors.danger.main} />
              </View>
            }
            customAppearance={{
              title: { color: colors.danger.main },
            }}
          />
        </MenuBox>
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
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
})
