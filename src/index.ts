import express from 'express';
import tasksRouter from "./routes/tasks.routes.js";
import cors from "cors"

const server = express();
server.use(express.json());
server.use(cors())
server.use(tasksRouter);


server.listen(4000, () => {
  console.log("Server running in port 4000.")
})