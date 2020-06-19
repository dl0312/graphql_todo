import { DataSource } from "apollo-datasource";

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export class TaskAPI extends DataSource {
  pool: mysql.Pool;
  constructor() {
    super();
    this.pool = mysql.createPool({
      connectionLimit: 4,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
  }

  async getAllTasks() {
    const [rows] = await this.pool.query("select * from task");
    return rows;
  }

  async getTaskById(id: string) {
    try {
      const [rows] = await this.pool.query("select * from task where id = ?", [
        id,
      ]);
      return (rows as any)[0];
    } catch (error) {
      return false;
    }
  }

  async createTask(content: string) {
    try {
      const [
        result,
      ] = await this.pool.query("insert into task (content) values (?)", [
        content,
      ]);
      return result;
    } catch (error) {
      return false;
    }
  }

  async updateTask(id: string, content: string, done: boolean) {
    try {
      const [
        result,
      ] = await this.pool.query(
        "update task set content = ?, done = ? where id = ?",
        [content, done, id]
      );
      return result;
    } catch (error) {
      return false;
    }
  }

  async deleteTask(id: string) {
    try {
      const [result] = await this.pool.query("delete from task where id = ?", [
        id,
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteAllTasks() {
    try {
      const [result] = await this.pool.query("delete from task");
      return true;
    } catch (error) {
      return false;
    }
  }
}
