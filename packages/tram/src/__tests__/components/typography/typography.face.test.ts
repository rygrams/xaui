import { describe, expect, it } from 'vitest'
import { faceFor } from '../../../components/typography/typography.face'

describe('faceFor', () => {
  it('names the Selawik face of each weight', () => {
    expect(faceFor('Selawik', 'light').fontFamily).toBe('Selawik-Light')
    expect(faceFor('Selawik', 'semilight').fontFamily).toBe('Selawik-Semilight')
    expect(faceFor('Selawik', 'regular').fontFamily).toBe('Selawik')
  })

  it('follows the family the theme was given', () => {
    expect(faceFor('Inter', 'light').fontFamily).toBe('Inter-Light')
  })

  it('sends the nearest weight a system font can draw without the face', () => {
    expect(faceFor('Selawik', 'light').fontWeight).toBe('300')
    expect(faceFor('Selawik', 'semilight').fontWeight).toBe('300')
    expect(faceFor('Selawik', 'regular').fontWeight).toBe('400')
  })
})
