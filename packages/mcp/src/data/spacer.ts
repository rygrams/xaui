export const spacerDocs = {
  name: 'Spacer',
  description:
    "Invisible flexible spacer that absorbs remaining space inside a Row or Column — identical to Flutter's Spacer widget. A shorthand for Expanded with no visible child.",
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Spacer } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Spacer } from '@xaui/hybrid/spacer'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'flex',
      type: 'number',
      default: '1',
      description: 'Flex factor — how much remaining space to absorb',
    },
    {
      name: 'style',
      type: 'StyleProp<ViewStyle> / CSSProperties',
      default: '-',
      description: 'Style override',
    },
  ],
  examples: [
    {
      title: 'Push items to opposite ends',
      code: `import { Row, Spacer } from '@xaui/native/view'

<Row>
  <Typography>Left</Typography>
  <Spacer />
  <Typography>Right</Typography>
</Row>`,
    },
    {
      title: 'Weighted spacing',
      code: `import { Row, Spacer } from '@xaui/native/view'

<Row>
  <Typography>Start</Typography>
  <Spacer flex={2} />
  <Typography>Middle</Typography>
  <Spacer flex={1} />
  <Typography>End</Typography>
</Row>`,
    },
  ],
}
