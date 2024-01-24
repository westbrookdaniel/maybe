import type { FindItemsDiscard } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AllEmpty from 'src/components/Empty/AllEmpty'
import Items from 'src/components/Item/Items'

export const QUERY = gql`
  query FindItemsDiscard {
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

export const Success = ({ itemsKeep }: CellSuccessProps<FindItemsDiscard>) => {
  return <Items itemsMaybe={itemsKeep} />
}
