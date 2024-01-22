import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { motion } from 'framer-motion'
import { Plus } from 'iconoir-react'
import { useState } from 'react'
import Drawer from 'src/components/Drawer/Drawer'
import { QUERY as ItemsQuery } from 'src/components/Item/ItemsCell'

import ItemForm from 'src/components/Item/ItemForm'

import type { CreateItemInput } from 'types/graphql'

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`

const itemVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    translateY: 0,
  },
  hidden: {
    opacity: 0,
    scale: 0.98,
    translateY: 20,
  },
}

const fadeInProps = {
  initial: 'hidden',
  animate: 'visible',
  variants: itemVariants,
  transition: { type: 'spring', stiffness: 400, damping: 17 },
}

const NewItemButton = () => {
  const [open, setOpen] = useState(false)

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item created')
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: ItemsQuery }],
  })

  const onSave = (input: CreateItemInput) => {
    createItem({ variables: { input } })
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={
        <motion.button
          className="button-primary fixed bottom-12 left-[calc(50vw-18px)] rounded-full p-2"
          {...fadeInProps}
        >
          <Plus width={24} height={24} />
        </motion.button>
      }
      content={
        <div className="pt-4">
          <ItemForm onSave={onSave} loading={loading} error={error} />
        </div>
      }
    />
  )
}

export default NewItemButton
