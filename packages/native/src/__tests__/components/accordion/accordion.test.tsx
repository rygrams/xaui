import { describe, it, expect } from 'vitest'
import type { AccordionProps, AccordionItemProps } from '../../../components/accordion'

describe('Accordion Types', () => {
  it('accepts Accordion props', () => {
    const props: AccordionProps = {
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
    const variants: Array<AccordionProps['variant']> = ['light', 'bordered', 'splitted']
    variants.forEach(variant => {
      const props: AccordionProps = {
        children: null,
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all selection modes', () => {
    const modes: Array<AccordionProps['selectionMode']> = ['toggle', 'multiple']
    modes.forEach(selectionMode => {
      const props: AccordionProps = {
        children: null,
        selectionMode,
      }
      expect(props.selectionMode).toBe(selectionMode)
    })
  })

  it('accepts expandedKeys array', () => {
    const props: AccordionProps = {
      children: null,
      expandedKeys: ['item1', 'item2'],
    }
    expect(props.expandedKeys).toEqual(['item1', 'item2'])
  })

  it('accepts defaultExpandedKeys array', () => {
    const props: AccordionProps = {
      children: null,
      defaultExpandedKeys: ['item1'],
    }
    expect(props.defaultExpandedKeys).toEqual(['item1'])
  })

  it('accepts disabledKeys array', () => {
    const props: AccordionProps = {
      children: null,
      disabledKeys: ['item2', 'item3'],
    }
    expect(props.disabledKeys).toEqual(['item2', 'item3'])
  })

  it('accepts onSelectionChange callback', () => {
    const mockCallback = (keys: string[]) => {
      expect(keys).toBeDefined()
    }
    const props: AccordionProps = {
      children: null,
      onSelectionChange: mockCallback,
    }
    expect(props.onSelectionChange).toBe(mockCallback)
  })

  it('accepts custom styles', () => {
    const props: AccordionProps = {
      children: null,
      containerStyle: { backgroundColor: 'red' },
      itemStyle: { padding: 10 },
    }
    expect(props.containerStyle).toEqual({ backgroundColor: 'red' })
    expect(props.itemStyle).toEqual({ padding: 10 })
  })

  it('accepts boolean flags', () => {
    const props: AccordionProps = {
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

describe('AccordionItem Types', () => {
  it('accepts AccordionItem props', () => {
    const props: AccordionItemProps = {
      children: null,
      title: 'Test Title',
      subtitle: 'Test Subtitle',
    }
    expect(props.title).toBe('Test Title')
    expect(props.subtitle).toBe('Test Subtitle')
  })

  it('accepts ReactNode for title and subtitle', () => {
    const props: AccordionItemProps = {
      children: null,
      title: 'String title',
      subtitle: 'String subtitle',
    }
    expect(props.title).toBeDefined()
    expect(props.subtitle).toBeDefined()
  })

  it('accepts startContent and indicator', () => {
    const props: AccordionItemProps = {
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
    const props: AccordionItemProps = {
      children: null,
      title: 'Title',
      onSelected: mockCallback,
    }
    expect(props.onSelected).toBe(mockCallback)
  })

  it('accepts all custom style props', () => {
    const props: AccordionItemProps = {
      children: null,
      title: 'Title',
      baseStyle: { backgroundColor: 'red' },
      headingStyle: { padding: 10 },
      triggerStyle: { margin: 5 },
      titleStyle: { fontSize: 16 },
      subtitleStyle: { fontSize: 12 },
      contentStyle: { padding: 15 },
      startContentStyle: { marginRight: 10 },
      indicatorStyle: { opacity: 0.8 },
    }
    expect(props.baseStyle).toEqual({ backgroundColor: 'red' })
    expect(props.headingStyle).toEqual({ padding: 10 })
    expect(props.triggerStyle).toEqual({ margin: 5 })
    expect(props.titleStyle).toEqual({ fontSize: 16 })
    expect(props.subtitleStyle).toEqual({ fontSize: 12 })
    expect(props.contentStyle).toEqual({ padding: 15 })
    expect(props.startContentStyle).toEqual({ marginRight: 10 })
    expect(props.indicatorStyle).toEqual({ opacity: 0.8 })
  })
})
