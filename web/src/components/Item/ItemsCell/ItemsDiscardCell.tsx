import type { FindItemsKeep } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Items from 'src/components/Item/Items'
import AllEmpty from 'src/components/Empty/AllEmpty'

export const QUERY = gql`
  query FindItemsKeep {
    itemsKeep {
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

export const Empty = () => {
  return <AllEmpty />
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ itemsKeep }: CellSuccessProps<FindItemsKeep>) => {
  return <Items itemsMaybe={itemsKeep} />
}