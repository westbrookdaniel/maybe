import { relativeTimeTag } from 'src/lib/formatters'
import { DeleteItemMutationVariables, FindItems } from 'types/graphql'
import { Link as LinkIcon, MoreVert } from 'iconoir-react'
import { Link, routes } from '@redwoodjs/router'
import Checkbox from 'src/components/Form/Checkbox'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/Dropdown/Dropdown'
import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { QUERY as ItemsQuery } from 'src/components/Item/ItemsCell'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const MotionLink = motion(Link)

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

interface Props {
  item: FindItems['items'][number]
  index: number
}

export function ListItem(props: Props) {
  let comp: React.ReactNode
  switch (props.item.type) {
    case 'link':
      comp = <LinkItem {...props} />
      break
    case 'note':
      comp = <NoteItem {...props} />
      break
    case 'todo':
      comp = <TodoItem {...props} />
      break
    default:
      throw new Error(`Unknown item type: ${props.item.type}`)
  }

  return <Wrapper item={props.item}>{comp}</Wrapper>
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white p-6">{children}</div>
}

function LinkItem({ item, index }: Props) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl"
      {...fadeInProps(index)}
    >
      <Container>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-4">
            <p className="underline decoration-gray-300">{item.title}</p>
            {!!item.description && (
              <p className="text-pretty">{item.description}</p>
            )}
          </div>
          <LinkIcon width={24} />
        </div>
      </Container>
    </motion.a>
  )
}

function NoteItem({ item, index }: Props) {
  return (
    <MotionLink
      to={routes.item({ id: item.id })}
      className="rounded-2xl"
      {...fadeInProps(index)}
    >
      <Container>
        <div className="flex flex-col space-y-4">
          <p>{item.title}</p>
          {!!item.description && (
            <p className="text-pretty">{item.description}</p>
          )}
        </div>
      </Container>
    </MotionLink>
  )
}

function TodoItem({ item, index }: Props) {
  const [c, onC] = React.useState(item.completed)
  return (
    <motion.div className="px-6 py-2" {...fadeInProps(index)}>
      <Checkbox checked={c} onChange={onC}>
        <Checkbox.Indicator />
        <Checkbox.Label>
          <div className="flex flex-col space-y-2">
            <p>{item.title}</p>
            {!!item.description && (
              <p className="text-pretty">{item.description}</p>
            )}
            {!!item.dueDate && (
              <p
                className={
                  'text-gray-400' +
                  (new Date(item.dueDate).getTime() < new Date().getTime() && !c
                    ? ' text-red-500'
                    : '')
                }
              >
                {relativeTimeTag(item.dueDate)}
              </p>
            )}
          </div>
        </Checkbox.Label>
      </Checkbox>
    </motion.div>
  )
}

const MotionDropdownMenuTrigger = motion(DropdownMenuTrigger)

function Wrapper({
  children,
  item,
}: {
  children: React.ReactNode
  item: Props['item']
}) {
  const [open, setOpen] = useState(false)

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: ItemsQuery }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteItemMutationVariables['id']) => {
    deleteItem({ variables: { id } })
  }

  return (
    <motion.div
      className="flex"
      initial="initial"
      animate={open ? 'animate' : 'initial'}
      whileHover="animate"
    >
      <div className="flex-grow">{children}</div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <MotionDropdownMenuTrigger
          className="flex items-center justify-center"
          variants={{
            initial: { opacity: 0, width: 0 },
            animate: { opacity: 1, width: 42 },
          }}
          transition={{ duration: 0.1, stiffness: 400, damping: 17 }}
        >
          <MoreVert className="h-6 w-6" />
        </MotionDropdownMenuTrigger>
        <DropdownMenuContent>
          {item.type !== 'todo' && (
            <DropdownMenuItem asChild>
              <Link
                to={routes.item({ id: item.id })}
                title={'Show item ' + item.id + ' detail'}
              >
                Show
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link
              to={routes.editItem({ id: item.id })}
              title={'Edit item ' + item.id}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              type="button"
              className="w-full text-left"
              title={'Delete item ' + item.id}
              onClick={() => onDeleteClick(item.id)}
            >
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
