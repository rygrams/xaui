import { describe, expect, it } from 'vitest'
import type { SnippetProps } from '../../../components/snippet'

describe('Snippet Types', () => {
  it('exports SnippetProps type', () => {
    const props: SnippetProps = {
      value: 'npm install @xaui/native',
      variant: 'outlined',
      themeColor: 'primary',
      copyButtonPosition: 'top-right',
      copyLabel: 'Copy',
      copiedLabel: 'Copied',
      copyResetDelay: 1600,
      fontSize: 16,
      fontWeight: '600',
      fullWidth: true,
      isDisabled: false,
    }

    expect(props.value).toContain('@xaui/native')
    expect(props.variant).toBe('outlined')
    expect(props.copyButtonPosition).toBe('top-right')
    expect(props.fontSize).toBe(16)
    expect(props.fontWeight).toBe('600')
  })

  it('accepts all variants', () => {
    const variants: Array<SnippetProps['variant']> = [
      'outlined',
      'flat',
      'light',
    ]

    variants.forEach(variant => {
      const props: SnippetProps = { value: 'echo hello', variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all theme colors', () => {
    const colors: Array<SnippetProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: SnippetProps = { value: 'echo hello', themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts all copy button positions', () => {
    const positions: Array<SnippetProps['copyButtonPosition']> = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ]

    positions.forEach(copyButtonPosition => {
      const props: SnippetProps = {
        value: 'echo hello',
        copyButtonPosition,
      }

      expect(props.copyButtonPosition).toBe(copyButtonPosition)
    })
  })
})
