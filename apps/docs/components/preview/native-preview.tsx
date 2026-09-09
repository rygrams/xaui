'use client'

import dynamic from 'next/dynamic'

type NativePreviewProps = {
  componentId: string
  demoId: string
}

const NativePreviewClient = dynamic(
  async () => {
    const reactNativeGlobal = globalThis as typeof globalThis & {
      __DEV__?: boolean
    }

    reactNativeGlobal.__DEV__ = process.env.NODE_ENV !== 'production'

    const previewModule = await import('./native-preview-client')
    return previewModule.NativePreviewClient
  },
  {
    ssr: false,
    loading: () => (
      <div className="native-preview rounded-2xl border p-6">
        <div className="mx-auto aspect-[9/19.25] w-full max-w-[320px] animate-pulse rounded-[2.25rem] bg-zinc-900" />
      </div>
    ),
  }
)

export function NativePreview(props: NativePreviewProps) {
  return <NativePreviewClient {...props} />
}
