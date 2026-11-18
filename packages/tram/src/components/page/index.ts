import { PageRoot } from './page'

export const Page = PageRoot

/**
 * What the navigator's screens take so that a `Page` is the only thing that moves: its
 * own push and pop animation off.
 */
export const pageScreenOptions = { animation: 'none' } as const

export { usePageLeave } from './page.hook'
export { pagePose, recedePose } from './page.pose'
export type { PagePose, PoseOptions, RecedePose } from './page.pose'
export { pageRecipe } from './page.recipe'
export type { PageProps, PageSlot } from './page.type'
