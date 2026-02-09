'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  showCopy?: boolean
}

export function CodeBlock({
  code,
  language = 'tsx',
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {showCopy && (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white" />
          )}
        </button>
      )}
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} rounded-md p-4 overflow-x-auto text-sm`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
