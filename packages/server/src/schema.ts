import { gql } from "apollo-server";

// The GraphQL schema
export const typeDefs = gql`
  type Task {
    id: ID!
    content: String!
    done: Boolean!
    createdAt: String
  }
  type Query {
    tasks: [Task!]
    task(id: ID!): Task!
  }
  type Mutation {
    createTask(content: String!): Task!
    updateTask(id: ID!, content: String, done: Boolean): Task!
    deleteTask(id: ID!): Boolean!
    deleteAllTasks: Boolean!
  }
`;
