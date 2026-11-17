import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Platform } from 'react-native'
import { fitToContent, type GrowingBox } from './fit-to-content'

/** The part of a `<textarea>` this listens to. */
type FieldNode = GrowingBox & {
  readonly offsetWidth: number
  addEventListener: (type: 'input', listener: () => void) => void
  removeEventListener: (type: 'input', listener: () => void) => void
}

const isWeb = Platform.OS === 'web'

/**
 * A multiline field that grows with what is typed, on the web. A phone's `TextInput`
 * already does; a `<textarea>` keeps the height it was given and scrolls.
 *
 * Returns the ref to hand the field. It listens to the node rather than to `onChange`, so
 * an uncontrolled field grows too and no caller's handler is touched. `watched` is what
 * else changes the height: the value set from outside, the row counts.
 */
export function useGrowWithContent(
  isOn: boolean,
  watched: readonly unknown[]
): (node: unknown) => void {
  const [box, setBox] = useState<FieldNode | null>(null)

  const hold = useCallback((node: unknown) => {
    if (isWeb) setBox(node as FieldNode | null)
  }, [])

  useLayoutEffect(() => {
    if (!box) return
    if (isOn) fitToContent(box)
    // Off, the height goes back to whoever set one.
    else box.style.height = ''
  }, [box, isOn, ...watched])

  useEffect(() => {
    if (!box || !isOn) return
    const fit = () => fitToContent(box)
    box.addEventListener('input', fit)

    // A narrower box wraps its text onto more lines. Only the width is watched: the
    // height is the one this sets.
    let width = box.offsetWidth
    const resize = new globalThis.ResizeObserver(() => {
      if (box.offsetWidth === width) return
      width = box.offsetWidth
      fit()
    })
    resize.observe(box as never)

    return () => {
      box.removeEventListener('input', fit)
      resize.disconnect()
    }
  }, [box, isOn])

  return hold
}
