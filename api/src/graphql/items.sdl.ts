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
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int!): Item @requireAuth
  }

  input CreateItemInput {
    title: String!
    description: String
    type: String!
    dueDate: DateTime
    completed: Boolean
    link: String
    userId: String!
  }

  input UpdateItemInput {
    title: String
    description: String
    type: String
    dueDate: DateTime
    completed: Boolean
    link: String
    userId: String
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`
