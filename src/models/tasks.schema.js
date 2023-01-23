import joi from "joi";

const taskSchema = joi.object({
  description: joi.string().min(3).max(120).required(),
});
export default taskSchema;
