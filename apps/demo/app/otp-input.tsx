import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { OTPInput } from '@xaui/native/input'

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

export default function OTPInputScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [basic, setBasic] = useState('')
  const [six, setSix] = useState('')
  const [secured, setSecured] = useState('')
  const [alpha, setAlpha] = useState('')
  const [validOtp, setValidOtp] = useState('')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Default (4-digit)
        </Text>
        <OTPInput
          label="Verification Code"
          value={basic}
          onValueChange={setBasic}
          description="Enter the 4-digit code"
          variant="bordered"
          themeColor="primary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          6-digit
        </Text>
        <OTPInput
          length={6}
          label="6-Digit Code"
          value={six}
          onValueChange={setSix}
          description="Enter the 6-digit code"
          variant="bordered"
          themeColor="secondary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Per Variant
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {variants.map(variant => (
            <OTPInput
              key={variant}
              label={variant}
              variant={variant}
              themeColor="primary"
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
            <OTPInput
              key={size}
              label={`Size ${size.toUpperCase()}`}
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
            <OTPInput
              key={themeColor}
              label={themeColor}
              themeColor={themeColor}
              variant="faded"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Secured Mode
        </Text>
        <OTPInput
          label="PIN"
          isSecured
          value={secured}
          onValueChange={setSecured}
          description="Characters are hidden"
          variant="bordered"
          themeColor="tertiary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Alphanumeric
        </Text>
        <OTPInput
          label="Alphanumeric Code"
          allowedKeys={/^[a-zA-Z0-9]$/}
          value={alpha}
          onValueChange={setAlpha}
          description="Accepts letters and numbers"
          variant="bordered"
          themeColor="success"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Validation
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <OTPInput
            label="Required Code"
            value={validOtp}
            onValueChange={setValidOtp}
            isInvalid={validOtp.length > 0 && validOtp.length < 4}
            errorMessage="Please enter all 4 digits"
            variant="bordered"
            themeColor="danger"
          />
          <OTPInput label="Disabled" defaultValue="12" isDisabled variant="flat" />
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
