import {
  Form,
  FormError,
  Label,
  TextField,
  SelectField,
  DatetimeLocalField,
  FieldError,
  Submit,
  useWatch,
  TextAreaField,
  Controller,
  useFormContext,
} from '@redwoodjs/forms'

import type { EditItemById, UpdateItemInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { useAuth } from 'src/auth'
import { friendlyType, types } from 'src/lib/validate'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'src/components/Carousel/Carousel'
import { relativeTimeTag } from 'src/lib/formatters'

const formatDatetime = (value: string) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormItem = NonNullable<EditItemById['item']>

interface ItemFormProps {
  item?: EditItemById['item']
  onSave: (data: UpdateItemInput, id?: FormItem['id']) => void
  onCancel: () => void
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
        category: 'keep',
        returnTo: 'maybe',
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

        <DynamicLinkField item={props.item} />

        <TextField
          name="title"
          placeholder="Title"
          defaultValue={props.item?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <DynamicTodoFields item={props.item} />

        <ReturnDateField item={props.item} />

        <div className="mt-8 flex items-center space-x-4">
          <Label
            name="type"
            className="rw-label !mt-2"
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
        </div>

        <FieldError name="type" className="rw-field-error" />

        <div className="mt-8 space-y-2">
          <Submit disabled={props.loading} className="button-primary w-full">
            Save
          </Submit>
          <button
            type="button"
            className="button w-full"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  )
}

function DynamicTodoFields(props: { item?: EditItemById['item'] }) {
  const type = useWatch({ name: 'type' }) ?? props.item?.type ?? defaultType
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
          />

          <FieldError name="dueDate" className="rw-field-error" />
        </>
      )}
    </>
  )
}

function DynamicLinkField(props: { item?: EditItemById['item'] }) {
  const type = useWatch({ name: 'type' }) ?? props.item?.type ?? defaultType
  const [link, setLink] = useState<string | undefined>(undefined)

  // TODO once you paste a link in this it should try and
  // pull the info for the rest of the form if empty

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

function ReturnDateField(props: { item?: EditItemById['item'] }) {
  const returnDate = useWatch({ name: 'returnDate' }) ?? props.item?.returnDate
  return (
    <>
      {props.item?.returnDate ? (
        <>
          <label className="rw-label">Return Date</label>

          <DatetimeLocalField
            name="returnDate"
            placeholder="Return Date"
            defaultValue={formatDatetime(props.item?.returnDate)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          {!!returnDate && (
            <p className="mt-2 text-sm text-gray-500">
              Returns {relativeTimeTag(returnDate)}
            </p>
          )}
        </>
      ) : (
        <CustomReturnField item={props.item} />
      )}

      <FieldError name="returnDate" className="rw-field-error" />
    </>
  )
}

function CustomReturnField(props: { item?: EditItemById['item'] }) {
  const [api, setApi] = useState<CarouselApi>()
  const { setValue } = useFormContext()

  const items = [
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'next-month', label: 'Next Month' },
    { value: 'next-year', label: 'Next Year' },
  ]

  function set(n: number) {
    const item = items[n].value
    // Get date relative to today
    const date = new Date()
    switch (item) {
      case 'tomorrow':
        date.setDate(date.getDate() + 1)
        break
      case 'next-week':
        date.setDate(date.getDate() + 7)
        break
      case 'next-month':
        date.setMonth(date.getMonth() + 1)
        break
      case 'next-year':
        date.setFullYear(date.getFullYear() + 1)
        break
    }
    setValue('returnDate', date.toISOString())
  }

  useEffect(() => {
    if (!api) {
      return
    }

    set(api.selectedScrollSnap())

    api.on('select', () => {
      set(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <>
      <Controller
        name="returnDate"
        defaultValue={formatDatetime(props.item?.returnDate)}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <input
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            type="hidden"
            ref={ref}
          />
        )}
      />
      <Carousel className="ml-12 mr-12 mt-10" setApi={setApi}>
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={i}>
              <div className="p-1">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-100 p-6 p-6">
                  <span className="pb-2 pt-2">Remind Me</span>
                  <span className="pb-2 text-2xl font-semibold">
                    {item.label}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}

export default ItemForm
