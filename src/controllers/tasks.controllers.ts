import {Request, Response} from 'express';
import tasksRepositories from "../repository/tasks.repository.js"
import taskSchema from "../models/tasks.schema.js"
import { string } from '../../node_modules/joi/lib/index.js';

export async function getTasks(req: Request, res:Response){
  const {status} = req.query;
  
  try{
    if(status){
      const task = await tasksRepositories.getTasksByStatus(status);
      
      //return res.sendStatus(200) ;
      
      console.log(task);
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
