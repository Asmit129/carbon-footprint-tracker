import Joi from "joi";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  activity: Joi.object({
    category: Joi.string().valid("transport", "energy", "food", "shopping").required(),
    subcategory: Joi.string().allow(""),
    quantity: Joi.number().positive().required(),
    unit: Joi.string().required(),
    date: Joi.date().optional(),
    notes: Joi.string().allow("")
  })
};
