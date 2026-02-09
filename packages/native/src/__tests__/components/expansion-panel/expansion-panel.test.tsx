import { describe, it, expect } from 'vitest'
import type {
  ExpansionPanelProps,
  ExpansionPanelItemProps,
} from '../../../components/expansion-panel'

describe('ExpansionPanel Types', () => {
  it('accepts ExpansionPanel props', () => {
    const props: ExpansionPanelProps = {
      children: null,
      variant: 'light',
      selectionMode: 'toggle',
      showDivider: false,
      hideIndicator: false,
      fullWidth: true,
    }
    expect(props.variant).toBe('light')
    expect(props.selectionMode).toBe('toggle')
  })

  it('accepts all variants', () => {
    const variants: Array<ExpansionPanelProps['variant']> = [
      'light',
      'bordered',
      'splitted',
    ]
    variants.forEach(variant => {
      const props: ExpansionPanelProps = {
        children: null,
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all selection modes', () => {
    const modes: Array<ExpansionPanelProps['selectionMode']> = [
      'toggle',
      'multiple',
    ]
    modes.forEach(selectionMode => {
      const props: ExpansionPanelProps = {
        children: null,
        selectionMode,
      }
      expect(props.selectionMode).toBe(selectionMode)
    })
  })

  it('accepts expandedKeys array', () => {
    const props: ExpansionPanelProps = {
      children: null,
      expandedKeys: ['item1', 'item2'],
    }
    expect(props.expandedKeys).toEqual(['item1', 'item2'])
  })

  it('accepts defaultExpandedKeys array', () => {
    const props: ExpansionPanelProps = {
      children: null,
      defaultExpandedKeys: ['item1'],
    }
    expect(props.defaultExpandedKeys).toEqual(['item1'])
  })

  it('accepts disabledKeys array', () => {
    const props: ExpansionPanelProps = {
      children: null,
      disabledKeys: ['item2', 'item3'],
    }
    expect(props.disabledKeys).toEqual(['item2', 'item3'])
  })

  it('accepts onSelectionChange callback', () => {
    const mockCallback = (keys: string[]) => {
      expect(keys).toBeDefined()
    }
    const props: ExpansionPanelProps = {
      children: null,
      onSelectionChange: mockCallback,
    }
    expect(props.onSelectionChange).toBe(mockCallback)
  })

  it('accepts customAppearance with style props', () => {
    const props: ExpansionPanelProps = {
      children: null,
      customAppearance: {
        container: { backgroundColor: 'red' },
        item: { padding: 10 },
      },
    }
    expect(props.customAppearance?.container).toEqual({ backgroundColor: 'red' })
    expect(props.customAppearance?.item).toEqual({ padding: 10 })
  })

  it('accepts boolean flags', () => {
    const props: ExpansionPanelProps = {
      children: null,
      showDivider: true,
      hideIndicator: true,
      fullWidth: false,
      disableAnimation: true,
      isCompact: true,
    }
    expect(props.showDivider).toBe(true)
    expect(props.hideIndicator).toBe(true)
    expect(props.fullWidth).toBe(false)
    expect(props.disableAnimation).toBe(true)
    expect(props.isCompact).toBe(true)
  })
})

describe('ExpansionPanelItem Types', () => {
  it('accepts ExpansionPanelItem props', () => {
    const props: ExpansionPanelItemProps = {
      children: null,
      title: 'Test Title',
      subtitle: 'Test Subtitle',
    }
    expect(props.title).toBe('Test Title')
    expect(props.subtitle).toBe('Test Subtitle')
  })

  it('accepts ReactNode for title and subtitle', () => {
    const props: ExpansionPanelItemProps = {
      children: null,
      title: 'String title',
      subtitle: 'String subtitle',
    }
    expect(props.title).toBeDefined()
    expect(props.subtitle).toBeDefined()
  })

  it('accepts startContent and indicator', () => {
    const props: ExpansionPanelItemProps = {
      children: null,
      title: 'Title',
      startContent: 'Start',
      indicator: 'Indicator',
    }
    expect(props.startContent).toBe('Start')
    expect(props.indicator).toBe('Indicator')
  })

  it('accepts onSelected callback', () => {
    const mockCallback = (isSelected: boolean) => {
      expect(typeof isSelected).toBe('boolean')
    }
    const props: ExpansionPanelItemProps = {
      children: null,
      title: 'Title',
      onSelected: mockCallback,
    }
    expect(props.onSelected).toBe(mockCallback)
  })

  it('accepts customAppearance with all style props', () => {
    const props: ExpansionPanelItemProps = {
      children: null,
      title: 'Title',
      customAppearance: {
        base: { backgroundColor: 'red' },
        heading: { padding: 10 },
        trigger: { margin: 5 },
        title: { fontSize: 16 },
        subtitle: { fontSize: 12 },
        content: { padding: 15 },
        startContent: { marginRight: 10 },
        indicator: { opacity: 0.8 },
      },
    }
    expect(props.customAppearance?.base).toEqual({ backgroundColor: 'red' })
    expect(props.customAppearance?.heading).toEqual({ padding: 10 })
    expect(props.customAppearance?.trigger).toEqual({ margin: 5 })
    expect(props.customAppearance?.title).toEqual({ fontSize: 16 })
    expect(props.customAppearance?.subtitle).toEqual({ fontSize: 12 })
    expect(props.customAppearance?.content).toEqual({ padding: 15 })
    expect(props.customAppearance?.startContent).toEqual({ marginRight: 10 })
    expect(props.customAppearance?.indicator).toEqual({ opacity: 0.8 })
  })
})
