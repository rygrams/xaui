import { describe, it, expect } from 'vitest'
import type { AlignProps } from '../../../../components/view/align/align.type'

describe('AlignProps types', () => {
  it('accepts alignment as named value', () => {
    const props: AlignProps = { alignment: 'center' }
    expect(props.alignment).toBe('center')
  })

  it('accepts all named alignments', () => {
    const alignments: AlignProps['alignment'][] = [
      'topLeft',
      'topCenter',
      'topRight',
      'centerLeft',
      'center',
      'centerRight',
      'bottomLeft',
      'bottomCenter',
      'bottomRight',
    ]
    alignments.forEach(alignment => {
      const props: AlignProps = { alignment }
      expect(props.alignment).toBe(alignment)
    })
  })

  it('accepts coordinate alignment', () => {
    const props: AlignProps = { alignment: { x: 0.5, y: 0.5 } }
    expect(props.alignment).toEqual({ x: 0.5, y: 0.5 })
  })

  it('accepts children as optional', () => {
    const props: AlignProps = { alignment: 'topLeft' }
    expect(props.children).toBeUndefined()
  })

  it('accepts style override', () => {
    const props: AlignProps = {
      alignment: 'center',
      style: { backgroundColor: 'red' },
    }
    expect(props.style).toEqual({ backgroundColor: 'red' })
  })
})
