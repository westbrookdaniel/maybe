import type { EditItemById, UpdateItemInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ItemForm from 'src/components/Item/ItemForm'
import { motion } from 'framer-motion'

export const QUERY = gql`
  query EditItemById($id: Int!) {
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
const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItemMutation($id: Int!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
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

export const Loading = () => null

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ item }: CellSuccessProps<EditItemById>) => {
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Updated')
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateItemInput, id: EditItemById['item']['id']) => {
    updateItem({ variables: { id, input } })
  }

  return (
    <motion.div className="rounded-2xl bg-white p-6" {...fadeInProps(0)}>
      <header className="">
        <h2 className="mb-8 text-2xl font-bold">Edit</h2>
      </header>
      <div className="">
        <ItemForm
          item={item}
          onSave={onSave}
          error={error}
          loading={loading}
          onCancel={() => navigate(routes.home())}
        />
      </div>
    </motion.div>
  )
}
