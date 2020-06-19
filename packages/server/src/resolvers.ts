import { pool } from "./database";
import { IResolvers } from "apollo-server";

// A map of functions which return data for the schema.
export const resolvers: IResolvers = {
  Query: {
    tasks: async (_, __, { dataSources }) => {
      return dataSources.taskAPI.getAllTasks();
    },
    task: async (_, { id }, { dataSources }) => {
      return await dataSources.taskAPI.getTaskById(id);
    },
  },
  Mutation: {
    createTask: async (_, { content }, { dataSources }, ___) => {
      const result = dataSources.taskAPI.createTask(content);
      if (result) {
        return dataSources.taskAPI.getAllTasks((result as any).insertId);
      }
      return null;
    },
    updateTask: async (_, { id, content, done }, { dataSources }, ___) => {
      const result = dataSources.taskAPI.updateTask(content);
      if (result) {
        return dataSources.taskAPI.getAllTasks(id);
      }
      return null;
    },
    deleteTask: async (_, { id }, { dataSources }, ___) => {
      return dataSources.taskAPI.deleteTask(id);
    },
    deleteAllTasks: async (_, __, { dataSources }) => {
      return dataSources.taskAPI.deleteAllTasks();
    },
  },
};
