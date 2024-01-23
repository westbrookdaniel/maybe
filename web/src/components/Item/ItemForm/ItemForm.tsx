import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  SelectField,
  DatetimeLocalField,
  CheckboxField,
  Submit,
  useWatch,
  TextAreaField,
} from '@redwoodjs/forms'

import type { EditItemById, UpdateItemInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { useAuth } from 'src/auth'
import { friendlyType, types } from 'src/lib/validate'
import { useState } from 'react'

const formatDatetime = (value: string) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormItem = NonNullable<EditItemById['item']>

interface ItemFormProps {
  item?: EditItemById['item']
  onSave: (data: UpdateItemInput, id?: FormItem['id']) => void
  error: RWGqlError
  loading: boolean
}

const defaultType = 'link'

const ItemForm = (props: ItemFormProps) => {
  const { userMetadata } = useAuth()

  const onSubmit = (data: FormItem) => {
    props.onSave(
      {
        ...data,
        userId: userMetadata.sub,
      },
      props?.item?.id
    )
  }

  return (
    <div className="rw-form-wrapper h-full">
      <Form<FormItem>
        onSubmit={onSubmit}
        error={props.error}
        className="flex h-full flex-col"
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <DynamicLinkField />

        <TextField
          name="title"
          placeholder="Title"
          defaultValue={props.item?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <DynamicTodoFields />

        <div className="mt-8">
          <Submit disabled={props.loading} className="button-primary w-full">
            Save
          </Submit>
        </div>

        <div className="flex-1" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <SelectField
          name="type"
          placeholder="Type"
          defaultValue={props.item?.type ?? defaultType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {friendlyType(type)}
            </option>
          ))}
        </SelectField>

        <FieldError name="type" className="rw-field-error" />
      </Form>
    </div>
  )
}

function DynamicTodoFields(props: { item?: EditItemById['item'] }) {
  const type = useWatch({ name: 'type' }) ?? defaultType
  const [date, setDate] = useState<string | undefined>(undefined)

  return (
    <>
      {type !== 'todo' && (
        <>
          <TextAreaField
            name="description"
            placeholder="Description"
            defaultValue={props.item?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <FieldError name="description" className="rw-field-error" />
        </>
      )}

      {type === 'todo' && (
        <>
          <DatetimeLocalField
            name="dueDate"
            placeholder="Due Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            defaultValue={formatDatetime(props.item?.dueDate)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="dueDate" className="rw-field-error" />
        </>
      )}
    </>
  )
}

function DynamicLinkField(props: { item?: EditItemById['item'] }) {
  const type = useWatch({ name: 'type' }) ?? defaultType
  const [link, setLink] = useState<string | undefined>(undefined)

  return (
    type === 'link' && (
      <>
        <TextField
          name="link"
          placeholder="Link"
          autoFocus
          value={link}
          onChange={(e) => setLink(e.target.value)}
          defaultValue={props.item?.link}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="link" className="rw-field-error" />
      </>
    )
  )
}

export default ItemForm
