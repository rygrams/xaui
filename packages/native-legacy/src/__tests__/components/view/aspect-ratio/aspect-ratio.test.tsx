import { describe, it, expect } from 'vitest'
import type { AspectRatioProps } from '../../../../components/view/aspect-ratio/aspect-ratio.type'

describe('AspectRatio Types', () => {
  it('accepts ratio', () => {
    const props: AspectRatioProps = { ratio: 16 / 9 }
    expect(props.ratio).toBeCloseTo(1.777, 2)
  })

  it('accepts alignment', () => {
    const props: AspectRatioProps = { ratio: 1, alignment: 'center' }
    expect(props.alignment).toBe('center')
  })

  it('accepts alignment as object', () => {
    const props: AspectRatioProps = { ratio: 1, alignment: { x: 0.5, y: 0.5 } }
    expect(props.alignment).toEqual({ x: 0.5, y: 0.5 })
  })

  it('accepts clip', () => {
    const props: AspectRatioProps = { ratio: 1, clip: true }
    expect(props.clip).toBe(true)
  })

  it('accepts children as optional', () => {
    const props: AspectRatioProps = { ratio: 1 }
    expect(props.children).toBeUndefined()
  })

  it('accepts style', () => {
    const props: AspectRatioProps = { ratio: 1, style: { backgroundColor: 'red' } }
    expect(props.style).toEqual({ backgroundColor: 'red' })
  })

  it('accepts testID', () => {
    const props: AspectRatioProps = { ratio: 1, testID: 'ar-box' }
    expect(props.testID).toBe('ar-box')
  })
})
