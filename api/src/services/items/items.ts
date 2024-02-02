import grabity from 'grabity'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { validateCategory, validateType } from 'src/lib/validate'

export const items: QueryResolvers['items'] = async () => {
  await checkAndMoveItems()
  return db.item.findMany()
}

export const itemsMaybe: QueryResolvers['items'] = async () => {
  await checkAndMoveItems()
  return db.item.findMany({ where: { category: 'maybe' } })
}

export const itemsKeep: QueryResolvers['items'] = async () => {
  await checkAndMoveItems()
  return db.item.findMany({ where: { category: 'keep' } })
}

export const item: QueryResolvers['item'] = ({ id }) => {
  return db.item.findUnique({
    where: { id },
  })
}

export const createItem: MutationResolvers['createItem'] = ({ input }) => {
  validateType(input.type)
  validateCategory(input.category)
  return db.item.create({
    data: input,
  })
}

export const updateItem: MutationResolvers['updateItem'] = ({ id, input }) => {
  validateType(input.type)
  return db.item.update({
    data: input,
    where: { id },
  })
}

export const deleteItem: MutationResolvers['deleteItem'] = ({ id }) => {
  return db.item.delete({
    where: { id },
  })
}

export const linkPreview: MutationResolvers['linkPreview'] = ({ url }) => {
  return grabity.grabIt(url)
}

async function checkAndMoveItems() {
  const items = await db.item.findMany()
  const today = new Date()
  for (const item of items) {
    if (item.returnTo) {
      const returnDate = new Date(item.returnDate)
      if (today > returnDate) {
        await db.item.update({
          where: { id: item.id },
          data: {
            category: item.returnTo,
            returnTo: null,
            returnDate: null,
          },
        })
      }
    }
  }
}
