import { describe, expect, it } from 'vitest'
import { mergeScreenOptions } from '../../../components/scaffold/scaffold.utils'
import type { ScaffoldScreenOptions } from '../../../components/scaffold/scaffold.type'

const OURS: ScaffoldScreenOptions = {
  headerStyle: { backgroundColor: '#ffffff' },
  headerTintColor: '#111111',
  headerTitleStyle: { color: '#111111', fontWeight: '600' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: '#ffffff' },
}

describe('mergeScreenOptions', () => {
  it('hands back the theme’s options when the navigator wrote none', () => {
    expect(mergeScreenOptions(OURS, undefined)).toEqual(OURS)
  })

  /** A copy, so a navigator mutating what it was given cannot reach the resolved object. */
  it('never hands back the object it was given', () => {
    expect(mergeScreenOptions(OURS, undefined)).not.toBe(OURS)
  })

  it('lets the app add a key without dropping the theme', () => {
    const headerRight = () => null
    const merged = mergeScreenOptions(OURS, { headerRight })

    expect(merged).toMatchObject({
      headerRight,
      headerTintColor: '#111111',
      headerShadowVisible: false,
    })
  })

  it('gives the app the last word on a key it wrote', () => {
    const merged = mergeScreenOptions(OURS, {
      headerShadowVisible: true,
      headerTintColor: '#7c3aed',
    })

    expect(merged).toMatchObject({
      headerShadowVisible: true,
      headerTintColor: '#7c3aed',
    })
  })

  /**
   * The reason this function exists. `mergeProps` would give the app's `headerStyle` the
   * whole key, and a navigator asked for a taller header would lose its ground with it.
   */
  it('blends a style key rather than replacing it', () => {
    const merged = mergeScreenOptions(OURS, { headerStyle: { height: 96 } })

    expect(merged).toMatchObject({
      headerStyle: { backgroundColor: '#ffffff', height: 96 },
    })
  })

  it('still lets the app override a style key value by value', () => {
    const merged = mergeScreenOptions(OURS, {
      headerStyle: { backgroundColor: '#000000' },
      headerTitleStyle: { fontWeight: '400' },
    })

    expect(merged).toMatchObject({
      headerStyle: { backgroundColor: '#000000' },
      headerTitleStyle: { color: '#111111', fontWeight: '400' },
    })
  })

  it('leaves the style keys the app did not write untouched', () => {
    const merged = mergeScreenOptions(OURS, { headerStyle: { height: 96 } })

    expect(merged).toMatchObject({
      headerTitleStyle: OURS.headerTitleStyle,
      contentStyle: OURS.contentStyle,
    })
  })

  /**
   * React Navigation calls the function form per route. Resolving it here would freeze
   * the first route's options onto every screen, so it stays a function.
   */
  describe('the function form', () => {
    it('stays a function, and merges what the call returns', () => {
      const theirs = ({ route }: Record<string, unknown>) => ({
        title: (route as { name: string }).name,
        headerStyle: { height: 64 },
      })

      const merged = mergeScreenOptions(OURS, theirs)
      expect(typeof merged).toBe('function')

      const resolved = (merged as (p: Record<string, unknown>) => unknown)({
        route: { name: 'index' },
      })

      expect(resolved).toMatchObject({
        title: 'index',
        headerStyle: { backgroundColor: '#ffffff', height: 64 },
        headerTintColor: '#111111',
      })
    })

    it('is called once per call, so each route gets its own options', () => {
      let calls = 0
      const merged = mergeScreenOptions(OURS, () => {
        calls += 1
        return { title: `route ${calls}` }
      }) as (p: Record<string, unknown>) => { title: string }

      expect(merged({}).title).toBe('route 1')
      expect(merged({}).title).toBe('route 2')
    })
  })
})
