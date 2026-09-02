import { describe, it, expect } from 'vitest'
import type {
  ConstrainedBoxProps,
  BoxConstraints,
} from '../../../../components/view/constrained-box/constrained-box.type'

describe('ConstrainedBox Types', () => {
  it('accepts minWidth and maxWidth via constraints', () => {
    const props: ConstrainedBoxProps = {
      constraints: { minWidth: 100, maxWidth: 300 },
    }
    expect(props.constraints.minWidth).toBe(100)
    expect(props.constraints.maxWidth).toBe(300)
  })

  it('accepts minHeight and maxHeight via constraints', () => {
    const props: ConstrainedBoxProps = {
      constraints: { minHeight: 50, maxHeight: 200 },
    }
    expect(props.constraints.minHeight).toBe(50)
    expect(props.constraints.maxHeight).toBe(200)
  })

  it('accepts all constraints at once', () => {
    const props: ConstrainedBoxProps = {
      constraints: {
        minWidth: 100,
        maxWidth: 300,
        minHeight: 50,
        maxHeight: 200,
      },
    }
    expect(props.constraints.minWidth).toBe(100)
    expect(props.constraints.maxWidth).toBe(300)
    expect(props.constraints.minHeight).toBe(50)
    expect(props.constraints.maxHeight).toBe(200)
  })

  it('accepts children', () => {
    const props: ConstrainedBoxProps = {
      constraints: {},
      children: 'content',
    }
    expect(props.children).toBe('content')
  })

  it('accepts style', () => {
    const props: ConstrainedBoxProps = {
      constraints: {},
      style: { backgroundColor: 'red' },
    }
    expect(props.style).toEqual({ backgroundColor: 'red' })
  })

  it('accepts testID', () => {
    const props: ConstrainedBoxProps = {
      constraints: {},
      testID: 'my-constrained',
    }
    expect(props.testID).toBe('my-constrained')
  })

  it('does not expose width, height, or expand', () => {
    const props: ConstrainedBoxProps = { constraints: {} }
    expect('width' in props).toBe(false)
    expect('height' in props).toBe(false)
    expect('expand' in props).toBe(false)
  })

  it('BoxConstraints can be empty', () => {
    const c: BoxConstraints = {}
    expect(c).toEqual({})
  })
})
