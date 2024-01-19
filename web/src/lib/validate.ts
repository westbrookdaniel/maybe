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
