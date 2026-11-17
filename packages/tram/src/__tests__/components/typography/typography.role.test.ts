import { describe, expect, it } from 'vitest'
import type { XAUITheme } from '@xaui/native/theme'
import { roleType } from '../../../components/typography/typography.role'

const theme = {
  fontFamilies: { body: 'Selawik', heading: 'Selawik Display' },
} as unknown as XAUITheme

describe('roleType', () => {
  it('sets running text in the body family, at its size', () => {
    expect(roleType('subtitle', theme)).toEqual({
      fontSize: 19,
      fontFamily: 'Selawik',
      fontWeight: '400',
    })
  })

  it('sets a title in the heading family, in the face its weight names', () => {
    expect(roleType('title', theme)).toEqual({
      fontSize: 25,
      fontFamily: 'Selawik Display-Semilight',
      fontWeight: '300',
    })
  })
})
