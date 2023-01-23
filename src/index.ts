import express from 'express';

import tasksRouter from "./routes/tasks.routes.js";

const server = express();
server.use(express.json());

server.use(tasksRouter);


server.listen(4000, () => {
  console.log("Server running in port 4000.")
})