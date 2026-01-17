import { describe, it, expect } from 'vitest'
import type { SidebarProps } from '../sidebar-types'

describe('Sidebar Types', () => {
  it('exports SidebarProps type', () => {
    const props: SidebarProps = {
      children: null,
      position: 'left',
      width: 280,
      overlayOpacity: 0.5,
      themeColor: 'default',
      isOpen: false,
      enableSwipeToClose: false,
    }

    expect(props).toBeDefined()
    expect(props.position).toBe('left')
    expect(props.width).toBe(280)
    expect(props.themeColor).toBe('default')
  })

  it('accepts all theme colors', () => {
    const colors: Array<SidebarProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: SidebarProps = {
        children: null,
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all position options', () => {
    const positions: Array<SidebarProps['position']> = ['left', 'right']

    positions.forEach((position) => {
      const props: SidebarProps = {
        children: null,
        position,
      }
      expect(props.position).toBe(position)
    })
  })

  it('accepts boolean props', () => {
    const props: SidebarProps = {
      children: null,
      isOpen: true,
      enableSwipeToClose: true,
    }

    expect(props.isOpen).toBe(true)
    expect(props.enableSwipeToClose).toBe(true)
  })

  it('accepts width prop', () => {
    const propsWithCustomWidth: SidebarProps = {
      children: null,
      width: 320,
    }

    const propsWithDefaultWidth: SidebarProps = {
      children: null,
    }

    expect(propsWithCustomWidth.width).toBe(320)
    expect(propsWithDefaultWidth.width).toBeUndefined()
  })

  it('accepts overlayOpacity prop', () => {
    const props: SidebarProps = {
      children: null,
      overlayOpacity: 0.7,
    }

    expect(props.overlayOpacity).toBe(0.7)
  })

  it('accepts optional trigger', () => {
    const propsWithTrigger: SidebarProps = {
      children: null,
      trigger: null,
    }

    const propsWithoutTrigger: SidebarProps = {
      children: null,
    }

    expect(propsWithTrigger.trigger).toBeDefined()
    expect(propsWithoutTrigger.trigger).toBeUndefined()
  })

  it('accepts onClose handler', () => {
    const handler = () => {
      expect(true).toBe(true)
    }

    const props: SidebarProps = {
      children: null,
      onClose: handler,
    }

    expect(props.onClose).toBeDefined()
    props.onClose?.()
  })

  it('accepts onOpenChange handler', () => {
    const handler = (isOpen: boolean) => {
      expect(typeof isOpen).toBe('boolean')
    }

    const props: SidebarProps = {
      children: null,
      onOpenChange: handler,
    }

    expect(props.onOpenChange).toBeDefined()
    props.onOpenChange?.(true)
  })

  it('accepts custom styles', () => {
    const props: SidebarProps = {
      children: null,
      style: {
        backgroundColor: '#ffffff',
        padding: 20,
      },
      overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    }

    expect(props.style).toBeDefined()
    expect(props.overlayStyle).toBeDefined()
    expect(props.style?.backgroundColor).toBe('#ffffff')
    expect(props.overlayStyle?.backgroundColor).toBe('rgba(0, 0, 0, 0.8)')
  })

  it('has correct default values', () => {
    const props: SidebarProps = {
      children: null,
    }

    expect(props.position).toBeUndefined()
    expect(props.width).toBeUndefined()
    expect(props.overlayOpacity).toBeUndefined()
    expect(props.themeColor).toBeUndefined()
    expect(props.isOpen).toBeUndefined()
    expect(props.enableSwipeToClose).toBeUndefined()
  })

  it('allows combining multiple props', () => {
    const props: SidebarProps = {
      children: null,
      trigger: null,
      position: 'right',
      width: 300,
      overlayOpacity: 0.6,
      themeColor: 'primary',
      isOpen: true,
      enableSwipeToClose: true,
      onClose: () => {},
      onOpenChange: (_isOpen) => {},
      style: { padding: 10 },
      overlayStyle: { backgroundColor: '#000' },
    }

    expect(props.position).toBe('right')
    expect(props.width).toBe(300)
    expect(props.overlayOpacity).toBe(0.6)
    expect(props.themeColor).toBe('primary')
    expect(props.isOpen).toBe(true)
    expect(props.enableSwipeToClose).toBe(true)
  })

  it('requires children prop', () => {
    const props: SidebarProps = {
      children: null,
    }

    expect(props.children).toBeDefined()
  })

  it('onOpenChange receives boolean for open state', () => {
    let receivedValue: boolean | undefined

    const handler = (isOpen: boolean) => {
      receivedValue = isOpen
    }

    const props: SidebarProps = {
      children: null,
      onOpenChange: handler,
    }

    props.onOpenChange?.(true)
    expect(receivedValue).toBe(true)

    props.onOpenChange?.(false)
    expect(receivedValue).toBe(false)
  })

  it('position left is a valid option', () => {
    const props: SidebarProps = {
      children: null,
      position: 'left',
    }

    expect(props.position).toBe('left')
  })

  it('position right is a valid option', () => {
    const props: SidebarProps = {
      children: null,
      position: 'right',
    }

    expect(props.position).toBe('right')
  })
})
