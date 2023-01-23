import { Router } from "express";
import {
  getTasks,
  createTask,
  updateStatus,
  deleteCard,
} from "../controllers/tasks.controllers.js";

const tasksRouter = Router();

tasksRouter.get("/tasks", getTasks);
tasksRouter.post("/tasks", createTask);
tasksRouter.put("/tasks/:id", updateStatus);
tasksRouter.delete("/tasks/:id", deleteCard);

export default tasksRouter;
