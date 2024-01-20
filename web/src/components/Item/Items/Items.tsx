import type { FindItems } from 'types/graphql'
import { ListItem } from './ListItem'

// const DELETE_ITEM_MUTATION = gql`
//   mutation DeleteItemMutation($id: Int!) {
//     deleteItem(id: $id) {
//       id
//     }
//   }
// `

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
    <div className="flex w-full flex-col space-y-4 px-4">
      {items.map((item, i) => (
        <ListItem key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}

export default ItemsList
