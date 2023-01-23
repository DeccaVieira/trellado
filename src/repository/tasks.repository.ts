import { connectionDB } from "../database/db.js";

function repositoryCreate(description, deadline){
return connectionDB.query(`
   INSERT INTO tasks (description, deadline, username_responsible, status)
   VALUES ($1,$2,$3,$4)`, 
   [description, deadline, "anonymous", "Not Done"]
)
}

const tasksRepositories = {
  repositoryCreate
}
export default tasksRepositories;