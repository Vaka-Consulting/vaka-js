/**
 * Check if something is a valid enum value
 * @param something
 * @param enumObject
 */
export const isEnumValue = <T extends { [k: string]: string }>(
  something: any,
  enumObject: T,
): something is T[keyof T] => typeof something === 'string' && Object.values(enumObject).includes(something)
