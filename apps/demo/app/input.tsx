import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { TextInput } from '@xaui/native/input'

const variants = ['flat', 'faded', 'bordered', 'underlined'] as const
const sizes = ['sm', 'md', 'lg'] as const
const themeColors = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
] as const

export default function InputScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('HeroUI patterns')
  const [notes, setNotes] = useState('')
  const [customValue, setCustomValue] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Per Variant
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {variants.map(variant => (
            <TextInput
              key={variant}
              label={variant}
              placeholder={`${variant} input`}
              variant={variant}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Per Size
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {sizes.map(size => (
            <TextInput
              key={size}
              label={`Size ${size.toUpperCase()}`}
              placeholder={`Input size ${size}`}
              size={size}
              variant="bordered"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Per Color
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {themeColors.map(themeColor => (
            <TextInput
              key={themeColor}
              label={themeColor}
              labelPlacement="inside"
              placeholder={`${themeColor} themed input`}
              themeColor={themeColor}
              variant="faded"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onValueChange={setEmail}
            description="We'll only use this for account notifications."
            themeColor="secondary"
          />
          <TextInput
            label="Search"
            value={search}
            onValueChange={setSearch}
            isClearable
            description="Try clearing this field with the clear button."
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Secured
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onValueChange={setPassword}
            isSecured
            description="isSecured sets secureTextEntry on the native input."
            themeColor="tertiary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Validation
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <TextInput
            label="Required username"
            placeholder="Min 3 characters"
            isInvalid={notes.length > 0 && notes.length < 3}
            errorMessage="Username should be at least 3 characters"
            value={notes}
            onValueChange={setNotes}
            variant="bordered"
            themeColor="danger"
          />
          <TextInput
            label="Disabled"
            defaultValue="Cannot edit this field"
            isDisabled
            variant="flat"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Implementation
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <TextInput
            label="Branded Search"
            placeholder="Type to search"
            value={customValue}
            onValueChange={setCustomValue}
            variant="faded"
            radius="full"
            isClearable
            startContent={
              <Text
                style={{
                  color: colors.foreground,
                  fontWeight: '700',
                  fontSize: 12,
                }}
              >
                SRCH
              </Text>
            }
            endContent={
              <Text
                style={{
                  color: colors.foreground,
                  opacity: 0.6,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                CMD+K
              </Text>
            }
            customAppearance={{
              container: {
                backgroundColor: 'transparent',
              },
              inputWrapper: {
                borderWidth: 1,
                borderColor: colors.foreground,
                backgroundColor: colors.background,
              },
              label: {
                fontWeight: '700',
                letterSpacing: 0.4,
              },
              helperText: {
                fontStyle: 'italic',
              },
            }}
            description="Custom slots + customAppearance styles."
          />
          <TextInput
            label="Inside Label"
            labelPlacement="inside"
            placeholder="Label is rendered inside"
            size="sm"
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
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
