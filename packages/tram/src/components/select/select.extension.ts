import { createContext } from 'react'

/**
 * What a field built on the `Select` asks of it beyond the `Select`'s own props: the
 * `Autocomplete` and the `Combobox` are the same box, the same rows and the same page,
 * searched. They provide this **around** a `SelectRoot`, which folds it into the context
 * every slot reads; a plain `Select` has no provider and gets the defaults.
 *
 * A context rather than props on `SelectRoot`, which is public: these are not choices a
 * `Select` user has.
 */
export type SelectExtension = {
  /** What has been typed: the rows write the letters it matched in the accent. */
  query: string
  /**
   * The field's row stays and the list unfolds under it, instead of laid over it — the
   * `Combobox`, whose row is the field being typed into.
   */
  keepsRow: boolean
}

export const NO_EXTENSION: SelectExtension = { query: '', keepsRow: false }

export const SelectExtensionContext = createContext<SelectExtension>(NO_EXTENSION)
