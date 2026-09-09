import Link from 'next/link'
import type { PropTable } from '@/lib/component-doc'

type ApiTableProps = {
  table: PropTable
}

export function ApiTable({ table }: ApiTableProps) {
  return (
    <section className="space-y-3" id={table.name.toLowerCase()}>
      <h3 className="font-mono text-base font-semibold">{table.name}</h3>
      <p className="text-sm text-muted-foreground">
        The node&apos;s inherited React Native props apply too, and so do its{' '}
        <Link className="underline" href="/docs/style-props">
          style props
        </Link>{' '}
        — <code>padding</code>, <code>margin</code>, <code>width</code> and the rest.
      </p>
      {table.props.length ? (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Required</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {table.props.map(prop => (
                <tr className="border-b last:border-0" key={prop.name}>
                  <td className="px-4 py-3 align-top font-mono text-xs font-medium">
                    {prop.name}
                  </td>
                  <td className="max-w-sm px-4 py-3 align-top">
                    <code className="break-words text-xs text-foreground/80">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {prop.required ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {prop.description || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed px-4 py-3 text-sm text-muted-foreground">
          This slot adds nothing to the props of its React Native node.
        </div>
      )}
    </section>
  )
}
