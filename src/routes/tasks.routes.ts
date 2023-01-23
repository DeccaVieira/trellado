import { Router } from "express";
import {getTasks, createTask,updateStatus} from "../controllers/tasks.controllers.js"

const tasksRouter = Router();

tasksRouter.get("/tasks", getTasks);
tasksRouter.post("/tasks",createTask);
tasksRouter.put("/tasks/:id",updateStatus);
tasksRouter.delete("/tasks");

export default tasksRouter;
