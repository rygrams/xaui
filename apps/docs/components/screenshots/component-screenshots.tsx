import { AlertScreenshots } from './alert-screenshots'
import { AppBarScreenshots } from './app-bar-screenshots'
import { AutocompleteScreenshots } from './autocomplete-screenshots'
import { AvatarScreenshots } from './avatar-screenshots'
import { AvatarGroupScreenshots } from './avatar-group-screenshots'
import { BadgeScreenshots } from './badge-screenshots'
import { BottomSheetScreenshots } from './bottom-sheet-screenshots'
import { BottomTabBarScreenshots } from './bottom-tab-bar-screenshots'
import { ButtonScreenshots } from './button-screenshots'
import { CardScreenshots } from './card-screenshots'
import { CarouselScreenshots } from './carousel-screenshots'
import { CenterScreenshots } from './center-screenshots'
import { CheckboxScreenshots } from './checkbox-screenshots'
import { ChipScreenshots } from './chip-screenshots'
import { DateInputScreenshots } from './date-input-screenshots'
import { DatepickerScreenshots } from './datepicker-screenshots'
import { DateTimeInputScreenshots } from './datetime-input-screenshots'
import { DialogScreenshots } from './dialog-screenshots'
import { DrawerScreenshots } from './drawer-screenshots'
import { ExpansionPanelScreenshots } from './expansion-panel-screenshots'
import { FabScreenshots } from './fab-screenshots'
import { FabMenuScreenshots } from './fab-menu-screenshots'
import { FeatureDiscoveryScreenshots } from './feature-discovery-screenshots'
import { IndicatorScreenshots } from './indicator-screenshots'
import { InputScreenshots } from './input-screenshots'
import { InputTriggerScreenshots } from './input-trigger-screenshots'
import { ListScreenshots } from './list-screenshots'
import { MenuScreenshots } from './menu-screenshots'
import { MenuBoxScreenshots } from './menubox-screenshots'
import { NumberInputScreenshots } from './number-input-screenshots'
import { PagerScreenshots } from './pager-screenshots'
import { PickerScreenshots } from './picker-screenshots'
import { ProgressScreenshots } from './progress-screenshots'
import { RadioScreenshots } from './radio-screenshots'
import { SliderScreenshots } from './slider-screenshots'
import { SelectScreenshots } from './select-screenshots'
import { SnackbarScreenshots } from './snackbar-screenshots'
import { SnippetScreenshots } from './snippet-screenshots'
import { SurfaceScreenshots } from './surface-screenshots'
import { SwitchScreenshots } from './switch-screenshots'
import { OtpInputScreenshots } from './otp-input-screenshots'
import { TabsScreenshots } from './tabs-screenshots'
import { TextAreaScreenshots } from './textarea-screenshots'
import { SegmentButtonScreenshots } from './segment-button-screenshots'
import { StepperScreenshots } from './stepper-screenshots'
import { TimepickerScreenshots } from './timepicker-screenshots'
import { TypographyScreenshots } from './typography-screenshots'

const screenshotsMap: Record<string, React.FC> = {
  alert: AlertScreenshots,
  'app-bar': AppBarScreenshots,
  autocomplete: AutocompleteScreenshots,
  avatar: AvatarScreenshots,
  'avatar-group': AvatarGroupScreenshots,
  badge: BadgeScreenshots,
  'bottom-sheet': BottomSheetScreenshots,
  'bottom-tab-bar': BottomTabBarScreenshots,
  button: ButtonScreenshots,
  card: CardScreenshots,
  carousel: CarouselScreenshots,
  center: CenterScreenshots,
  checkbox: CheckboxScreenshots,
  chip: ChipScreenshots,
  'date-input': DateInputScreenshots,
  datepicker: DatepickerScreenshots,
  'datetime-input': DateTimeInputScreenshots,
  dialog: DialogScreenshots,
  drawer: DrawerScreenshots,
  'expansion-panel': ExpansionPanelScreenshots,
  fab: FabScreenshots,
  'fab-menu': FabMenuScreenshots,
  'feature-discovery': FeatureDiscoveryScreenshots,
  indicator: IndicatorScreenshots,
  input: InputScreenshots,
  'input-trigger': InputTriggerScreenshots,
  list: ListScreenshots,
  menu: MenuScreenshots,
  menubox: MenuBoxScreenshots,
  'number-input': NumberInputScreenshots,
  pager: PagerScreenshots,
  picker: PickerScreenshots,
  progress: ProgressScreenshots,
  radio: RadioScreenshots,
  select: SelectScreenshots,
  slider: SliderScreenshots,
  snackbar: SnackbarScreenshots,
  snippet: SnippetScreenshots,
  surface: SurfaceScreenshots,
  switch: SwitchScreenshots,
  'otp-input': OtpInputScreenshots,
  tabs: TabsScreenshots,
  textarea: TextAreaScreenshots,
  'segment-button': SegmentButtonScreenshots,
  stepper: StepperScreenshots,
  timepicker: TimepickerScreenshots,
  typography: TypographyScreenshots,
}

export const screenshotIds = new Set(Object.keys(screenshotsMap))

type ComponentScreenshotsProps = {
  componentId: string
}

export function ComponentScreenshots({ componentId }: ComponentScreenshotsProps) {
  const Screenshots = screenshotsMap[componentId]

  if (!Screenshots) return null

  return <Screenshots />
}
