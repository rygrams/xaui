import React from 'react'
import { describe, expect, it } from 'vitest'
import {
  Tab,
  type TabProps,
  type TabsItem,
  type TabsProps,
  type TabsVariant,
} from '../../../components/tabs'

describe('Tabs Types', () => {
  it('accepts controlled props with Tab children', () => {
    const props: TabsProps = {
      selectedKey: 'account',
      onSelectionChange: () => {},
      children: [
        <Tab key="account" title="Account" />,
        <Tab key="billing" title="Billing" />,
      ],
    }

    expect(props.selectedKey).toBe('account')
    expect(props.onSelectionChange).toBeDefined()
  })

  it('requires children', () => {
    const props: TabsProps = {
      children: [<Tab key="overview" title="Overview" />],
    }

    expect(props.children).toBeDefined()
  })

  it('accepts render function as content', () => {
    const props: TabsProps = {
      children: [<Tab key="security" title="Security" />],
      content: ({ selectedKey }) => React.createElement('div', null, selectedKey),
    }

    expect(typeof props.content).toBe('function')
  })

  it('accepts all variants', () => {
    const variants: TabsVariant[] = ['solid', 'bordered', 'light', 'underlined']

    variants.forEach(variant => {
      const props: TabsProps = {
        children: [<Tab key="general" title="General" />],
        variant,
      }

      expect(props.variant).toBe(variant)
    })
  })

  it('accepts theme color, size and radius', () => {
    const props: TabsProps = {
      children: [<Tab key="general" title="General" />],
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
      content: React.createElement('div'),
    }

    expect(item.startContent).toBeDefined()
    expect(item.endContent).toBeDefined()
    expect(item.isDisabled).toBe(true)
    expect(item.content).toBeDefined()
  })

  it('accepts tab props with tab content', () => {
    const tabProps: TabProps = {
      title: 'Overview',
      isDisabled: false,
      children: React.createElement('div'),
    }

    expect(tabProps.title).toBe('Overview')
    expect(tabProps.children).toBeDefined()
  })
})
