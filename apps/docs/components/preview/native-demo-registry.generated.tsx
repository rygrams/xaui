'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

const loading = () => (
  <div className="flex min-h-[560px] items-center justify-center text-sm text-zinc-500">
    Loading the demo…
  </div>
)

export const nativeDemoRegistry: Record<string, ComponentType> = {
  'accordion': dynamic(
    () => import('../../../demo/app/accordion'),
    { loading, ssr: false }
  ),
  'agenda-calendar': dynamic(
    () => import('../../../demo/app/agenda-calendar'),
    { loading, ssr: false }
  ),
  'alert': dynamic(
    () => import('../../../demo/app/alert'),
    { loading, ssr: false }
  ),
  'charts': dynamic(
    () => import('../../../demo/app/charts'),
    { loading, ssr: false }
  ),
  'autocomplete': dynamic(
    () => import('../../../demo/app/autocomplete'),
    { loading, ssr: false }
  ),
  'avatar': dynamic(
    () => import('../../../demo/app/avatar'),
    { loading, ssr: false }
  ),
  'badge': dynamic(
    () => import('../../../demo/app/badge'),
    { loading, ssr: false }
  ),
  'bottom-sheet': dynamic(
    () => import('../../../demo/app/bottom-sheet'),
    { loading, ssr: false }
  ),
  'button': dynamic(
    () => import('../../../demo/app/button'),
    { loading, ssr: false }
  ),
  'calendar': dynamic(
    () => import('../../../demo/app/calendar'),
    { loading, ssr: false }
  ),
  'card': dynamic(
    () => import('../../../demo/app/card'),
    { loading, ssr: false }
  ),
  'carousel': dynamic(
    () => import('../../../demo/app/carousel'),
    { loading, ssr: false }
  ),
  'checkbox': dynamic(
    () => import('../../../demo/app/checkbox'),
    { loading, ssr: false }
  ),
  'chip': dynamic(
    () => import('../../../demo/app/chip'),
    { loading, ssr: false }
  ),
  'close-button': dynamic(
    () => import('../../../demo/app/close-button'),
    { loading, ssr: false }
  ),
  'color-picker': dynamic(
    () => import('../../../demo/app/color-picker'),
    { loading, ssr: false }
  ),
  'combobox': dynamic(
    () => import('../../../demo/app/combobox'),
    { loading, ssr: false }
  ),
  'date-picker': dynamic(
    () => import('../../../demo/app/date-picker'),
    { loading, ssr: false }
  ),
  'date-range-picker': dynamic(
    () => import('../../../demo/app/date-range-picker'),
    { loading, ssr: false }
  ),
  'date-time-picker': dynamic(
    () => import('../../../demo/app/date-time-picker'),
    { loading, ssr: false }
  ),
  'dialog': dynamic(
    () => import('../../../demo/app/dialog'),
    { loading, ssr: false }
  ),
  'divider': dynamic(
    () => import('../../../demo/app/divider'),
    { loading, ssr: false }
  ),
  'dummy-field': dynamic(
    () => import('../../../demo/app/dummy-field'),
    { loading, ssr: false }
  ),
  'empty-state': dynamic(
    () => import('../../../demo/app/empty-state'),
    { loading, ssr: false }
  ),
  'fab': dynamic(
    () => import('../../../demo/app/fab'),
    { loading, ssr: false }
  ),
  'field-group': dynamic(
    () => import('../../../demo/app/field-group'),
    { loading, ssr: false }
  ),
  'flip-card': dynamic(
    () => import('../../../demo/app/flip-card'),
    { loading, ssr: false }
  ),
  'input-otp': dynamic(
    () => import('../../../demo/app/input-otp'),
    { loading, ssr: false }
  ),
  'list': dynamic(
    () => import('../../../demo/app/list'),
    { loading, ssr: false }
  ),
  'list-box': dynamic(
    () => import('../../../demo/app/list-box'),
    { loading, ssr: false }
  ),
  'mask-field': dynamic(
    () => import('../../../demo/app/mask-field'),
    { loading, ssr: false }
  ),
  'menu': dynamic(
    () => import('../../../demo/app/menu'),
    { loading, ssr: false }
  ),
  'morph-button': dynamic(
    () => import('../../../demo/app/morph-button'),
    { loading, ssr: false }
  ),
  'number-field': dynamic(
    () => import('../../../demo/app/number-field'),
    { loading, ssr: false }
  ),
  'number-pad': dynamic(
    () => import('../../../demo/app/number-pad'),
    { loading, ssr: false }
  ),
  'number-stepper': dynamic(
    () => import('../../../demo/app/number-stepper'),
    { loading, ssr: false }
  ),
  'pager': dynamic(
    () => import('../../../demo/app/pager'),
    { loading, ssr: false }
  ),
  'phone-number-field': dynamic(
    () => import('../../../demo/app/phone-number-field'),
    { loading, ssr: false }
  ),
  'popover': dynamic(
    () => import('../../../demo/app/popover'),
    { loading, ssr: false }
  ),
  'progress-bar': dynamic(
    () => import('../../../demo/app/progress-bar'),
    { loading, ssr: false }
  ),
  'progress-circle': dynamic(
    () => import('../../../demo/app/progress-circle'),
    { loading, ssr: false }
  ),
  'radio': dynamic(
    () => import('../../../demo/app/radio'),
    { loading, ssr: false }
  ),
  'rating': dynamic(
    () => import('../../../demo/app/rating'),
    { loading, ssr: false }
  ),
  'scaffold': dynamic(
    () => import('../../../demo/app/scaffold'),
    { loading, ssr: false }
  ),
  'search-field': dynamic(
    () => import('../../../demo/app/search-field'),
    { loading, ssr: false }
  ),
  'segment': dynamic(
    () => import('../../../demo/app/segment'),
    { loading, ssr: false }
  ),
  'select': dynamic(
    () => import('../../../demo/app/select'),
    { loading, ssr: false }
  ),
  'skeleton': dynamic(
    () => import('../../../demo/app/skeleton'),
    { loading, ssr: false }
  ),
  'slider': dynamic(
    () => import('../../../demo/app/slider'),
    { loading, ssr: false }
  ),
  'snackbar': dynamic(
    () => import('../../../demo/app/snackbar'),
    { loading, ssr: false }
  ),
  'spinner': dynamic(
    () => import('../../../demo/app/spinner'),
    { loading, ssr: false }
  ),
  'stepper': dynamic(
    () => import('../../../demo/app/stepper'),
    { loading, ssr: false }
  ),
  'surface': dynamic(
    () => import('../../../demo/app/surface'),
    { loading, ssr: false }
  ),
  'switch': dynamic(
    () => import('../../../demo/app/switch'),
    { loading, ssr: false }
  ),
  'table': dynamic(
    () => import('../../../demo/app/table'),
    { loading, ssr: false }
  ),
  'tabs': dynamic(
    () => import('../../../demo/app/tabs'),
    { loading, ssr: false }
  ),
  'tag-group': dynamic(
    () => import('../../../demo/app/tag-group'),
    { loading, ssr: false }
  ),
  'text-area': dynamic(
    () => import('../../../demo/app/text-area'),
    { loading, ssr: false }
  ),
  'text-field': dynamic(
    () => import('../../../demo/app/text-field'),
    { loading, ssr: false }
  ),
  'time-field': dynamic(
    () => import('../../../demo/app/time-field'),
    { loading, ssr: false }
  ),
  'time-picker': dynamic(
    () => import('../../../demo/app/time-picker'),
    { loading, ssr: false }
  ),
  'timeline': dynamic(
    () => import('../../../demo/app/timeline'),
    { loading, ssr: false }
  ),
  'toast': dynamic(
    () => import('../../../demo/app/toast'),
    { loading, ssr: false }
  ),
  'toggle-button': dynamic(
    () => import('../../../demo/app/toggle-button'),
    { loading, ssr: false }
  ),
  'typography': dynamic(
    () => import('../../../demo/app/typography'),
    { loading, ssr: false }
  ),
  'view': dynamic(
    () => import('../../../demo/app/view'),
    { loading, ssr: false }
  ),
  'wheel-picker': dynamic(
    () => import('../../../demo/app/wheel-picker'),
    { loading, ssr: false }
  ),
  'widget': dynamic(
    () => import('../../../demo/app/widget'),
    { loading, ssr: false }
  ),
}
