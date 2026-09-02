import { describe, it, expect } from 'vitest'
import type {
  CarouselProps,
  CarouselLayout,
  CarouselCustomAppearance,
} from '../../../components/carousel'

type TestItem = { id: string; title: string }

describe('Carousel Types', () => {
  it('exports CarouselProps type with required fields', () => {
    const props: CarouselProps<TestItem> = {
      data: [{ id: '1', title: 'Item 1' }],
      renderItem: ({ item }) => item.title,
    }

    expect(props).toBeDefined()
    expect(props.data).toHaveLength(1)
    expect(props.renderItem).toBeDefined()
  })

  it('accepts all layout variants', () => {
    const layouts: CarouselLayout[] = [
      'multi-browse',
      'uncontained',
      'hero',
      'full-screen',
    ]

    layouts.forEach(layout => {
      const props: CarouselProps<TestItem> = {
        data: [],
        renderItem: ({ item }) => item.title,
        layout,
      }
      expect(props.layout).toBe(layout)
    })
  })

  it('accepts dimension props', () => {
    const props: CarouselProps<TestItem> = {
      data: [],
      renderItem: ({ item }) => item.title,
      itemWidth: 200,
      itemHeight: 250,
      itemSpacing: 12,
      contentPadding: 20,
    }

    expect(props.itemWidth).toBe(200)
    expect(props.itemHeight).toBe(250)
    expect(props.itemSpacing).toBe(12)
    expect(props.contentPadding).toBe(20)
  })

  it('accepts all radius options', () => {
    const radii: Array<CarouselProps<TestItem>['radius']> = [
      'none',
      'sm',
      'md',
      'lg',
      'full',
    ]

    radii.forEach(radius => {
      const props: CarouselProps<TestItem> = {
        data: [],
        renderItem: ({ item }) => item.title,
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts indicator and autoplay props', () => {
    const props: CarouselProps<TestItem> = {
      data: [],
      renderItem: ({ item }) => item.title,
      showIndicator: true,
      autoPlay: true,
      autoPlayInterval: 5000,
    }

    expect(props.showIndicator).toBe(true)
    expect(props.autoPlay).toBe(true)
    expect(props.autoPlayInterval).toBe(5000)
  })

  it('accepts initialIndex prop', () => {
    const props: CarouselProps<TestItem> = {
      data: [],
      renderItem: ({ item }) => item.title,
      initialIndex: 2,
    }

    expect(props.initialIndex).toBe(2)
  })

  it('accepts onActiveItemChange callback', () => {
    const handler = (_index: number) => {}

    const props: CarouselProps<TestItem> = {
      data: [],
      renderItem: ({ item }) => item.title,
      onActiveItemChange: handler,
    }

    expect(props.onActiveItemChange).toBeDefined()
  })

  it('accepts keyExtractor function', () => {
    const props: CarouselProps<TestItem> = {
      data: [{ id: '1', title: 'Test' }],
      renderItem: ({ item }) => item.title,
      keyExtractor: item => item.id,
    }

    expect(props.keyExtractor).toBeDefined()
    expect(props.keyExtractor!({ id: '1', title: 'Test' }, 0)).toBe('1')
  })

  it('accepts customAppearance prop', () => {
    const appearance: CarouselCustomAppearance = {
      container: { backgroundColor: '#fff' },
      item: { borderWidth: 1 },
      indicatorContainer: { paddingVertical: 16 },
      indicator: { backgroundColor: '#ccc' },
      activeIndicator: { backgroundColor: '#000' },
    }

    const props: CarouselProps<TestItem> = {
      data: [],
      renderItem: ({ item }) => item.title,
      customAppearance: appearance,
    }

    expect(props.customAppearance).toBeDefined()
    expect(props.customAppearance?.container?.backgroundColor).toBe('#fff')
    expect(props.customAppearance?.activeIndicator?.backgroundColor).toBe('#000')
  })

  it('renderItem receives item and index', () => {
    const items: TestItem[] = [
      { id: '1', title: 'First' },
      { id: '2', title: 'Second' },
    ]

    const props: CarouselProps<TestItem> = {
      data: items,
      renderItem: ({ item, index }) => `${index}-${item.title}`,
    }

    const result = props.renderItem({ item: items[0], index: 0 })
    expect(result).toBe('0-First')
  })
})
