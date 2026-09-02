/**
 * The slice of React Native the v1 sources touch, so pure modules stay testable under
 * jsdom. It grows one export at a time, with the code that needs it — a full stub would
 * mostly be untested fiction.
 *
 * `create` is the identity function on purpose: it makes a reference-stability test
 * assert what the style cache does, not what RN does with the object afterwards.
 */
export const StyleSheet = {
  create: <T extends Record<string, object>>(styles: T): T => styles,
}
