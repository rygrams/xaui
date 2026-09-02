import { describe, it, expect } from 'vitest'
import type {
  ListProps,
  ListItemProps,
  ListBuilderProps,
} from '../../../components/list'

describe('List Types', () => {
  it('exports ListProps type', () => {
    const props: ListProps = {
      children: null,
      selectionMode: 'single',
      selectedKeys: ['1'],
      defaultSelectedKeys: ['1'],
      showDivider: true,
      isPressable: true,
      isSelectable: true,
      themeColor: 'primary',
      size: 'md',
    }

    expect(props).toBeDefined()
    expect(props.selectionMode).toBe('single')
    expect(props.showDivider).toBe(true)
    expect(props.isPressable).toBe(true)
    expect(props.isSelectable).toBe(true)
  })

  it('accepts all selection modes', () => {
    const modes: Array<ListProps['selectionMode']> = ['single', 'multiple', 'none']

    modes.forEach(selectionMode => {
      const props: ListProps = {
        children: null,
        selectionMode,
      }
      expect(props.selectionMode).toBe(selectionMode)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<ListProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: ListProps = {
        children: null,
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all theme colors', () => {
    const colors: Array<ListProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: ListProps = {
        children: null,
        themeColor,
      }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts selectedKeys array', () => {
    const props: ListProps = {
      children: null,
      selectedKeys: ['1', '2', '3'],
    }
    expect(props.selectedKeys).toEqual(['1', '2', '3'])
  })

  it('accepts defaultSelectedKeys array', () => {
    const props: ListProps = {
      children: null,
      defaultSelectedKeys: ['1', '2'],
    }
    expect(props.defaultSelectedKeys).toEqual(['1', '2'])
  })

  it('accepts showDivider prop', () => {
    const props: ListProps = {
      children: null,
      showDivider: true,
    }
    expect(props.showDivider).toBe(true)
  })

  it('accepts isPressable prop', () => {
    const props: ListProps = {
      children: null,
      isPressable: false,
    }
    expect(props.isPressable).toBe(false)
  })

  it('accepts isSelectable prop', () => {
    const props: ListProps = {
      children: null,
      isSelectable: true,
    }
    expect(props.isSelectable).toBe(true)
  })

  it('accepts onSelectionChange callback', () => {
    const onSelectionChange = (_keys: string[]) => {}
    const props: ListProps = {
      children: null,
      onSelectionChange,
    }
    expect(props.onSelectionChange).toBe(onSelectionChange)
  })
})

describe('ListItem Types', () => {
  it('exports ListItemProps type', () => {
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Test Item',
      description: 'Description',
      isDisabled: false,
      isSelected: false,
    }

    expect(props).toBeDefined()
    expect(props.itemKey).toBe('1')
    expect(props.title).toBe('Test Item')
    expect(props.description).toBe('Description')
  })

  it('accepts itemKey prop', () => {
    const props: ListItemProps = {
      itemKey: 'unique-key',
      title: 'Item',
    }
    expect(props.itemKey).toBe('unique-key')
  })

  it('accepts string title', () => {
    const props: ListItemProps = {
      itemKey: '1',
      title: 'List Item',
    }
    expect(props.title).toBe('List Item')
  })

  it('accepts ReactNode title', () => {
    const customTitle = 'Custom'
    const props: ListItemProps = {
      itemKey: '1',
      title: customTitle,
    }
    expect(props.title).toBe(customTitle)
  })

  it('accepts string description', () => {
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      description: 'Item description',
    }
    expect(props.description).toBe('Item description')
  })

  it('accepts ReactNode description', () => {
    const customDesc = 'Custom Description'
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      description: customDesc,
    }
    expect(props.description).toBe(customDesc)
  })

  it('accepts startContent and endContent', () => {
    const startContent = 'S'
    const endContent = 'E'
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      startContent,
      endContent,
    }
    expect(props.startContent).toBe(startContent)
    expect(props.endContent).toBe(endContent)
  })

  it('accepts isDisabled prop', () => {
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      isDisabled: true,
    }
    expect(props.isDisabled).toBe(true)
  })

  it('accepts isSelected prop', () => {
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      isSelected: true,
    }
    expect(props.isSelected).toBe(true)
  })

  it('accepts onPress callback', () => {
    const onPress = () => {}
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      onPress,
    }
    expect(props.onPress).toBe(onPress)
  })

  it('accepts customAppearance styles', () => {
    const customAppearance = {
      container: { backgroundColor: 'red' },
      content: { padding: 10 },
      title: { fontSize: 18 },
      description: { fontSize: 12 },
    }
    const props: ListItemProps = {
      itemKey: '1',
      title: 'Item',
      customAppearance,
    }
    expect(props.customAppearance).toBe(customAppearance)
  })
})

describe('ListBuilder Types', () => {
  interface TestItem {
    id: string
    name: string
  }

  it('exports ListBuilderProps type', () => {
    const data: TestItem[] = [{ id: '1', name: 'Item 1' }]

    const props: ListBuilderProps<TestItem> = {
      data,
      keyExtractor: _item => _item.id,
      renderItem: _item => null,
      selectionMode: 'single',
      selectedKeys: ['1'],
      showDivider: true,
      isPressable: true,
      isSelectable: true,
      themeColor: 'primary',
      size: 'md',
    }

    expect(props).toBeDefined()
    expect(props.data).toEqual(data)
    expect(props.selectionMode).toBe('single')
    expect(props.showDivider).toBe(true)
  })

  it('accepts data array', () => {
    const data: TestItem[] = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ]

    const props: ListBuilderProps<TestItem> = {
      data,
      keyExtractor: _item => _item.id,
      renderItem: _item => null,
    }

    expect(props.data).toHaveLength(2)
  })

  it('accepts keyExtractor function', () => {
    const keyExtractor = (item: TestItem) => item.id

    const props: ListBuilderProps<TestItem> = {
      data: [],
      keyExtractor,
      renderItem: _item => null,
    }

    expect(props.keyExtractor({ id: '123', name: 'Test' }, 0)).toBe('123')
  })

  it('accepts renderItem function', () => {
    const renderItem = (item: TestItem) => item.name

    const props: ListBuilderProps<TestItem> = {
      data: [],
      keyExtractor: item => item.id,
      renderItem,
    }

    expect(props.renderItem({ id: '1', name: 'Test' }, 0)).toBe('Test')
  })

  it('accepts flatListProps', () => {
    const props: ListBuilderProps<TestItem> = {
      data: [],
      keyExtractor: _item => _item.id,
      renderItem: _item => null,
      flatListProps: {
        horizontal: true,
        showsVerticalScrollIndicator: false,
      },
    }

    expect(props.flatListProps?.horizontal).toBe(true)
    expect(props.flatListProps?.showsVerticalScrollIndicator).toBe(false)
  })
})
