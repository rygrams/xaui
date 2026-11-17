import { describe, expect, it } from 'vitest'
import { fitToContent } from '../../system/fit-to-content'

/** A `<textarea>` that, like the real one, never reports less than the height it is held at. */
function textarea(content: number, border: number, held: number) {
  const style = { height: `${held}px` }
  const inner = () =>
    style.height === '0px'
      ? content
      : Math.max(content, parseFloat(style.height) - border)
  return {
    style,
    get scrollHeight() {
      return inner()
    },
    get clientHeight() {
      return inner()
    },
    get offsetHeight() {
      return inner() + border
    },
  }
}

describe('fitToContent', () => {
  it('grows to the content, border included', () => {
    const box = textarea(180, 4, 102)
    fitToContent(box)
    expect(box.style.height).toBe('184px')
  })

  it('shrinks back when the content does', () => {
    const box = textarea(60, 4, 184)
    fitToContent(box)
    expect(box.style.height).toBe('64px')
  })
})
