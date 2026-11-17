/** What sizing a `<textarea>` reads and writes — the element, or a stand-in for it. */
export type GrowingBox = {
  style: { height: string }
  readonly scrollHeight: number
  readonly offsetHeight: number
  readonly clientHeight: number
}

/**
 * Makes a box exactly as tall as what it holds. Its `minHeight` and `maxHeight` still
 * apply: this sets the height they clamp.
 */
export function fitToContent(box: GrowingBox): void {
  // Let go first: a box held at its last height reports that height, never less. To
  // nothing rather than `auto`, which for a `<textarea>` is two lines whatever it holds.
  box.style.height = '0px'
  // `scrollHeight` stops at the padding; the box is measured to its border.
  const border = box.offsetHeight - box.clientHeight
  box.style.height = `${box.scrollHeight + border}px`
}
