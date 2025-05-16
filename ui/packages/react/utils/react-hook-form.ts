import { ChangeEvent } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

/**
 * Handle checkbox change event and update field value accordingly
 * Fixes boolean as value from checkbox
 * @param event
 * @param checked
 * @param field
 */
export const updateCheckboxValue = <TFieldName extends string>(
  event: ChangeEvent<HTMLInputElement>,
  checked: boolean,
  field: ControllerRenderProps<FieldValues, TFieldName>,
) => {
  const value = checked ? event.target.value : ''

  field.onChange(value)
}

/**
 * Handle checkbox change event and update field value accordingly
 * Fixes boolean as value from checkbox
 * @param event
 * @param checked
 * @param field
 */
export const updateCheckboxValueInArr = <TFieldName extends string>(
  event: ChangeEvent<HTMLInputElement>,
  checked: boolean,
  field: ControllerRenderProps<FieldValues, TFieldName>,
) => {
  const value = checked
    ? [...field.value, event.target.value]
    : field.value.filter((value: string) => event.target.value !== value)

  field.onChange(value)
}
