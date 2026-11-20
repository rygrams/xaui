import { describe, expect, it } from 'vitest'
import { splitFieldStyle } from '../../system/split-field-style'

describe('splitFieldStyle', () => {
  it('sends the type to the text and the rest to the box', () => {
    const { box, text } = splitFieldStyle({
      fontSize: 19,
      color: '#fff',
      textAlignVertical: 'center',
      borderWidth: 2,
      borderColor: '#000',
      minHeight: 48,
      paddingHorizontal: 12,
    })

    expect(text).toEqual({
      fontSize: 19,
      color: '#fff',
      textAlignVertical: 'center',
    })
    expect(box).toEqual({
      borderWidth: 2,
      borderColor: '#000',
      minHeight: 48,
      paddingHorizontal: 12,
    })
  })

  it('drops undefined keys and reads nothing from no style', () => {
    expect(splitFieldStyle({ color: undefined, height: 40 })).toEqual({
      box: { height: 40 },
      text: {},
    })
    expect(splitFieldStyle(undefined)).toEqual({ box: {}, text: {} })
  })
})
