import React from 'react'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ChipGroup, ChipItem } from '../../../components/chip'
import type { ChipGroupProps, ChipItemProps } from '../../../components/chip'
import { useChipGroupSelection } from '../../../components/chip/chip-group.hook'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', foreground: '#ffffff', background: '#e3f2fd' },
      secondary: { main: '#9c27b0', foreground: '#ffffff', background: '#f3e5f5' },
      tertiary: { main: '#00796b', foreground: '#ffffff', background: '#e0f2f1' },
      danger: { main: '#d32f2f', foreground: '#ffffff', background: '#ffebee' },
      warning: { main: '#f57c00', foreground: '#000000', background: '#fff3e0' },
      success: { main: '#388e3c', foreground: '#ffffff', background: '#e8f5e9' },
      default: { main: '#ffffff', foreground: '#111827', background: '#f5f5f5' },
      background: '#ffffff',
      foreground: '#111827',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 24,
      '3xl': 32,
      full: 9999,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1,
        elevation: 1,
      },
    },
  }),
}))

describe('ChipGroup', () => {
  it('should render chip items', () => {
    const { getByText } = render(
      <ChipGroup>
        <ChipItem value="a">Alpha</ChipItem>
        <ChipItem value="b">Beta</ChipItem>
      </ChipGroup>,
    )
    expect(getByText('Alpha')).toBeTruthy()
    expect(getByText('Beta')).toBeTruthy()
  })

  it('should apply group size to items', () => {
    const { container } = render(
      <ChipGroup size="lg">
        <ChipItem value="a">Alpha</ChipItem>
      </ChipGroup>,
    )
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.height).toBe('40px')
  })

  it('should not render ChipItem outside of ChipGroup', () => {
    const { container } = render(<ChipItem value="solo">Solo</ChipItem>)
    expect(container.innerHTML).toBe('')
  })

  it('should apply disabled state from group', () => {
    const { container } = render(
      <ChipGroup isDisabled>
        <ChipItem value="a">Alpha</ChipItem>
      </ChipGroup>,
    )
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.opacity).toBe('0.5')
  })

  it('should render selectable chips with button wrappers', () => {
    const { container } = render(
      <ChipGroup isSelectable>
        <ChipItem value="a">Alpha</ChipItem>
      </ChipGroup>,
    )
    const button = container.querySelector('button')
    expect(button).toBeTruthy()
  })

  it('should not render button wrappers for non-selectable chips', () => {
    const { container } = render(
      <ChipGroup>
        <ChipItem value="a">Alpha</ChipItem>
      </ChipGroup>,
    )
    const button = container.querySelector('button')
    expect(button).toBeNull()
  })

  it('should accept all group props', () => {
    const props: ChipGroupProps = {
      children: null,
      isSelectable: true,
      selectMode: 'multiple',
      variant: 'solid',
      themeColor: 'primary',
      size: 'md',
      radius: 'full',
      isDisabled: false,
      selectedValues: ['a'],
      onSelectionChange: () => {},
      spacing: 12,
    }

    expect(props.isSelectable).toBe(true)
    expect(props.selectMode).toBe('multiple')
  })

  it('should accept all chip item props', () => {
    const props: ChipItemProps = {
      value: 'test',
      children: 'Test',
      variant: 'bordered',
      themeColor: 'danger',
      isDisabled: true,
    }

    expect(props.value).toBe('test')
    expect(props.variant).toBe('bordered')
  })
})

describe('useChipGroupSelection', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useChipGroupSelection('single', undefined, ['a']),
    )
    expect(result.current.currentValues).toEqual(['a'])
  })

  it('should initialize with empty array by default', () => {
    const { result } = renderHook(() =>
      useChipGroupSelection('single'),
    )
    expect(result.current.currentValues).toEqual([])
  })

  it('should toggle single selection', () => {
    const onSelectionChange = vi.fn()
    const { result } = renderHook(() =>
      useChipGroupSelection('single', undefined, [], onSelectionChange),
    )

    act(() => {
      result.current.onToggle('a')
    })
    expect(onSelectionChange).toHaveBeenCalledWith(['a'])
  })

  it('should deselect in single mode', () => {
    const onSelectionChange = vi.fn()
    const { result } = renderHook(() =>
      useChipGroupSelection('single', undefined, ['a'], onSelectionChange),
    )

    act(() => {
      result.current.onToggle('a')
    })
    expect(onSelectionChange).toHaveBeenCalledWith([])
  })

  it('should add to selection in multiple mode', () => {
    const onSelectionChange = vi.fn()
    const { result } = renderHook(() =>
      useChipGroupSelection('multiple', undefined, ['a'], onSelectionChange),
    )

    act(() => {
      result.current.onToggle('b')
    })
    expect(onSelectionChange).toHaveBeenCalledWith(['a', 'b'])
  })

  it('should remove from selection in multiple mode', () => {
    const onSelectionChange = vi.fn()
    const { result } = renderHook(() =>
      useChipGroupSelection('multiple', undefined, ['a', 'b'], onSelectionChange),
    )

    act(() => {
      result.current.onToggle('a')
    })
    expect(onSelectionChange).toHaveBeenCalledWith(['b'])
  })

  it('should use controlled values when provided', () => {
    const onSelectionChange = vi.fn()
    const { result } = renderHook(() =>
      useChipGroupSelection('single', ['b'], undefined, onSelectionChange),
    )

    expect(result.current.currentValues).toEqual(['b'])

    act(() => {
      result.current.onToggle('a')
    })
    expect(onSelectionChange).toHaveBeenCalledWith(['a'])
  })

  it('should replace selection in single mode', () => {
    const onSelectionChange = vi.fn()
    const { result } = renderHook(() =>
      useChipGroupSelection('single', undefined, ['a'], onSelectionChange),
    )

    act(() => {
      result.current.onToggle('b')
    })
    expect(onSelectionChange).toHaveBeenCalledWith(['b'])
  })
})
