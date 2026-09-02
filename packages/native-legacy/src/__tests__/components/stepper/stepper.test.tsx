import React from 'react'
import { describe, it, expect } from 'vitest'
import type {
  StepperProps,
  StepperItemProps,
  StepperDirection,
  StepperLineDisplayMode,
  StepperSize,
} from '../../../components/stepper'

describe('Stepper Types', () => {
  it('exports StepperProps type with children', () => {
    const props: StepperProps = {
      children: React.createElement('div'),
    }

    expect(props.children).toBeDefined()
  })

  it('accepts controlled and uncontrolled active state props', () => {
    const controlled: StepperProps = {
      children: React.createElement('div'),
      activeKey: 'details',
      onStepChange: () => {},
    }

    const uncontrolled: StepperProps = {
      children: React.createElement('div'),
      defaultActiveKey: 'account',
    }

    expect(controlled.activeKey).toBe('details')
    expect(uncontrolled.defaultActiveKey).toBe('account')
  })

  it('accepts directions, sizes, and showLines option', () => {
    const directions: StepperDirection[] = ['horizontal', 'vertical']
    const lineModes: StepperLineDisplayMode[] = ['progress', 'all']
    const sizes: StepperSize[] = ['sm', 'md', 'lg']

    directions.forEach(direction => {
      const props: StepperProps = {
        children: React.createElement('div'),
        direction,
        showLines: direction === 'horizontal',
      }

      expect(props.direction).toBe(direction)
    })

    lineModes.forEach(lineDisplayMode => {
      const props: StepperProps = {
        children: React.createElement('div'),
        lineDisplayMode,
      }

      expect(props.lineDisplayMode).toBe(lineDisplayMode)
    })

    sizes.forEach(size => {
      const props: StepperProps = {
        children: React.createElement('div'),
        size,
      }

      expect(props.size).toBe(size)
    })
  })
})

describe('StepperItem Types', () => {
  it('exports StepperItemProps type', () => {
    const props: StepperItemProps = {
      itemKey: 'account',
      title: 'Account',
      description: 'Set up account',
    }

    expect(props.itemKey).toBe('account')
    expect(props.title).toBe('Account')
  })

  it('accepts lock, disabled, and custom indicator props', () => {
    const props: StepperItemProps = {
      itemKey: 'review',
      title: 'Review',
      isLocked: true,
      isDisabled: false,
      indicator: ({ isLocked }) => (isLocked ? 'L' : '1'),
    }

    expect(props.isLocked).toBe(true)
    expect(props.indicator).toBeDefined()
  })
})
