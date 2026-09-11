import { describe, expect, it } from 'vitest'
import { splitStyleProps, toWebStyle, toWebUnit } from '../../system/style-props'

describe('Hybrid style boundary', () => {
  it('keeps one Native point equal to one CSS logical pixel at scale 1', () => {
    expect(toWebUnit(4)).toBe('0.25rem')
    expect(toWebUnit(16)).toBe('1rem')
  })

  it('converts fixed lengths and preserves unitless values', () => {
    expect(
      toWebStyle({
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.5,
        flexGrow: 1,
        zIndex: 2,
      })
    ).toEqual({
      fontSize: '1rem',
      lineHeight: '1.5rem',
      opacity: 0.5,
      flexGrow: 1,
      zIndex: 2,
    })
  })

  it('maps Native start/end shorthands to logical CSS properties', () => {
    expect(
      toWebStyle({
        start: 4,
        marginEnd: 8,
        paddingHorizontal: 12,
      })
    ).toEqual({
      insetInlineStart: '0.25rem',
      marginInlineEnd: '0.5rem',
      paddingInline: '0.75rem',
    })
  })

  it('translates Native font weights and transforms without scaling ratios', () => {
    expect(
      toWebStyle({
        fontWeight: 'semibold',
        transform: [{ translateX: 4 }, { scale: 1.25 }],
      })
    ).toEqual({
      fontWeight: 600,
      transform: 'translateX(0.25rem) scale(1.25)',
    })
  })

  it('flattens style arrays with the final value winning', () => {
    expect(toWebStyle([{ fontSize: 14 }, false, { fontSize: 18 }])).toEqual({
      fontSize: '1.125rem',
    })
  })

  it('removes style props from the props forwarded to the DOM', () => {
    expect(splitStyleProps({ fontSize: 16, testID: 'title' })).toEqual([
      { fontSize: 16 },
      { testID: 'title' },
    ])
  })
})
