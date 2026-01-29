import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Accordion, AccordionItem } from '@xaui/native/accordion'
import { useState, useEffect } from 'react'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 0.06)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          gap: theme.spacing.md,
        },
      ]}
    >
      <Accordion
        isCompact
        variant="splitted"
        selectionMode="multiple"
        defaultSelectedKeys={['section-1']}
      >
        <AccordionItem key="section-1" title="Section 1" subtitle="This is section 1">
          <Text style={{ color: colors.primary.main }}>Content for section 1</Text>
        </AccordionItem>
        <AccordionItem key="section-2" title="Section 2" subtitle="This is section 2">
          <Text style={{ color: colors.primary.main }}>Content for section 2</Text>
        </AccordionItem>
      </Accordion>

      <Accordion variant="bordered" selectionMode="multiple">
        <AccordionItem key="section-1" title="Section 1" subtitle="This is section 1">
          <Text style={{ color: colors.primary.main }}>
            Content for section Content for section 1 Content for section 1 Content for
            section 1 Content for section 1 Content for section 1
          </Text>
        </AccordionItem>
        <AccordionItem key="section-2" title="Section 2" subtitle="This is section 2">
          <Text style={{ color: colors.primary.main }}>
            Content for section 1 Content for section 1 Content for section 1
          </Text>
        </AccordionItem>
      </Accordion>

      <Accordion variant="light" selectionMode="multiple">
        <AccordionItem key="section-1" title="Section 1" subtitle="This is section 1">
          <Text style={{ color: colors.primary.main }}>Content for section 1</Text>
        </AccordionItem>
        <AccordionItem key="section-2" title="Section 2" subtitle="This is section 2">
          <Text style={{ color: colors.primary.main }}>Content for section 2</Text>
        </AccordionItem>
      </Accordion>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
})
