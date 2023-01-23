import { Router } from "express";
import {getTasks, createTask} from "../controllers/tasks.controllers.js"

const tasksRouter = Router();

tasksRouter.get("/tasks", getTasks);
tasksRouter.post("/tasks",createTask);
// tasksRouter.put("/tasks");
// tasksRouter.delete("/tasks");

export default tasksRouter;
