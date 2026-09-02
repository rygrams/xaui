import { describe, it, expect } from 'vitest'
import type {
  BottomTabBarProps,
  BottomTabBarItemProps,
  ExpoRouterBottomTabBarCompatibleProps,
} from '../../../components/bottom-tab-bar'

describe('BottomTabBar Types', () => {
  it('exports composable BottomTabBarProps type', () => {
    const props: BottomTabBarProps = {
      children: null,
      selectedKey: 'home',
      onSelectionChange: () => {},
      themeColor: 'primary',
      size: 'md',
    }

    expect(props).toBeDefined()
    expect(props.size).toBe('md')
  })

  it('exports expo compatible props type', () => {
    const props: ExpoRouterBottomTabBarCompatibleProps = {
      state: {
        index: 0,
        routes: [{ key: 'home-key', name: 'home' }],
      },
      descriptors: {
        'home-key': {
          options: {
            title: 'Home',
          },
        },
      },
      navigation: {
        emit: () => ({ defaultPrevented: false }),
        navigate: () => {},
      },
    }

    expect(props).toBeDefined()
    expect(props.state.routes[0]?.name).toBe('home')
  })

  it('exports BottomTabBarItemProps type', () => {
    const props: BottomTabBarItemProps = {
      itemKey: 'home',
      label: 'Home',
      icon: () => null,
      isSelected: true,
    }

    expect(props).toBeDefined()
    expect(props.itemKey).toBe('home')
  })
})
