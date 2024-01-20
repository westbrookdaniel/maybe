export const types = ['link', 'note', 'todo']

export function friendlyType(type: string) {
  switch (type) {
    case 'link':
      return 'Link'
    case 'note':
      return 'Note'
    case 'todo':
      return 'Todo'
    default:
      return 'Unknown'
  }
}

export const categories = ['maybe', 'keep', 'discard']

export function friendlyCategory(category: string) {
  switch (category) {
    case 'maybe':
      return 'Maybe'
    case 'keep':
      return 'Keep'
    case 'discard':
      return 'Discard'
    default:
      return 'Unknown'
  }
}
