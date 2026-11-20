'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

const loading = () => (
  <div className="flex min-h-[560px] items-center justify-center text-sm text-zinc-500">
    Loading the demo…
  </div>
)

export const tramDemoRegistry: Record<string, ComponentType> = {
  'accordion': dynamic(
    () => import('../../../demo/app/tram/accordion'),
    { loading, ssr: false }
  ),
  'alert': dynamic(
    () => import('../../../demo/app/tram/alert'),
    { loading, ssr: false }
  ),
  'app-bar': dynamic(
    () => import('../../../demo/app/tram/app-bar'),
    { loading, ssr: false }
  ),
  'charts': dynamic(
    () => import('../../../demo/app/tram/charts'),
    { loading, ssr: false }
  ),
  'autocomplete': dynamic(
    () => import('../../../demo/app/tram/autocomplete'),
    { loading, ssr: false }
  ),
  'avatar': dynamic(
    () => import('../../../demo/app/tram/avatar'),
    { loading, ssr: false }
  ),
  'badge': dynamic(
    () => import('../../../demo/app/tram/badge'),
    { loading, ssr: false }
  ),
  'bottom-sheet': dynamic(
    () => import('../../../demo/app/tram/bottom-sheet'),
    { loading, ssr: false }
  ),
  'button': dynamic(
    () => import('../../../demo/app/tram/button'),
    { loading, ssr: false }
  ),
  'calendar': dynamic(
    () => import('../../../demo/app/tram/calendar'),
    { loading, ssr: false }
  ),
  'card': dynamic(
    () => import('../../../demo/app/tram/card'),
    { loading, ssr: false }
  ),
  'carousel': dynamic(
    () => import('../../../demo/app/tram/carousel'),
    { loading, ssr: false }
  ),
  'checkbox': dynamic(
    () => import('../../../demo/app/tram/checkbox'),
    { loading, ssr: false }
  ),
  'chip': dynamic(
    () => import('../../../demo/app/tram/chip'),
    { loading, ssr: false }
  ),
  'close-button': dynamic(
    () => import('../../../demo/app/tram/close-button'),
    { loading, ssr: false }
  ),
  'color-picker': dynamic(
    () => import('../../../demo/app/tram/color-picker'),
    { loading, ssr: false }
  ),
  'combobox': dynamic(
    () => import('../../../demo/app/tram/combobox'),
    { loading, ssr: false }
  ),
  'date-picker': dynamic(
    () => import('../../../demo/app/tram/date-picker'),
    { loading, ssr: false }
  ),
  'date-time-picker': dynamic(
    () => import('../../../demo/app/tram/date-time-picker'),
    { loading, ssr: false }
  ),
  'dialog': dynamic(
    () => import('../../../demo/app/tram/dialog'),
    { loading, ssr: false }
  ),
  'divider': dynamic(
    () => import('../../../demo/app/tram/divider'),
    { loading, ssr: false }
  ),
  'dummy-field': dynamic(
    () => import('../../../demo/app/tram/dummy-field'),
    { loading, ssr: false }
  ),
  'empty-state': dynamic(
    () => import('../../../demo/app/tram/empty-state'),
    { loading, ssr: false }
  ),
  'fab': dynamic(
    () => import('../../../demo/app/tram/fab'),
    { loading, ssr: false }
  ),
  'field-group': dynamic(
    () => import('../../../demo/app/tram/field-group'),
    { loading, ssr: false }
  ),
  'input-otp': dynamic(
    () => import('../../../demo/app/tram/input-otp'),
    { loading, ssr: false }
  ),
  'jump-list': dynamic(
    () => import('../../../demo/app/tram/jump-list'),
    { loading, ssr: false }
  ),
  'list': dynamic(
    () => import('../../../demo/app/tram/list'),
    { loading, ssr: false }
  ),
  'list-box': dynamic(
    () => import('../../../demo/app/tram/list-box'),
    { loading, ssr: false }
  ),
  'mask-field': dynamic(
    () => import('../../../demo/app/tram/mask-field'),
    { loading, ssr: false }
  ),
  'menu': dynamic(
    () => import('../../../demo/app/tram/menu'),
    { loading, ssr: false }
  ),
  'morph-button': dynamic(
    () => import('../../../demo/app/tram/morph-button'),
    { loading, ssr: false }
  ),
  'number-field': dynamic(
    () => import('../../../demo/app/tram/number-field'),
    { loading, ssr: false }
  ),
  'number-pad': dynamic(
    () => import('../../../demo/app/tram/number-pad'),
    { loading, ssr: false }
  ),
  'number-stepper': dynamic(
    () => import('../../../demo/app/tram/number-stepper'),
    { loading, ssr: false }
  ),
  'panorama': dynamic(
    () => import('../../../demo/app/tram/panorama'),
    { loading, ssr: false }
  ),
  'phone-number-field': dynamic(
    () => import('../../../demo/app/tram/phone-number-field'),
    { loading, ssr: false }
  ),
  'pivot': dynamic(
    () => import('../../../demo/app/tram/pivot'),
    { loading, ssr: false }
  ),
  'progress-bar': dynamic(
    () => import('../../../demo/app/tram/progress-bar'),
    { loading, ssr: false }
  ),
  'radio': dynamic(
    () => import('../../../demo/app/tram/radio'),
    { loading, ssr: false }
  ),
  'range-calendar': dynamic(
    () => import('../../../demo/app/tram/range-calendar'),
    { loading, ssr: false }
  ),
  'rating': dynamic(
    () => import('../../../demo/app/tram/rating'),
    { loading, ssr: false }
  ),
  'search-field': dynamic(
    () => import('../../../demo/app/tram/search-field'),
    { loading, ssr: false }
  ),
  'select': dynamic(
    () => import('../../../demo/app/tram/select'),
    { loading, ssr: false }
  ),
  'skeleton': dynamic(
    () => import('../../../demo/app/tram/skeleton'),
    { loading, ssr: false }
  ),
  'slide-button': dynamic(
    () => import('../../../demo/app/tram/slide-button'),
    { loading, ssr: false }
  ),
  'slider': dynamic(
    () => import('../../../demo/app/tram/slider'),
    { loading, ssr: false }
  ),
  'spinner': dynamic(
    () => import('../../../demo/app/tram/spinner'),
    { loading, ssr: false }
  ),
  'stepper': dynamic(
    () => import('../../../demo/app/tram/stepper'),
    { loading, ssr: false }
  ),
  'surface': dynamic(
    () => import('../../../demo/app/tram/surface'),
    { loading, ssr: false }
  ),
  'switch': dynamic(
    () => import('../../../demo/app/tram/switch'),
    { loading, ssr: false }
  ),
  'table': dynamic(
    () => import('../../../demo/app/tram/table'),
    { loading, ssr: false }
  ),
  'tabs': dynamic(
    () => import('../../../demo/app/tram/tabs'),
    { loading, ssr: false }
  ),
  'text-area': dynamic(
    () => import('../../../demo/app/tram/text-area'),
    { loading, ssr: false }
  ),
  'text-field': dynamic(
    () => import('../../../demo/app/tram/text-field'),
    { loading, ssr: false }
  ),
  'tile': dynamic(
    () => import('../../../demo/app/tram/tile'),
    { loading, ssr: false }
  ),
  'time-picker': dynamic(
    () => import('../../../demo/app/tram/time-picker'),
    { loading, ssr: false }
  ),
  'timeline': dynamic(
    () => import('../../../demo/app/tram/timeline'),
    { loading, ssr: false }
  ),
  'toast': dynamic(
    () => import('../../../demo/app/tram/toast'),
    { loading, ssr: false }
  ),
  'toggle-button': dynamic(
    () => import('../../../demo/app/tram/toggle-button'),
    { loading, ssr: false }
  ),
  'typography': dynamic(
    () => import('../../../demo/app/tram/typography'),
    { loading, ssr: false }
  ),
  'view': dynamic(
    () => import('../../../demo/app/tram/view'),
    { loading, ssr: false }
  ),
  'wheel-picker': dynamic(
    () => import('../../../demo/app/tram/wheel-picker'),
    { loading, ssr: false }
  ),
}
