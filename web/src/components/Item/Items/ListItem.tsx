import { relativeTimeTag } from 'src/lib/formatters'
import { FindItems } from 'types/graphql'
import { Link as LinkIcon } from 'iconoir-react'
import { Link, routes } from '@redwoodjs/router'
import Checkbox from 'src/components/Form/Checkbox'
import { motion } from 'framer-motion'

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
  switch (props.item.type) {
    case 'link':
      return <LinkItem {...props} />
    case 'note':
      return <NoteItem {...props} />
    case 'todo':
      return <TodoItem {...props} />
    default:
      throw new Error(`Unknown item type: ${props.item.type}`)
  }
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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
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

// <nav className="rw-table-actions">
//   <Link
//     to={routes.item({ id: item.id })}
//     title={'Show item ' + item.id + ' detail'}
//     className="rw-button rw-button-small"
//   >
//     Show
//   </Link>
//   <Link
//     to={routes.editItem({ id: item.id })}
//     title={'Edit item ' + item.id}
//     className="rw-button rw-button-small rw-button-blue"
//   >
//     Edit
//   </Link>
//   <button
//     type="button"
//     title={'Delete item ' + item.id}
//     className="rw-button rw-button-small rw-button-red"
//     onClick={() => onDeleteClick(item.id)}
//   >
//     Delete
//   </button>
// </nav>
