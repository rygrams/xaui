import { describe, expect, it } from 'vitest'
import { radiusAxis } from '../../../system/recipe/radius-axis'
import { createTheme } from '../../../theme/create-theme'

const { light } = createTheme()

describe('radiusAxis', () => {
  it('covers the whole radius scale', () => {
    expect(Object.keys(radiusAxis('root')).sort()).toEqual(
      Object.keys(light.radius).sort()
    )
  })

  it('applies the scale value to the named slot only', () => {
    const axis = radiusAxis('surface')

    expect(axis['2xl'](light, {})).toEqual({
      surface: { borderRadius: light.radius['2xl'] },
    })
    expect(axis.full(light, {})).toEqual({ surface: { borderRadius: 9999 } })
  })

  it('reads the theme it is given rather than a captured one', () => {
    const { light: wider } = createTheme({ radius: 24 })

    expect(radiusAxis('root').lg(wider, {})).toEqual({ root: { borderRadius: 24 } })
  })
})
