import { connectionDB } from "../database/db.js";
import { Task } from "../protocols/tasks.js";
import { QueryResult } from "pg";

async function repositoryCreate(description:Task, deadline:Task){
return connectionDB.query(`
   INSERT INTO tasks (description, deadline, username_responsible, status)
   VALUES ($1,$2,$3,$4)`, 
   [description, deadline, "anonymous", "notdone"]
)
}

async function getTasksByStatus(status:string):Promise<QueryResult<Task>>{
  return connectionDB.query(`
  SELECT * FROM tasks WHERE status = $1
  `,[status])
}
 async function updateStatusCard(id: number){
  return connectionDB.query(`
  UPDATE tasks SET status = 'done' WHERE id = $1
  `, [id])
 }

 async function deleteCard(id: number) {
  return connectionDB.query(`
  DELETE FROM tasks WHERE id = $1
  `, [id])  
 }


const tasksRepositories = {
  repositoryCreate,
  getTasksByStatus,
  updateStatusCard,
  deleteCard
}
export default tasksRepositories;