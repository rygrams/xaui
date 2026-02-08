import React from 'react'
import { describe, expect, it } from 'vitest'
import type { TabsItem, TabsProps, TabsVariant } from '../../../components/tabs'

describe('Tabs Types', () => {
  it('accepts tabs items and controlled props', () => {
    const props: TabsProps = {
      items: [
        { key: 'account', title: 'Account' },
        { key: 'billing', title: 'Billing' },
      ],
      selectedKey: 'account',
      onSelectionChange: () => {},
    }

    expect(props.items).toHaveLength(2)
    expect(props.selectedKey).toBe('account')
    expect(props.onSelectionChange).toBeDefined()
  })

  it('does not require children', () => {
    const props: TabsProps = {
      items: [{ key: 'overview', title: 'Overview' }],
    }

    expect(props.children).toBeUndefined()
  })

  it('accepts render function as children', () => {
    const props: TabsProps = {
      items: [{ key: 'security', title: 'Security' }],
      children: ({ selectedKey }) => React.createElement('div', null, selectedKey),
    }

    expect(typeof props.children).toBe('function')
  })

  it('accepts all variants', () => {
    const variants: TabsVariant[] = ['solid', 'bordered', 'light', 'underlined']

    variants.forEach(variant => {
      const props: TabsProps = {
        items: [{ key: 'general', title: 'General' }],
        variant,
      }

      expect(props.variant).toBe(variant)
    })
  })

  it('accepts theme color, size and radius', () => {
    const props: TabsProps = {
      items: [{ key: 'general', title: 'General' }],
      color: 'secondary',
      size: 'lg',
      radius: 'md',
    }

    expect(props.color).toBe('secondary')
    expect(props.size).toBe('lg')
    expect(props.radius).toBe('md')
  })

  it('accepts tabs item adornments and disabled state', () => {
    const item: TabsItem = {
      key: 'support',
      title: 'Support',
      startContent: React.createElement('div'),
      endContent: React.createElement('div'),
      isDisabled: true,
    }

    expect(item.startContent).toBeDefined()
    expect(item.endContent).toBeDefined()
    expect(item.isDisabled).toBe(true)
  })
})
