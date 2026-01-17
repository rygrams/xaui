import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'
import { colors } from '@xaui/colors'
import { Switch } from '@xaui/switches'

export default function ExploreScreen() {
  const [switchStates, setSwitchStates] = useState({
    insideVariant: false,
    overlapVariant: false,
    primary: true,
    secondary: false,
    success: false,
    warning: false,
    danger: false,
    small: false,
    medium: true,
    large: false,
    selected: true,
    unselected: false,
    alignRight: false,
    alignLeft: false,
    justifyLeft: true,
    justifyRight: false,
  })

  const handleSwitchChange = (key: string) => (value: boolean) => {
    setSwitchStates(prev => ({ ...prev, [key]: value }))
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Switch Components</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Variants</Text>
        <Switch
          size="sm"
          variant="inside"
          label="Inside Switch"
          themeColor="primary"
          isSelected={switchStates.insideVariant}
          onValueChange={handleSwitchChange('insideVariant')}
        />
        <Switch
          variant="overlap"
          size="sm"
          label="Overlap Switch"
          themeColor="primary"
          isSelected={switchStates.overlapVariant}
          onValueChange={handleSwitchChange('overlapVariant')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Colors - Inside Variant</Text>
        <Switch
          variant="inside"
          label="Primary"
          themeColor="primary"
          isSelected={switchStates.primary}
          onValueChange={handleSwitchChange('primary')}
        />
        <Switch
          variant="inside"
          label="Secondary"
          themeColor="secondary"
          isSelected={switchStates.secondary}
          onValueChange={handleSwitchChange('secondary')}
        />
        <Switch
          variant="inside"
          label="Success"
          themeColor="success"
          isSelected={switchStates.success}
          onValueChange={handleSwitchChange('success')}
        />
        <Switch
          variant="inside"
          label="Warning"
          themeColor="warning"
          isSelected={switchStates.warning}
          onValueChange={handleSwitchChange('warning')}
        />
        <Switch
          variant="inside"
          label="Danger"
          themeColor="danger"
          isSelected={switchStates.danger}
          onValueChange={handleSwitchChange('danger')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sizes - Inside Variant</Text>
        <Switch
          variant="inside"
          label="Small"
          themeColor="primary"
          size="sm"
          isSelected={switchStates.small}
          onValueChange={handleSwitchChange('small')}
        />
        <Switch
          variant="inside"
          label="Medium"
          themeColor="primary"
          size="md"
          isSelected={switchStates.medium}
          onValueChange={handleSwitchChange('medium')}
        />
        <Switch
          variant="inside"
          label="Large"
          themeColor="primary"
          size="lg"
          isSelected={switchStates.large}
          onValueChange={handleSwitchChange('large')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sizes - Overlap Variant</Text>
        <Switch
          variant="overlap"
          label="Small"
          themeColor="primary"
          size="sm"
          isSelected={switchStates.small}
          onValueChange={handleSwitchChange('small')}
        />
        <Switch
          variant="overlap"
          label="Medium"
          themeColor="primary"
          size="md"
          isSelected={switchStates.medium}
          onValueChange={handleSwitchChange('medium')}
        />
        <Switch
          variant="overlap"
          label="Large"
          themeColor="primary"
          size="lg"
          isSelected={switchStates.large}
          onValueChange={handleSwitchChange('large')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>States</Text>
        <Switch
          variant="inside"
          label="Selected"
          themeColor="primary"
          isSelected={switchStates.selected}
          onValueChange={handleSwitchChange('selected')}
        />
        <Switch
          variant="inside"
          label="Unselected"
          themeColor="primary"
          isSelected={switchStates.unselected}
          onValueChange={handleSwitchChange('unselected')}
        />
        <Switch
          variant="inside"
          label="Disabled"
          themeColor="primary"
          isDisabled
          isSelected={false}
        />
        <Switch
          variant="inside"
          label="Disabled & Selected"
          themeColor="primary"
          isDisabled
          isSelected
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Label Alignment</Text>
        <Switch
          variant="inside"
          label="Label on Right (default)"
          labelAlignment="right"
          themeColor="primary"
          isSelected={switchStates.alignRight}
          onValueChange={handleSwitchChange('alignRight')}
        />
        <Switch
          variant="inside"
          label="Label on Left"
          labelAlignment="left"
          themeColor="primary"
          isSelected={switchStates.alignLeft}
          onValueChange={handleSwitchChange('alignLeft')}
        />
        <Switch
          variant="inside"
          label="Enable notifications"
          labelAlignment="justify-left"
          fullWidth
          themeColor="primary"
          isSelected={switchStates.justifyLeft}
          onValueChange={handleSwitchChange('justifyLeft')}
        />
        <Switch
          variant="inside"
          label="Dark mode"
          labelAlignment="justify-right"
          fullWidth
          themeColor="primary"
          isSelected={switchStates.justifyRight}
          onValueChange={handleSwitchChange('justifyRight')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Overlap Variant Colors</Text>
        <Switch
          variant="overlap"
          label="Primary"
          themeColor="primary"
          isSelected={switchStates.primary}
          onValueChange={handleSwitchChange('primary')}
        />
        <Switch
          variant="overlap"
          label="Secondary"
          themeColor="secondary"
          isSelected={switchStates.secondary}
          onValueChange={handleSwitchChange('secondary')}
        />
        <Switch
          variant="overlap"
          label="Success"
          themeColor="success"
          isSelected={switchStates.success}
          onValueChange={handleSwitchChange('success')}
        />
        <Switch
          variant="overlap"
          label="Warning"
          themeColor="warning"
          isSelected={switchStates.warning}
          onValueChange={handleSwitchChange('warning')}
        />
        <Switch
          variant="overlap"
          label="Danger"
          themeColor="danger"
          isSelected={switchStates.danger}
          onValueChange={handleSwitchChange('danger')}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate[950],
  },
  container: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
})
