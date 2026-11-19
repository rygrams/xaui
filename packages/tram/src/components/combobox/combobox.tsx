import { forwardRef } from 'react'
import type { View } from 'react-native'
import { SearchingRoot } from '../autocomplete/autocomplete'
import type { ComboboxProps } from './combobox.type'

/**
 * A field you type in, over a list you must choose from — the Native `Combobox`'s API,
 * drawn as the Tram `Select`'s box with the value replaced by the field being typed into.
 * What is typed unfolds the list under the row, inside the same line, and pushes what is
 * under the field; the letters each row matched are in the accent read as ink.
 *
 * ```tsx
 * <Combobox value={city} onValueChange={setCity}>
 *   <Combobox.Label>ville</Combobox.Label>
 *   <Combobox.Trigger>
 *     <Combobox.Input placeholder="chercher une ville" />
 *     <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
 *   </Combobox.Trigger>
 *   <Combobox.Overlay />
 *   <Combobox.Content>
 *     <Combobox.Item value="bko">Bamako</Combobox.Item>
 *     <Combobox.Item value="dkr">Dakar</Combobox.Item>
 *     <Combobox.Empty>aucune ville</Combobox.Empty>
 *   </Combobox.Content>
 * </Combobox>
 * ```
 *
 * **The list is closed**: what is typed narrows the rows and never becomes the value.
 * Closing without a choice puts the chosen row's label back in the field. It is always
 * unfolded in place, never a page — a page would cover the field being typed into. Past
 * five rows it scrolls.
 *
 * A wrapper rather than an alias: the slots are hung off this object, and hanging them
 * off the `Autocomplete`'s own function would overwrite its slots for everyone.
 */
export const ComboboxRoot = forwardRef<View, ComboboxProps>(
  function Combobox(props, ref) {
    return <SearchingRoot ref={ref} mode="inline" {...props} />
  }
)

ComboboxRoot.displayName = 'XAUI.Tram.Combobox.Root'
