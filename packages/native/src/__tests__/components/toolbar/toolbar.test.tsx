import { describe, it, expect } from 'vitest'
import type { ToolbarProps, ToolbarActionProps } from '../../../components/toolbar'

describe('Toolbar Types', () => {
  it('exports ToolbarProps type', () => {
    const props: ToolbarProps = {
      variant: 'docked',
      position: 'top',
      isVisible: true,
      themeColor: 'primary',
    }

    expect(props).toBeDefined()
    expect(props.variant).toBe('docked')
    expect(props.position).toBe('top')
  })

  it('accepts toolbar variants', () => {
    const variants: Array<ToolbarProps['variant']> = ['floating', 'docked', 'vertical']

    variants.forEach((variant) => {
      const props: ToolbarProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts toolbar positions', () => {
    const positions: Array<ToolbarProps['position']> = ['top', 'bottom', 'left', 'right']

    positions.forEach((position) => {
      const props: ToolbarProps = { position }
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
