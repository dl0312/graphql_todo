import { gql } from "apollo-boost";

export default {
  GET_TASKS: gql`
    {
      tasks {
        id
        content
        done
        createdAt
      }
    }
  `,
  CREATE_TASK: gql`
    mutation CreateTask($content: String!) {
      createTask(content: $content) {
        id
        content
        done
        createdAt
      }
    }
  `,
  UPDATE_TASK: gql`
    mutation UpdateTask($id: ID!, $content: String!, $done: Boolean!) {
      updateTask(id: $id, content: $content, done: $done) {
        id
        content
        done
        createdAt
      }
    }
  `,
  DELETE_TASK: gql`
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id)
    }
  `,
};
