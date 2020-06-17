import { ApolloServer, gql, IResolvers } from "apollo-server";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const pool = mysql.createPool({
  connectionLimit: 4,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

// connection.end();

interface ITask {
  id: number;
  content: string;
  done: boolean;
  createdAt: string;
}

// The GraphQL schema
const typeDefs = gql`
  type Task {
    id: ID!
    content: String!
    done: Boolean!
    createdAt: String
  }
  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }
  type Mutation {
    createTask(content: String!): Task
    updateTask(id: ID!, content: String, done: Boolean): Task
  }
`;

// A map of functions which return data for the schema.
const resolvers: IResolvers = {
  Query: {
    tasks: async () => {
      const [rows] = await pool.query("select * from task");
      console.log(rows);
      return rows;
    },
    task: async (_, { id }) => {
      console.log(id);
      const [rows] = await pool.query("select * from task where id = ?", [id]);
      return (rows as any)[0];
    },
  },
  Mutation: {
    createTask: async (_, { content }, __, ___) => {
      const [result] = await pool.query(
        "insert into task (content) values (?)",
        [content]
      );
      const [rows] = await pool.query("select * from task where id = ?", [
        (result as any).insertId,
      ]);
      console.log(rows);
      return (rows as any)[0];
    },
    updateTask: async (_, { id: targetId, content, done }, __, ___) => {
      const [
        result,
      ] = await pool.query(
        "update task set content = ?, done = ? where id = ?",
        [content, done, targetId]
      );
      const [rows] = await pool.query("select * from task where id = ?", [
        targetId,
      ]);
      return (rows as any)[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
