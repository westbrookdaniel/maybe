import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Item/ItemsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteItemMutationVariables, FindItems } from 'types/graphql'
import { ListItem } from './ListItem'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const ItemsList = ({ items }: FindItems) => {
  // const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
  //   onCompleted: () => {
  //     toast.success('Item deleted')
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  //   // This refetches the query on the list page. Read more about other ways to
  //   // update the cache over here:
  //   // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
  //   refetchQueries: [{ query: QUERY }],
  //   awaitRefetchQueries: true,
  // })

  // const onDeleteClick = (id: DeleteItemMutationVariables['id']) => {
  //   if (confirm('Are you sure you want to delete item ' + id + '?')) {
  //     deleteItem({ variables: { id } })
  //   }
  // }

  return (
    <div className="w-full space-y-4 flex flex-col px-4">
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemsList
