import React from 'react'
import { describe, expect, it } from 'vitest'
import type {
  SliderMark,
  SliderOrientation,
  SliderProps,
} from '../../../components/slider'

describe('Slider Types', () => {
  it('accepts controlled mode props', () => {
    const props: SliderProps = {
      value: 25,
      onChange: () => {},
      onChangeEnd: () => {},
    }

    expect(props.value).toBe(25)
    expect(props.onChange).toBeDefined()
    expect(props.onChangeEnd).toBeDefined()
  })

  it('accepts default props for uncontrolled mode', () => {
    const props: SliderProps = {
      defaultValue: 10,
      minValue: 0,
      maxValue: 100,
      step: 5,
    }

    expect(props.defaultValue).toBe(10)
    expect(props.step).toBe(5)
  })

  it('accepts both orientations', () => {
    const orientations: SliderOrientation[] = ['horizontal', 'vertical']

    orientations.forEach(orientation => {
      const props: SliderProps = {
        orientation,
      }
      expect(props.orientation).toBe(orientation)
    })
  })

  it('accepts marks and content slots', () => {
    const marks: SliderMark[] = [
      { value: 0, label: '0' },
      { value: 50, label: React.createElement('div', null, 'Mid') },
      { value: 100, label: '100' },
    ]

    const props: SliderProps = {
      marks,
      startContent: React.createElement('div'),
      endContent: React.createElement('div'),
    }

    expect(props.marks).toHaveLength(3)
    expect(props.startContent).toBeDefined()
    expect(props.endContent).toBeDefined()
  })

  it('accepts label and formatting options', () => {
    const props: SliderProps = {
      label: 'Volume',
      showValueLabel: true,
      formatOptions: { style: 'percent', maximumFractionDigits: 0 },
    }

    expect(props.label).toBe('Volume')
    expect(props.showValueLabel).toBe(true)
    expect(props.formatOptions?.style).toBe('percent')
  })
})
