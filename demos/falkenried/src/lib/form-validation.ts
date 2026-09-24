/** Additional constraints; email syntax is checked by the native input validity API. */
export function validateDemoValue(value: string, minimum: number, maximum: number, required = true) {
  const length = value.trim().length;
  if (!length) return required ? 'required' : null;
  if (length < minimum) return 'short';
  if (length > maximum) return 'long';
  return null;
}
