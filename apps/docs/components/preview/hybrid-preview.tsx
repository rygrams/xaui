import { AlertHybridPreview } from './alert-hybrid-preview'

const hybridPreviewMap: Partial<Record<string, React.FC>> = {
  alert: AlertHybridPreview,
}

export const hybridPreviewIds = new Set(Object.keys(hybridPreviewMap))

type ComponentHybridPreviewProps = {
  componentId: string
}

export function ComponentHybridPreview({ componentId }: ComponentHybridPreviewProps) {
  const Preview = hybridPreviewMap[componentId]
  if (!Preview) return null
  return <Preview />
}
