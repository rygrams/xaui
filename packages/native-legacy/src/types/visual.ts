export type ShadowConfig = {
  color?: string
  offset?: { x: number; y: number }
  blur?: number
  spread?: number
  opacity?: number
  elevation?: number
}

export type ClipBehavior =
  | 'none'
  | 'hardEdge'
  | 'antiAlias'
  | 'antiAliasWithSaveLayer'
