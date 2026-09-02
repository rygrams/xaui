import { describe, it, expect } from 'vitest'
import type { MenuProps, MenuPosition } from '../../../components/menu'

describe('Menu Types', () => {
  it('exports MenuProps type', () => {
    const trigger = 'Open'
    const props: MenuProps = {
      visible: false,
      trigger,
      position: 'bottom',
      maxHeight: 280,
      children: null,
    }

    expect(props).toBeDefined()
    expect(props.visible).toBe(false)
    expect(props.trigger).toBe(trigger)
    expect(props.position).toBe('bottom')
  })

  it('accepts visible prop', () => {
    const props: MenuProps = {
      visible: true,
      trigger: null,
      children: null,
    }
    expect(props.visible).toBe(true)
  })

  it('accepts trigger element', () => {
    const trigger = 'Menu'
    const props: MenuProps = {
      visible: false,
      trigger,
      children: null,
    }
    expect(props.trigger).toBe(trigger)
  })

  it('accepts position options', () => {
    const positions: MenuPosition[] = ['top', 'bottom']

    positions.forEach(position => {
      const props: MenuProps = {
        visible: false,
        trigger: null,
        position,
        children: null,
      }
      expect(props.position).toBe(position)
    })
  })

  it('accepts onDismiss callback', () => {
    const onDismiss = () => {}
    const props: MenuProps = {
      visible: true,
      trigger: null,
      onDismiss,
      children: null,
    }
    expect(props.onDismiss).toBe(onDismiss)
  })

  it('accepts onItemPress callback', () => {
    const onItemPress = (itemKey: string) => itemKey
    const props: MenuProps = {
      visible: true,
      trigger: null,
      onItemPress,
      children: null,
    }
    expect(props.onItemPress).toBe(onItemPress)
  })

  it('accepts children', () => {
    const children = 'Item'
    const props: MenuProps = {
      visible: false,
      trigger: null,
      children,
    }
    expect(props.children).toBe(children)
  })

  it('accepts customAppearance styles', () => {
    const customAppearance = {
      overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
      container: { borderRadius: 8 },
      content: { padding: 16 },
    }
    const props: MenuProps = {
      visible: false,
      trigger: null,
      customAppearance,
      children: null,
    }
    expect(props.customAppearance).toBe(customAppearance)
  })

  it('accepts maxHeight prop', () => {
    const props: MenuProps = {
      visible: false,
      trigger: null,
      maxHeight: 400,
      children: null,
    }
    expect(props.maxHeight).toBe(400)
  })

  it('uses default maxHeight when not provided', () => {
    const props: MenuProps = {
      visible: false,
      trigger: null,
      children: null,
    }
    expect(props.maxHeight).toBeUndefined()
  })
})
