import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { TextArea } from '@xaui/native/input'

const variants = ['flat', 'faded', 'bordered', 'underlined'] as const
const themeColors = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
] as const

export default function TextAreaScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [bio, setBio] = useState('')
  const [feedback, setFeedback] = useState('I like this API because...')
  const [validationValue, setValidationValue] = useState('')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Per Variant</Text>
        <View style={{ gap: theme.spacing.md }}>
          {variants.map(variant => (
            <TextArea
              key={variant}
              label={variant}
              placeholder={`Write in ${variant} style`}
              variant={variant}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Per Color</Text>
        <View style={{ gap: theme.spacing.md }}>
          {themeColors.map(themeColor => (
            <TextArea
              key={themeColor}
              label={themeColor}
              placeholder={`Textarea with ${themeColor} color`}
              variant="faded"
              themeColor={themeColor}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Controlled</Text>
        <View style={{ gap: theme.spacing.md }}>
          <TextArea
            label="Bio"
            placeholder="Tell us about you"
            value={bio}
            onValueChange={setBio}
            minRows={4}
            maxRows={8}
            isClearable
            themeColor="secondary"
            description="Auto-scroll is enabled when maxRows is reached."
          />
          <TextArea
            label="Feedback"
            value={feedback}
            onValueChange={setFeedback}
            minRows={5}
            variant="bordered"
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Validation</Text>
        <View style={{ gap: theme.spacing.md }}>
          <TextArea
            label="Required comment"
            placeholder="At least 20 characters"
            value={validationValue}
            onValueChange={setValidationValue}
            minRows={3}
            isInvalid={validationValue.length > 0 && validationValue.length < 20}
            errorMessage="Comment should be at least 20 characters"
            themeColor="danger"
            variant="bordered"
          />
          <TextArea
            label="Disabled"
            defaultValue="This field cannot be edited"
            isDisabled
            minRows={4}
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
