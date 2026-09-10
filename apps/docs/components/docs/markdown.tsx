import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownProps = {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  if (!children.trim()) return null

  return (
    <div className="doc-markdown min-w-0 text-[0.95rem] leading-7 text-foreground/90">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
