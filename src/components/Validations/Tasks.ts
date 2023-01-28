import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  detail: Joi.string().required(),
});
