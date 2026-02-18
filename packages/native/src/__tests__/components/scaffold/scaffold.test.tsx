import { describe, it, expect } from 'vitest'
import type {
  ScaffoldProps,
  ScaffoldEvents,
  ScaffoldBodyProps,
  ScaffoldFabButtonProps,
  ScaffoldFooterProps,
  ScaffoldAppBarProps,
} from '../../../components/scaffold'

describe('Scaffold Types', () => {
  it('creates props with no required fields', () => {
    const props: ScaffoldProps = {}
    expect(props).toBeDefined()
  })

  it('accepts all optional props', () => {
    const props: ScaffoldProps = {
      appBar: null,
      footer: null,
      floatingAction: null,
      isLoading: true,
      isRefreshing: false,
      themeColor: 'primary',
      backgroundColor: '#ffffff',
      onRefresh: () => {},
      onScroll: () => {},
    }

    expect(props.isLoading).toBe(true)
    expect(props.isRefreshing).toBe(false)
    expect(props.themeColor).toBe('primary')
  })

  it('accepts all theme colors', () => {
    const colors: Array<ScaffoldProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: ScaffoldProps = { themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('exports ScaffoldEvents type', () => {
    const events: ScaffoldEvents = {
      onRefresh: () => {},
      onScroll: () => {},
    }
    expect(events.onRefresh).toBeDefined()
  })

  it('exports ScaffoldBodyProps type', () => {
    const props: ScaffoldBodyProps = {
      scrollable: true,
      isRefreshing: false,
      themeColor: 'primary',
      onRefresh: () => {},
    }
    expect(props.scrollable).toBe(true)
  })

  it('exports ScaffoldFooterProps type', () => {
    const props: ScaffoldFooterProps = {
      children: null,
    }
    expect(props).toBeDefined()
  })

  it('exports ScaffoldAppBarProps type', () => {
    const props: ScaffoldAppBarProps = {
      variant: 'docked',
      elevation: 1,
      themeColor: 'default',
    }
    expect(props.variant).toBe('docked')
    expect(props.elevation).toBe(1)
  })

  it('accepts both app bar variants', () => {
    const docked: ScaffoldAppBarProps = { variant: 'docked' }
    const floating: ScaffoldAppBarProps = { variant: 'floating' }

    expect(docked.variant).toBe('docked')
    expect(floating.variant).toBe('floating')
  })
})

describe('ScaffoldFabButton Types', () => {
  it('requires icon prop', () => {
    const props: ScaffoldFabButtonProps = { icon: null }
    expect(props).toBeDefined()
  })

  it('accepts all optional props', () => {
    const props: ScaffoldFabButtonProps = {
      icon: null,
      label: 'Add',
      size: 'regular',
      themeColor: 'primary',
      onPress: () => {},
    }
    expect(props.label).toBe('Add')
    expect(props.size).toBe('regular')
  })

  it('accepts small size', () => {
    const props: ScaffoldFabButtonProps = { icon: null, size: 'small' }
    expect(props.size).toBe('small')
  })

  it('accepts all theme colors', () => {
    const colors: Array<ScaffoldFabButtonProps['themeColor']> = [
      'primary',
      'secondary',
      'danger',
      'success',
    ]
    colors.forEach(themeColor => {
      const props: ScaffoldFabButtonProps = { icon: null, themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })
})
