import { describe, it, expect } from 'vitest'
import type { WrapProps } from '../../../../components/view/layout-types'

describe('WrapProps types', () => {
  it('defaults to horizontal direction', () => {
    const props: WrapProps = {}
    expect(props.direction).toBeUndefined()
  })

  it('accepts spacing and runSpacing', () => {
    const props: WrapProps = { spacing: 8, runSpacing: 16 }
    expect(props.spacing).toBe(8)
    expect(props.runSpacing).toBe(16)
  })

  it('accepts alignment', () => {
    const props: WrapProps = { alignment: 'center', runAlignment: 'spaceBetween' }
    expect(props.alignment).toBe('center')
    expect(props.runAlignment).toBe('spaceBetween')
  })
})
