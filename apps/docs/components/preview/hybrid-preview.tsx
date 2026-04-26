import { ContainerHybridPreview } from './container-hybrid-preview'
import { SizedBoxHybridPreview } from './sized-box-hybrid-preview'
import { ConstrainedBoxHybridPreview } from './constrained-box-hybrid-preview'
import { FractionallySizedBoxHybridPreview } from './fractionally-sized-box-hybrid-preview'
import { AspectRatioHybridPreview } from './aspect-ratio-hybrid-preview'

const hybridPreviewMap: Partial<Record<string, React.FC>> = {
  container: ContainerHybridPreview,
  'sized-box': SizedBoxHybridPreview,
  'constrained-box': ConstrainedBoxHybridPreview,
  'fractionally-sized-box': FractionallySizedBoxHybridPreview,
  'aspect-ratio': AspectRatioHybridPreview,
}

export const hybridPreviewIds = new Set(Object.keys(hybridPreviewMap))

type ComponentHybridPreviewProps = {
  componentId: string
}

export function ComponentHybridPreview({
  componentId,
}: ComponentHybridPreviewProps) {
  const Preview = hybridPreviewMap[componentId]
  if (!Preview) return null
  return <Preview />
}
