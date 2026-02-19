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
import { CheckboxScreenshots } from './checkbox-screenshots'
import { ChipScreenshots } from './chip-screenshots'
import { DatepickerScreenshots } from './datepicker-screenshots'
import { DialogScreenshots } from './dialog-screenshots'
import { DrawerScreenshots } from './drawer-screenshots'
import { ExpansionPanelScreenshots } from './expansion-panel-screenshots'

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
  checkbox: CheckboxScreenshots,
  chip: ChipScreenshots,
  datepicker: DatepickerScreenshots,
  dialog: DialogScreenshots,
  drawer: DrawerScreenshots,
  'expansion-panel': ExpansionPanelScreenshots,
}

type ComponentScreenshotsProps = {
  componentId: string
}

export function ComponentScreenshots({ componentId }: ComponentScreenshotsProps) {
  const Screenshots = screenshotsMap[componentId]

  if (!Screenshots) return null

  return <Screenshots />
}
