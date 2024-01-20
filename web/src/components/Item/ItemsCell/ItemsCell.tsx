import type { FindItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Items from 'src/components/Item/Items'

export const QUERY = gql`
  query FindItems {
    items {
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
    }
  }
`

export const Loading = () => null

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No items yet. '}
      <Link to={routes.newItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ items }: CellSuccessProps<FindItems>) => {
  return <Items items={items} />
}
