import { forwardRef, useEffect, useLayoutEffect } from 'react'
import type { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { listPickerMode } from '../../system/list-picker'
import { SelectInlineList } from './select-inline-list'
import { SelectItem } from './select-item'
import { SelectPage } from './select-page'
import { useSelect } from './select.context'
import { ORDER_SEPARATOR, readItems } from './select.items'
import type { SelectContentProps } from './select.type'

/** By identity rather than by `displayName`: a minifier keeps the reference. */
const isSelectItem = (type: unknown) => type === SelectItem

/**
 * The list. Up to five choices it unfolds inside the field and pushes what is under it;
 * past five it is a page of its own. `mode` forces one or the other — which is also the
 * answer for items wrapped in a component, which cannot be counted.
 *
 * `ref`, `style` and the view's props go to whichever is drawn: the list in the field, or
 * the page.
 */
export const SelectContent = forwardRef<View, SelectContentProps>(
  function SelectContent({ children, mode: forced, style, ...props }, ref) {
    const { inlineList, registerLabel, setListing } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    const items = readItems(children, isSelectItem)
    const mode = listPickerMode(items.length, forced)
    const order = items.map(item => item.value).join(ORDER_SEPARATOR)

    // Read off the elements, before anything mounts: a page that has never been opened has
    // rendered no item, and the field still has to name its `defaultValue`.
    useEffect(() => {
      for (const { value, label } of readItems(children, isSelectItem)) {
        if (label !== undefined) registerLabel(value, label)
      }
    }, [children, registerLabel])

    useEffect(() => {
      setListing({ mode, order })
    }, [mode, order, setListing])

    const drawn = [styleProps, style]
    const unfolded =
      mode === 'inline' ? (
        <SelectInlineList ref={ref} {...rest} style={drawn}>
          {children}
        </SelectInlineList>
      ) : null

    // Handed to the box on every render — it is the box that draws an unfolded list, inside
    // its own line. Publishing re-renders the box, never this component.
    useLayoutEffect(() => {
      inlineList.set(unfolded)
    })
    useLayoutEffect(() => () => inlineList.set(null), [inlineList])

    if (mode === 'inline') return null

    return (
      <SelectPage ref={ref} {...rest} style={drawn}>
        {children}
      </SelectPage>
    )
  }
)

SelectContent.displayName = 'XAUI.Tram.Select.Content'
