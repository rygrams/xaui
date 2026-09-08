import { BottomSheetContent } from '../bottom-sheet'
import { useTextField } from '../text-field'
import { TextFieldProvider } from '../text-field/text-field.context'
import {
  PhoneNumberFieldProvider,
  usePhoneNumberField,
} from './phone-number-field.context'
import type { PhoneNumberFieldContentProps } from './phone-number-field.type'

export function PhoneNumberFieldContent({
  children,
  ...props
}: PhoneNumberFieldContentProps) {
  const context = usePhoneNumberField()
  const field = useTextField()
  // Portal hosts render outside this subtree, so the slots need both contexts restored.
  return (
    <BottomSheetContent {...props}>
      <PhoneNumberFieldProvider value={context}>
        <TextFieldProvider value={field}>{children}</TextFieldProvider>
      </PhoneNumberFieldProvider>
    </BottomSheetContent>
  )
}
PhoneNumberFieldContent.displayName = 'XAUI.PhoneNumberField.Content'
