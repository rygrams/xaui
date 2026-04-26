import { describe, it, expect } from 'vitest'
import type { FractionallySizedBoxProps } from '../../../../components/view/fractionally-sized-box/fractionally-sized-box.type'

describe('FractionallySizedBox Types', () => {
  it('accepts widthFactor', () => {
    const props: FractionallySizedBoxProps = { widthFactor: 0.5 }
    expect(props.widthFactor).toBe(0.5)
  })

  it('accepts heightFactor', () => {
    const props: FractionallySizedBoxProps = { heightFactor: 0.75 }
    expect(props.heightFactor).toBe(0.75)
  })

  it('accepts both factors', () => {
    const props: FractionallySizedBoxProps = { widthFactor: 0.5, heightFactor: 0.75 }
    expect(props.widthFactor).toBe(0.5)
    expect(props.heightFactor).toBe(0.75)
  })

  it('accepts alignment', () => {
    const props: FractionallySizedBoxProps = { alignment: 'center' }
    expect(props.alignment).toBe('center')
  })

  it('accepts alignment as object', () => {
    const props: FractionallySizedBoxProps = { alignment: { x: 0.5, y: 0.5 } }
    expect(props.alignment).toEqual({ x: 0.5, y: 0.5 })
  })

  it('accepts children', () => {
    const props: FractionallySizedBoxProps = { children: 'content' }
    expect(props.children).toBe('content')
  })

  it('accepts style', () => {
    const props: FractionallySizedBoxProps = { style: { backgroundColor: 'red' } }
    expect(props.style).toEqual({ backgroundColor: 'red' })
  })

  it('accepts testID', () => {
    const props: FractionallySizedBoxProps = { testID: 'my-box' }
    expect(props.testID).toBe('my-box')
  })

  it('works with no factors (child chooses its own size)', () => {
    const props: FractionallySizedBoxProps = {}
    expect(props.widthFactor).toBeUndefined()
    expect(props.heightFactor).toBeUndefined()
  })
})
