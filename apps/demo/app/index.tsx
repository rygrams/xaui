import { useXUIColors } from '@xaui/native/core'
import { ScrollView } from 'react-native'
import { Accordion, AccordionItem } from '@xaui/native/accordion'
import { Typography } from '@xaui/native/typography'

export default function HomeScreen() {
  const colors = useXUIColors()

  return (
    <ScrollView
      style={{
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
      }}
    >
      <Accordion variant="splitted" showDivider>
        <AccordionItem title="Section 1" subtitle="Content 1">
          <Typography>Content 1</Typography>
        </AccordionItem>
        <AccordionItem title="Section 2" subtitle="Content 2">
          <Typography>Content 2</Typography>
        </AccordionItem>
        <AccordionItem title="Section 3" subtitle="Content 3">
          <Typography>Content 3</Typography>
        </AccordionItem>
        <AccordionItem title="Section 4" subtitle="Content 4">
          <Typography>Content 4</Typography>
        </AccordionItem>
        <AccordionItem title="Section 5" subtitle="Content 5">
          <Typography>Content 5</Typography>
        </AccordionItem>
        <AccordionItem title="Section 6" subtitle="Content 6">
          <Typography>Content 6</Typography>
        </AccordionItem>
        <AccordionItem title="Section 7" subtitle="Content 7">
          <Typography>Content 7</Typography>
        </AccordionItem>
        <AccordionItem title="Section 8" subtitle="Content 8">
          <Typography>Content 8</Typography>
        </AccordionItem>
        <AccordionItem title="Section 9" subtitle="Content 9">
          <Typography>Content 9</Typography>
        </AccordionItem>
        <AccordionItem title="Section 10" subtitle="Content 10">
          <Typography>Content 10</Typography>
        </AccordionItem>
      </Accordion>
    </ScrollView>
  )
}
