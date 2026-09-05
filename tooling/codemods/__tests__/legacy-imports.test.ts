import { describe, expect, it } from 'vitest'
import { transformImports } from '../legacy-imports'

describe('transformImports', () => {
  it('rewrites a subpath import', () => {
    expect(transformImports("import { Button } from '@xaui/native/button'")).toBe(
      "import { Button } from '@xaui/native-legacy/button'"
    )
  })

  it('rewrites a bare import', () => {
    expect(transformImports('import x from "@xaui/native"')).toBe(
      'import x from "@xaui/native-legacy"'
    )
  })

  it('rewrites a require() call', () => {
    expect(transformImports("const { Card } = require('@xaui/native/card')")).toBe(
      "const { Card } = require('@xaui/native-legacy/card')"
    )
  })

  it('rewrites a re-export', () => {
    expect(transformImports("export * from '@xaui/native/dialog'")).toBe(
      "export * from '@xaui/native-legacy/dialog'"
    )
  })

  it('leaves the reserved v1 theme subpath untouched', () => {
    const source = "import { XAUIProvider } from '@xaui/native/theme'"
    expect(transformImports(source)).toBe(source)
  })

  it('leaves an already-migrated import untouched (idempotent)', () => {
    const source = "import { Button } from '@xaui/native-legacy/button'"
    expect(transformImports(source)).toBe(source)
  })

  it('leaves unrelated specifiers untouched', () => {
    const source = "import { View } from 'react-native'"
    expect(transformImports(source)).toBe(source)
  })

  it('rewrites every match in a file with several imports', () => {
    const source = [
      "import { Button } from '@xaui/native/button'",
      "import { Checkbox } from '@xaui/native/checkbox'",
      "import { View } from 'react-native'",
    ].join('\n')

    expect(transformImports(source)).toBe(
      [
        "import { Button } from '@xaui/native-legacy/button'",
        "import { Checkbox } from '@xaui/native-legacy/checkbox'",
        "import { View } from 'react-native'",
      ].join('\n')
    )
  })
})
