/**
 * The slice of React Native the v1 sources touch, so pure modules stay testable under
 * jsdom. It grows one export at a time, with the code that needs it — a full stub would
 * mostly be untested fiction.
 *
 * `create` is the identity function on purpose: it makes a reference-stability test
 * assert what the style cache does, not what RN does with the object afterwards.
 *
 * `flatten` is RN's own contract instead, because that is what is being asserted through
 * it: a nested list collapsed left to right, falsy entries skipped, the last value of a
 * key winning. `create` being the identity is what lets it stay this short — there is no
 * registered id to look up.
 */
export const StyleSheet = {
  create: <T extends Record<string, object>>(styles: T): T => styles,

  flatten: (style?: unknown): Record<string, unknown> => {
    if (!style) return {}
    if (!Array.isArray(style)) return style as Record<string, unknown>

    return style.reduce<Record<string, unknown>>(
      (flat, entry) => Object.assign(flat, StyleSheet.flatten(entry)),
      {}
    )
  },
}

/**
 * `OS` is `'ios'` because a value has to be picked, not because anything asserts it — the
 * only source reading it is the theme's `mono` family. A test that starts to care about
 * the branch should set it for itself rather than depend on this default.
 */
export const Platform = { OS: 'ios' as const }
