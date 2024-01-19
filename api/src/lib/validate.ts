// This file is for validating semi-dynamic database fields

export function validateType(type: string) {
  switch (type) {
    case 'link':
    case 'note':
    case 'todo':
      return
    default:
      throw new Error(`Invalid type: ${type}`)
  }
}
