import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { CreateItemInput } from 'types/graphql'
import { motion } from 'framer-motion'
import ItemForm from 'src/components/Item/ItemForm'
import { QUERY as ItemsQuery } from 'src/components/Item/ItemsCell'

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
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

const NewItemPage = () => {
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Created')
      navigate(routes.home())
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
    <motion.div className="rounded-2xl bg-white p-6" {...fadeInProps(0)}>
      <header className="">
        <h2 className="mb-8 text-2xl font-bold">New</h2>
      </header>
      <div className="">
        <ItemForm
          onSave={onSave}
          error={error}
          loading={loading}
          onCancel={() => navigate(routes.home())}
        />
      </div>
    </motion.div>
  )
}

export default NewItemPage
