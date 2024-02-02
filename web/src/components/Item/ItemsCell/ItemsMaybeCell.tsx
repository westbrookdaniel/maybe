import type { FindItemsMaybe } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Items from 'src/components/Item/Items'
import AllEmpty from 'src/components/Empty/AllEmpty'

export const QUERY = gql`
  query FindItemsMaybe {
    itemsMaybe {
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
      category
      returnTo
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

export const Success = ({ itemsMaybe }: CellSuccessProps<FindItemsMaybe>) => {
  return <Items itemsMaybe={itemsMaybe} />
}
