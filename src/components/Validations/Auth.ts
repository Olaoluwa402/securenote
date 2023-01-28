import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "uk"] },
  }),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
