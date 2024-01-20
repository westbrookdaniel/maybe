import { relativeTimeTag } from 'src/lib/formatters'
import { FindItems } from 'types/graphql'
import { Link as LinkIcon } from 'iconoir-react'
import { Link, routes } from '@redwoodjs/router'
import Checkbox from 'src/components/Form/Checkbox'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

interface Props {
  item: FindItems['items'][number]
}

export function ListItem({ item }: Props) {
  switch (item.type) {
    case 'link':
      return <LinkItem item={item} />
    case 'note':
      return <NoteItem item={item} />
    case 'todo':
      return <TodoItem item={item} />
    default:
      throw new Error(`Unknown item type: ${item.type}`)
  }
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white p-6">{children}</div>
}

function LinkItem({ item }: Props) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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

function NoteItem({ item }: Props) {
  return (
    <MotionLink
      to={routes.item({ id: item.id })}
      className="rounded-2xl"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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

function TodoItem({ item }: Props) {
  const [c, onC] = React.useState(item.completed)
  return (
    <div className="px-6 py-2">
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
    </div>
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
