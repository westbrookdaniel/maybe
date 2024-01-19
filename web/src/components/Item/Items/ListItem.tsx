import { relativeTimeTag, timeTag, truncate } from 'src/lib/formatters'
import { FindItems } from 'types/graphql'
import { Link as LinkIcon, Pin } from 'iconoir-react'
import { Link, routes } from '@redwoodjs/router'

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
  return <div className="bg-gray-100 p-6">{children}</div>
}

function LinkItem({ item }: Props) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <Container>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-4">
            <p className="underline decoration-gray-400">{item.title}</p>
            {!!item.description && (
              <p className="text-pretty">{truncate(item.description)}</p>
            )}
          </div>
          <LinkIcon width={24} />
        </div>
      </Container>
    </a>
  )
}

function NoteItem({ item }: Props) {
  return (
    <Link
      to={routes.item({ id: item.id })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Container>
        <div className="flex flex-col space-y-4">
          <p>{item.title}</p>
          {!!item.description && (
            <p className="text-pretty">{truncate(item.description)}</p>
          )}
        </div>
      </Container>
    </Link>
  )
}

function TodoItem({ item }: Props) {
  return (
    <div className="px-6 py-2">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={item.completed}
          className="checkbox mt-1"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex flex-col space-y-2">
          <p>{item.title}</p>
          {!!item.description && (
            <p className="text-pretty">{truncate(item.description)}</p>
          )}
          {!!item.dueDate && (
            <p
              className={
                'text-gray-400' +
                (new Date(item.dueDate).getTime() < new Date().getTime()
                  ? ' text-red-500'
                  : '')
              }
            >
              {relativeTimeTag(item.dueDate)}
            </p>
          )}
        </div>
      </div>
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
//
// <td>{truncate(item.id)}</td>
// <td>{truncate(item.title)}</td>
// <td>{truncate(item.description)}</td>
// <td>{truncate(item.type)}</td>
// <td>{timeTag(item.dueDate)}</td>
// <td>{timeTag(item.createdAt)}</td>
// <td>{timeTag(item.updatedAt)}</td>
// <td>{checkboxInputTag(item.completed)}</td>
// <td>{truncate(item.link)}</td>
// <td>{truncate(item.userId)}</td>
