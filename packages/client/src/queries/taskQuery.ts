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
  UPDATE_TASK: gql`
    mutation AddTodo($id: ID!, $content: String!, $done: Boolean!) {
      updateTask(id: $id, content: $content, done: $done) {
        id
        content
        done
        createdAt
      }
    }
  `,
};
