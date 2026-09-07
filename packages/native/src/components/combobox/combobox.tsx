import { AutocompleteRoot } from '../autocomplete'
import type { ComboboxProps } from './combobox.type'

/**
 * A field you type in, over a list you must choose from.
 *
 * ```tsx
 * <Combobox onValueChange={setAnimal}>
 *   <Combobox.Trigger>
 *     <Combobox.Input placeholder="Chercher un animal…" />
 *     <Combobox.Indicator />
 *   </Combobox.Trigger>
 *   <Combobox.Overlay />
 *   <Combobox.Content>
 *     <Combobox.Item value="cat">Chat</Combobox.Item>
 *     <Combobox.Item value="dog">Chien</Combobox.Item>
 *     <Combobox.Empty>Aucun résultat</Combobox.Empty>
 *   </Combobox.Content>
 * </Combobox>
 * ```
 *
 * **It is the `Autocomplete` with the search moved into the trigger.** In an autocomplete
 * the control shows the chosen row and you type in a box inside the panel; here the field
 * *is* the trigger, and what you have typed is what you see. That is the ARIA combobox, and
 * it is the shape a form wants: one box on the line where a `TextField` would be, rather
 * than a button that opens a search.
 *
 * **The list is closed.** What is typed narrows the rows and never becomes the value — the
 * query goes with the panel, so closing without choosing puts the chosen row's label back
 * in the field. A combobox that kept the half-typed word would be a text field with a
 * dropdown, which is a different control and not this one.
 *
 * **The state is the `Autocomplete`'s, and so is the root** — literally the same function:
 * a value, an open panel, and a query narrowing the list is all either of them holds, and a
 * second copy of it would be a second thing to keep in step. What this component adds is
 * three slots; the panel, the rows and the empty line are the autocomplete's own objects,
 * so a row is a row whichever field opened it.
 *
 * The root renders **no node** — `ref`, `style` and the a11y props live on
 * `Combobox.Trigger`.
 */
export function ComboboxRoot(props: ComboboxProps) {
  // A wrapper rather than an alias, and the distinction is load-bearing: the slots below
  // are hung off this object with `Object.assign`, and hanging `Combobox.Trigger` off the
  // `Autocomplete`'s own function would overwrite `Autocomplete.Trigger` for everyone.
  return <AutocompleteRoot {...props} />
}

ComboboxRoot.displayName = 'XAUI.Combobox.Root'
