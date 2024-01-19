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
} from '@redwoodjs/forms'

import type { EditItemById, UpdateItemInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { useAuth } from 'src/auth'
import { friendlyType, types } from 'src/lib/validate'

const formatDatetime = (value) => {
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
    <div className="rw-form-wrapper">
      <Form<FormItem> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.item?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.item?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <SelectField
          name="type"
          defaultValue={props.item?.type}
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

        <Label
          name="dueDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Due date
        </Label>

        <DatetimeLocalField
          name="dueDate"
          defaultValue={formatDatetime(props.item?.dueDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="dueDate" className="rw-field-error" />

        <Label
          name="completed"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Completed
        </Label>

        <CheckboxField
          name="completed"
          defaultChecked={props.item?.completed}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="completed" className="rw-field-error" />

        <Label
          name="link"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Link
        </Label>

        <TextField
          name="link"
          defaultValue={props.item?.link}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="link" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ItemForm
