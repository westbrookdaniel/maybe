import type { FindItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ListItem } from 'src/components/Item/Items/ListItem'

export const QUERY = gql`
  query FindItemById($id: Int!) {
    item: item(id: $id) {
      id
      title
      description
      type
      dueDate
      createdAt
      updatedAt
      completed
      link
      userId
      returnDate
    }
  }
`

export const Loading = () => null

export const Empty = () => <div>Item not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ item }: CellSuccessProps<FindItemById>) => {
  return <ListItem item={item} index={0} noTruncate />
}
