import { IResolvers } from "apollo-server";

// A map of functions which return data for the schema.
export const resolvers: IResolvers = {
  Query: {
    tasks: async (_, __, { dataSources }) => {
      return await dataSources.taskAPI.getAllTasks();
    },
    task: async (_, { id }, { dataSources }) => {
      return await dataSources.taskAPI.getTaskById(id);
    },
  },
  Mutation: {
    createTask: async (_, { content }, { dataSources }, ___) => {
      const result = await dataSources.taskAPI.createTask(content);
      console.log(result);
      if (result) {
        return await dataSources.taskAPI.getTaskById((result as any).insertId);
      }
      return null;
    },
    updateTask: async (_, { id, content, done }, { dataSources }, ___) => {
      const result = await dataSources.taskAPI.updateTask(id, content, done);
      if (result) {
        return await dataSources.taskAPI.getTaskById(id);
      }
      return null;
    },
    deleteTask: async (_, { id }, { dataSources }, ___) => {
      return await dataSources.taskAPI.deleteTask(id);
    },
    deleteAllTasks: async (_, __, { dataSources }) => {
      return await dataSources.taskAPI.deleteAllTasks();
    },
  },
};
