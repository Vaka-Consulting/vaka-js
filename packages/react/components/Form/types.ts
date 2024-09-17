export interface FormProps<TFormData> {
  defaultValues?: Partial<TFormData>
  onSubmit: (data: TFormData) => void
  onPrevious?: () => void
}
