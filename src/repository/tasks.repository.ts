import { connectionDB } from "../database/db.js";

async function repositoryCreate(description:string, deadline:string){
return connectionDB.query(`
   INSERT INTO tasks (description, deadline, username_responsible, status)
   VALUES ($1,$2,$3,$4)`, 
   [description, deadline, "anonymous", "notdone"]
)
}

async function getTasksByStatus(status){
  return connectionDB.query(`
  SELECT * FROM tasks WHERE status = $1
  `,[status])
}
 async function updateStatusCard(id){
  return connectionDB.query(`
  UPDATE tasks SET status = 'done' WHERE id = $1
  `, [id])
 }


const tasksRepositories = {
  repositoryCreate,
  getTasksByStatus,
  updateStatusCard
}
export default tasksRepositories;