import type { Ref } from 'react'

export type PossibleRef<Element> = Ref<Element> | undefined
export type MergeableProps = Record<string, unknown>

export type AsChildProps = {
  asChild?: boolean
}
