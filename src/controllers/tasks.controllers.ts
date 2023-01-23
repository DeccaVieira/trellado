import {Request, Response} from 'express';
import tasksRepositories from "../repository/tasks.repository.js"
import taskSchema from "../models/tasks.schema.js"


export async function getTasks(req: Request, res:Response){
  const {status} = req.query;
  
  try{
    if(status){
      const task = await tasksRepositories.getTasksByStatus(status);
      if (task.rows.length === 0) {
        return res.status(404).send(`Cards com status ${status} não existe!`);
      }
   return res.send(task.rows)
}
  }catch (err) {
    return res.status(400).send(err);
  }



}

export async function createTask(req:Request, res:Response){
  const { description, deadline} = req.body;

  try{

    const { error } = taskSchema.validate(req.body, { abortEarly: false });
    if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });

  }
  
  await tasksRepositories.repositoryCreate(description, deadline);
  return res.sendStatus(200);

  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function updateStatus (req:Request, res:Response) {
  const {id} = req.params;

  try{
    if(!id){
      return res.status(400).send("Esse card não existe");
    }
await tasksRepositories.updateStatusCard(id);


  return res.status(200).send("Card concluído com sucesso!")
  }catch (err) {
    return res.status(400).send(err);
  }
}

export async function deleteCard (req:Request, res:Response) {
  const {id} = req.params;

  try{
    if(!id){
      return res.status(400).send("Esse card não existe");
    }
await tasksRepositories.deleteCard(id);
  return res.status(200).send("Card excluído com sucesso!")
  }catch (err) {
    return res.status(400).send(err);
  }

}
