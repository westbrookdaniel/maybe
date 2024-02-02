import type { Prisma, Item } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: {
      data: {
        title: 'String',
        type: 'String',
        updatedAt: '2024-01-19T10:18:43.843Z',
        userId: 'String',
      },
    },
    two: {
      data: {
        title: 'String',
        type: 'String',
        updatedAt: '2024-01-19T10:18:43.844Z',
        userId: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Item, 'item'>
