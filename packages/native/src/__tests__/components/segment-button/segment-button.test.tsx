import React from 'react'
import { describe, it, expect } from 'vitest'
import type {
  SegmentButtonProps,
  SegmentButtonVariant,
  SegmentButtonSelectionMode,
  ElevationLevel,
  SegmentButtonItemProps,
} from '../../../components/segment-button'

describe('SegmentButton Types', () => {
  it('exports SegmentButtonProps type with children', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
    }

    expect(props).toBeDefined()
    expect(props.children).toBeDefined()
  })

  it('accepts controlled mode props', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      selected: 'day',
      onSelectionChange: () => {},
    }

    expect(props.selected).toBe('day')
    expect(props.onSelectionChange).toBeDefined()
  })

  it('accepts uncontrolled mode with defaultSelected', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      defaultSelected: 'week',
    }

    expect(props.defaultSelected).toBe('week')
    expect(props.selected).toBeUndefined()
    expect(props.onSelectionChange).toBeUndefined()
  })

  it('accepts all theme colors', () => {
    const colors: Array<SegmentButtonProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(color => {
      const props: SegmentButtonProps = {
        children: React.createElement('div'),
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: SegmentButtonVariant[] = [
      'solid',
      'outlined',
      'flat',
      'light',
      'faded',
    ]

    variants.forEach(variant => {
      const props: SegmentButtonProps = {
        children: React.createElement('div'),
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<SegmentButtonProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: SegmentButtonProps = {
        children: React.createElement('div'),
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<SegmentButtonProps['radius']> = [
      'none',
      'sm',
      'md',
      'lg',
      'full',
    ]

    radii.forEach(radius => {
      const props: SegmentButtonProps = {
        children: React.createElement('div'),
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts selection mode options', () => {
    const modes: SegmentButtonSelectionMode[] = ['single', 'multiple']

    modes.forEach(mode => {
      const props: SegmentButtonProps = {
        children: React.createElement('div'),
        selectionMode: mode,
      }
      expect(props.selectionMode).toBe(mode)
    })
  })

  it('accepts boolean props', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      fullWidth: true,
      isDisabled: true,
      showCheckmark: false,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isDisabled).toBe(true)
    expect(props.showCheckmark).toBe(false)
  })

  it('accepts elevation levels', () => {
    const levels: ElevationLevel[] = [0, 1, 2, 3, 4]

    levels.forEach(level => {
      const props: SegmentButtonProps = {
        children: React.createElement('div'),
        elevation: level,
      }
      expect(props.elevation).toBe(level)
    })
  })

  it('accepts string selected for single mode', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      selected: 'week',
      selectionMode: 'single',
    }

    expect(props.selected).toBe('week')
  })

  it('accepts array selected for multiple mode', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      selected: ['day', 'month'],
      selectionMode: 'multiple',
    }

    expect(props.selected).toEqual(['day', 'month'])
  })

  it('accepts custom appearance container style', () => {
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      customAppearance: {
        container: { marginTop: 10 },
      },
    }

    expect(props.customAppearance?.container).toEqual({ marginTop: 10 })
  })

  it('accepts onSelectionChange callback', () => {
    let result: string | string[] = ''
    const props: SegmentButtonProps = {
      children: React.createElement('div'),
      onSelectionChange: val => {
        result = val
      },
    }

    props.onSelectionChange?.('week')
    expect(result).toBe('week')
  })
})

describe('SegmentButtonItem Types', () => {
  it('exports SegmentButtonItemProps type', () => {
    const props: SegmentButtonItemProps = {
      itemKey: 'day',
      label: 'Day',
    }

    expect(props.itemKey).toBe('day')
    expect(props.label).toBe('Day')
  })

  it('accepts optional icon and disabled state', () => {
    const props: SegmentButtonItemProps = {
      itemKey: 'a',
      label: 'A',
      icon: React.createElement('div'),
      isDisabled: true,
    }

    expect(props.isDisabled).toBe(true)
    expect(props.icon).toBeDefined()
  })

  it('accepts custom appearance styles', () => {
    const props: SegmentButtonItemProps = {
      itemKey: 'b',
      label: 'B',
      customAppearance: {
        segment: { padding: 5 },
        selectedSegment: { padding: 8 },
        text: { fontWeight: '400' },
        selectedText: { fontWeight: '700' },
      },
    }

    expect(props.customAppearance?.segment).toEqual({ padding: 5 })
    expect(props.customAppearance?.selectedSegment).toEqual({ padding: 8 })
  })
})
