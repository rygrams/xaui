import { describe, it, expect } from 'vitest'
import type {
  SegmentButtonProps,
  SegmentItem,
  SegmentButtonVariant,
  SegmentButtonSelectionMode,
  ElevationLevel,
} from '../../../components/segment-button'

describe('SegmentButton Types', () => {
  const segments: SegmentItem[] = [
    { key: 'day', label: 'Day' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
  ]

  it('exports SegmentButtonProps type with required props', () => {
    const props: SegmentButtonProps = {
      segments,
      selected: 'day',
      onSelectionChange: () => {},
    }

    expect(props).toBeDefined()
    expect(props.segments).toHaveLength(3)
    expect(props.selected).toBe('day')
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
        segments,
        selected: 'day',
        onSelectionChange: () => {},
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
        segments,
        selected: 'day',
        onSelectionChange: () => {},
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<SegmentButtonProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: SegmentButtonProps = {
        segments,
        selected: 'day',
        onSelectionChange: () => {},
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
        segments,
        selected: 'day',
        onSelectionChange: () => {},
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts selection mode options', () => {
    const modes: SegmentButtonSelectionMode[] = ['single', 'multiple']

    modes.forEach(mode => {
      const props: SegmentButtonProps = {
        segments,
        selected: mode === 'single' ? 'day' : ['day', 'week'],
        onSelectionChange: () => {},
        selectionMode: mode,
      }
      expect(props.selectionMode).toBe(mode)
    })
  })

  it('accepts boolean props', () => {
    const props: SegmentButtonProps = {
      segments,
      selected: 'day',
      onSelectionChange: () => {},
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
        segments,
        selected: 'day',
        onSelectionChange: () => {},
        elevation: level,
      }
      expect(props.elevation).toBe(level)
    })
  })

  it('accepts string selected for single mode', () => {
    const props: SegmentButtonProps = {
      segments,
      selected: 'week',
      onSelectionChange: () => {},
      selectionMode: 'single',
    }

    expect(props.selected).toBe('week')
  })

  it('accepts array selected for multiple mode', () => {
    const props: SegmentButtonProps = {
      segments,
      selected: ['day', 'month'],
      onSelectionChange: () => {},
      selectionMode: 'multiple',
    }

    expect(props.selected).toEqual(['day', 'month'])
  })

  it('accepts segment items with icons and disabled state', () => {
    const itemsWithOptions: SegmentItem[] = [
      { key: 'a', label: 'A', icon: 'icon-a', isDisabled: true },
      { key: 'b', label: 'B', icon: 'icon-b', isDisabled: false },
      { key: 'c', label: 'C' },
    ]

    const props: SegmentButtonProps = {
      segments: itemsWithOptions,
      selected: 'b',
      onSelectionChange: () => {},
    }

    expect(props.segments[0].isDisabled).toBe(true)
    expect(props.segments[0].icon).toBe('icon-a')
    expect(props.segments[2].isDisabled).toBeUndefined()
  })

  it('accepts custom appearance styles', () => {
    const props: SegmentButtonProps = {
      segments,
      selected: 'day',
      onSelectionChange: () => {},
      customAppearance: {
        container: { marginTop: 10 },
        segment: { padding: 5 },
        selectedSegment: { padding: 8 },
        text: { fontWeight: '400' },
        selectedText: { fontWeight: '700' },
      },
    }

    expect(props.customAppearance?.container).toEqual({ marginTop: 10 })
    expect(props.customAppearance?.selectedSegment).toEqual({ padding: 8 })
  })

  it('accepts onSelectionChange callback', () => {
    let result: string | string[] = ''
    const props: SegmentButtonProps = {
      segments,
      selected: 'day',
      onSelectionChange: val => {
        result = val
      },
    }

    props.onSelectionChange('week')
    expect(result).toBe('week')
  })
})
