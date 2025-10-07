import Joi from "joi";


export const createTeamSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().min(1),
});

export const updateTeamSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255),
  description: Joi.string().min(1),
});
