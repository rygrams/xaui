import { ContainerHybridPreview } from './container-hybrid-preview'
import { SizedBoxHybridPreview } from './sized-box-hybrid-preview'

const hybridPreviewMap: Partial<Record<string, React.FC>> = {
  container: ContainerHybridPreview,
  'sized-box': SizedBoxHybridPreview,
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
