import type { FindItems } from 'types/graphql'
import { ListItem } from './ListItem'

const ItemsList = ({ items }: FindItems) => {
  return (
    <div className="flex w-full flex-col space-y-4 px-4">
      {items.map((item, i) => (
        <ListItem key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}

export default ItemsList
