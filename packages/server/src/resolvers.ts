import { pool } from "./database";
import { IResolvers } from "apollo-server";

// A map of functions which return data for the schema.
export const resolvers: IResolvers = {
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
    deleteTask: async (_, { id: targetId }, __, ___) => {
      const [result] = await pool.query("delete from task where id = ?", [
        targetId,
      ]);
      console.log(result);
      // return (rows as any)[0];
      return true;
    },
    deleteAllTasks: async () => {
      try {
        const [result] = await pool.query("delete from task");
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
