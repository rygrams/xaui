declare const __DEV__: boolean

/**
 * The one sanctioned console call in the package, and the one place the `__DEV__` guard
 * is written — a warning that survives into a release bundle is noise in someone else's
 * app, and repeating the guard is how one eventually gets forgotten.
 *
 * For a mistake the code can carry on from. Anything that leaves a component in an
 * unusable state throws instead, with a name.
 */
export function warnDev(message: string): void {
  if (typeof __DEV__ !== 'undefined' && !__DEV__) return
  console.warn(`XAUI: ${message}`)
}
