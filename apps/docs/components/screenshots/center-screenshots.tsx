export function CenterScreenshots() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Preview</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border-4 border-gray-200 bg-white p-4">
          <div className="mb-2 text-xs text-zinc-500">Basic center</div>
          <div className="flex h-40 items-center justify-center rounded-xl bg-sky-50">
            <span className="rounded-md bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm">
              Perfectly centered
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border-4 border-gray-200 bg-white p-4">
          <div className="mb-2 text-xs text-zinc-500">fullWidth + center</div>
          <div className="h-40 rounded-xl bg-slate-100">
            <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300">
              <span className="rounded-md bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm">
                Center full width
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
