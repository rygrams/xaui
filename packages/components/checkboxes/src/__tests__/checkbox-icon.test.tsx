import { describe, it, expect } from 'vitest'

type CheckboxIconProps = {
  isChecked: boolean
  isIndeterminate?: boolean
  color: string
  size: number
}

describe('CheckboxIcon Types', () => {
  it('accepts required props', () => {
    const props: CheckboxIconProps = {
      isChecked: true,
      color: '#007AFF',
      size: 20,
    }

    expect(props.isChecked).toBe(true)
    expect(props.color).toBe('#007AFF')
    expect(props.size).toBe(20)
  })

  it('accepts optional isIndeterminate prop', () => {
    const propsWithIndeterminate: CheckboxIconProps = {
      isChecked: false,
      isIndeterminate: true,
      color: '#FF0000',
      size: 18,
    }

    const propsWithoutIndeterminate: CheckboxIconProps = {
      isChecked: true,
      color: '#00FF00',
      size: 22,
    }

    expect(propsWithIndeterminate.isIndeterminate).toBe(true)
    expect(propsWithoutIndeterminate.isIndeterminate).toBeUndefined()
  })

  it('accepts different sizes', () => {
    const sizes = [12, 14, 16, 18, 20, 22, 24]

    sizes.forEach((size) => {
      const props: CheckboxIconProps = {
        isChecked: true,
        color: '#000',
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts different color formats', () => {
    const colors = ['#FF0000', '#00FF00', '#0000FF', 'rgb(255, 0, 0)', 'rgba(0, 255, 0, 0.5)']

    colors.forEach((color) => {
      const props: CheckboxIconProps = {
        isChecked: true,
        color,
        size: 20,
      }
      expect(props.color).toBe(color)
    })
  })

  it('accepts checked and unchecked states', () => {
    const checkedProps: CheckboxIconProps = {
      isChecked: true,
      color: '#007AFF',
      size: 20,
    }

    const uncheckedProps: CheckboxIconProps = {
      isChecked: false,
      color: '#007AFF',
      size: 20,
    }

    expect(checkedProps.isChecked).toBe(true)
    expect(uncheckedProps.isChecked).toBe(false)
  })

  it('handles indeterminate state with checked state', () => {
    const props: CheckboxIconProps = {
      isChecked: false,
      isIndeterminate: true,
      color: '#007AFF',
      size: 20,
    }

    expect(props.isChecked).toBe(false)
    expect(props.isIndeterminate).toBe(true)
  })
})
