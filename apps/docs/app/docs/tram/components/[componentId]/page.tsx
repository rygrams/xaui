import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ComponentDocPage,
  getComponentMetadata,
  getComponentStaticParams,
} from '@/components/docs/component-page'
import { getComponentById } from '@/lib/data/components'

type ComponentPageProps = {
  params: Promise<{ componentId: string }>
}

export function generateStaticParams() {
  return getComponentStaticParams('tram')
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { componentId } = await params
  return getComponentMetadata(componentId, 'tram')
}

export default async function TramComponentPage({ params }: ComponentPageProps) {
  const { componentId } = await params
  const component = getComponentById(componentId, 'tram')
  if (!component) notFound()

  return <ComponentDocPage component={component} />
}
