import { connectionDB } from "../database/db.js";
import { Task, ResponseDel, ResponsePut } from "../protocols/tasks.js";
import { QueryResult } from "pg";

async function repositoryCreate(description: Task): Promise<QueryResult<Task>> {
  return connectionDB.query(
    `
   INSERT INTO tasks (description, status)
   VALUES ($1,$2)`,
    [description, "notdone"]
  );
}

async function getTasksByStatus(status: string): Promise<QueryResult<Task>> {
  return connectionDB.query(
    `
  SELECT * FROM tasks WHERE status = $1
  `,
    [status]
  );
}
async function updateStatusCard(id: number): Promise<QueryResult<ResponsePut>> {
  return connectionDB.query(
    `
  UPDATE tasks SET status = 'done' WHERE id = $1
  `,
    [id]
  );
}

async function deleteCard(id: number): Promise<QueryResult<ResponseDel>> {
  return connectionDB.query(
    `
  DELETE FROM tasks WHERE id = $1
  `,
    [id]
  );
}

async function cardExists(id: number): Promise<QueryResult<ResponsePut>> {
  return connectionDB.query(
    `
  SELECT * FROM tasks WHERE id = $1
  `,
    [id]
  );
}

const tasksRepositories = {
  repositoryCreate,
  getTasksByStatus,
  updateStatusCard,
  deleteCard,
  cardExists,
};
export default tasksRepositories;
