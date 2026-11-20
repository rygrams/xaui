import { PageRoot } from './page'

export const Page = PageRoot

/**
 * What a screen drawn in a `Page` takes so that the `Page` is the only thing that moves:
 * the navigator's own push and pop animation off. Per screen, not on the whole navigator —
 * a screen that is not a `Page` keeps the navigator's animation.
 */
export const pageScreenOptions = { animation: 'none' } as const

export { usePageLeave } from './page.hook'
export { pagePose, recedePose } from './page.pose'
export type { PagePose, PoseOptions, RecedePose } from './page.pose'
export { pageRecipe } from './page.recipe'
export type { PageProps, PageSlot } from './page.type'
