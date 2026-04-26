import { ContainerHybridPreview } from './container-hybrid-preview'
import { SizedBoxHybridPreview } from './sized-box-hybrid-preview'
import { ConstrainedBoxHybridPreview } from './constrained-box-hybrid-preview'
import { FractionallySizedBoxHybridPreview } from './fractionally-sized-box-hybrid-preview'
import { AspectRatioHybridPreview } from './aspect-ratio-hybrid-preview'
import { FlexHybridPreview } from './flex-hybrid-preview'
import { ExpandedHybridPreview } from './expanded-hybrid-preview'
import { WrapHybridPreview } from './wrap-hybrid-preview'
import { AlignHybridPreview } from './align-hybrid-preview'
import { PaddingHybridPreview } from './padding-hybrid-preview'

const hybridPreviewMap: Partial<Record<string, React.FC>> = {
  container: ContainerHybridPreview,
  'sized-box': SizedBoxHybridPreview,
  'constrained-box': ConstrainedBoxHybridPreview,
  'fractionally-sized-box': FractionallySizedBoxHybridPreview,
  'aspect-ratio': AspectRatioHybridPreview,
  flex: FlexHybridPreview,
  row: FlexHybridPreview,
  column: FlexHybridPreview,
  expanded: ExpandedHybridPreview,
  flexible: ExpandedHybridPreview,
  spacer: ExpandedHybridPreview,
  wrap: WrapHybridPreview,
  align: AlignHybridPreview,
  center: AlignHybridPreview,
  padding: PaddingHybridPreview,
  margin: PaddingHybridPreview,
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
