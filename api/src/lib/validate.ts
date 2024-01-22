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

export function validateCategory(category?: string) {
  // db has a default value of 'maybe'
  if (!category) return

  switch (category) {
    case 'maybe':
    case 'keep':
    case 'discard':
      return
    default:
      throw new Error(`Invalid category: ${category}`)
  }
}
