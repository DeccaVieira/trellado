import { Request, Response } from "express";
import tasksRepositories from "../repository/tasks.repository.js";
import taskSchema from "../models/tasks.schema.js";

export async function getTasks(req: Request, res: Response) {
  const { status } = req.query;
  try {
    if (status) {
      const task = await tasksRepositories.getTasksByStatus(String(status));
      console.log(task.rows);

      if (task.rowCount === 0) {
        return res.status(404).send(`Cards com status ${status} não existe!`);
      }
      return res.send(task.rows);
    }
  } catch (err) {
    return res.send({ MessageErrors: "Error" });
  }
}

export async function createTask(req: Request, res: Response) {
  const { description } = req.body;

  try {
    const { error } = taskSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ errors });
    }

    await tasksRepositories.repositoryCreate(description);
    return res.send("Task inserida com sucesso!");
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function updateStatus(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) {
      return res.status(400).send("Esse card não existe");
    }
    const cardsExists = await tasksRepositories.cardExists(Number(id));
    if (cardsExists.rowCount === 0) {
      return res.send("Essa tarefa não existe!");
    }
    const responsePut = await tasksRepositories.updateStatusCard(Number(id));

    return res.send({ responsePut: "Card atualizado com sucesso!" });
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("Esse card não existe");
    }
    const cardsExists = await tasksRepositories.cardExists(Number(id));
    if (cardsExists.rowCount === 0) {
      return res.send("Essa tarefa não existe!");
    }
    const responseDelete = await tasksRepositories.deleteCard(Number(id));

    return res.send({ responseDelete, mesage: "Card deletado com sucesso!" });
  } catch (err) {
    return res.status(400).send(err);
  }
}
