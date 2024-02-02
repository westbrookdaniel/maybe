import { motion } from 'framer-motion'
import type { FindItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ListItem } from 'src/components/Item/Items/ListItem'
import { relativeTimeTag, timeTag } from 'src/lib/formatters'
import { friendlyCategory } from 'src/lib/validate'

const itemVariants = {
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    translateY: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  hidden: {
    opacity: 0,
    scale: 0.98,
    translateY: 20,
  },
}

const fadeInProps = (i: number) => ({
  custom: i,
  initial: 'hidden',
  animate: 'visible',
  variants: itemVariants,
  transition: { type: 'spring', stiffness: 400, damping: 17 },
})

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
      returnTo
      returnDate
      category
    }
  }
`

export const Loading = () => null

export const Empty = () => <div>Item not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ item }: CellSuccessProps<FindItemById>) => {
  return (
    <>
      <ListItem item={item} index={0} noTruncate noShow alwaysVisible />
      <motion.div
        className="mt-4 rounded-2xl bg-white p-6 text-gray-500"
        {...fadeInProps(1)}
      >
        <p>Currently in {friendlyCategory(item.category)}</p>
        {!!item.returnTo && !!item.returnDate && (
          <p>
            Returns to {friendlyCategory(item.returnTo)} in{' '}
            {relativeTimeTag(item.returnDate)} ({timeTag(item.returnDate)})
          </p>
        )}
      </motion.div>
    </>
  )
}
