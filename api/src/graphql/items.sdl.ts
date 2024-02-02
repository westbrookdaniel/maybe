export const schema = gql`
  type Item {
    id: Int!
    title: String!
    description: String
    type: String!
    dueDate: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    completed: Boolean!
    link: String
    userId: String!
    category: String!
    returnDate: DateTime
    returnTo: String
  }

  type Query {
    items: [Item!]! @requireAuth
    itemsMaybe: [Item!]! @requireAuth
    itemsKeep: [Item!]! @requireAuth
    itemsDiscard: [Item!]! @requireAuth
    item(id: Int!): Item @requireAuth
    linkPreview(url: String!): JSONObject! @requireAuth
  }

  input CreateItemInput {
    title: String!
    description: String
    type: String!
    dueDate: DateTime
    completed: Boolean
    link: String
    userId: String!
    category: String
    returnDate: DateTime
    returnTo: String
  }

  input UpdateItemInput {
    title: String
    description: String
    type: String
    dueDate: DateTime
    completed: Boolean
    link: String
    userId: String
    category: String
    returnDate: DateTime
    returnTo: String
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`
