import { describe, it, expect } from 'vitest'
import type { ToolbarProps, ToolbarActionProps } from '../../../components/toolbar'

describe('Toolbar Types', () => {
  it('exports ToolbarProps type', () => {
    const props: ToolbarProps = {
      title: 'Inbox',
      variant: 'small',
      position: 'relative',
      isVisible: true,
      themeColor: 'primary',
    }

    expect(props).toBeDefined()
    expect(props.title).toBe('Inbox')
    expect(props.variant).toBe('small')
  })

  it('accepts toolbar variants', () => {
    const variants: Array<ToolbarProps['variant']> = [
      'small',
      'centered',
      'medium',
      'large',
    ]

    variants.forEach(variant => {
      const props: ToolbarProps = { title: 'Title', variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts toolbar positions', () => {
    const positions: Array<ToolbarProps['position']> = [
      'relative',
      'absolute-top',
      'absolute-bottom',
    ]

    positions.forEach(position => {
      const props: ToolbarProps = { title: 'Title', position }
      expect(props.position).toBe(position)
    })
  })

  it('exports ToolbarActionProps type', () => {
    const props: ToolbarActionProps = {
      icon: () => null,
      onPress: () => {},
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.icon).toBeDefined()
  })
})
