import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  birthDate: Joi.date()
    .iso()
    .less("now")
    .greater("1900-01-01")
    .required()
    .messages({
      "date.base": `"Birth Date" must be a valid date`,
      "date.iso": `"Birth Date" must be in YYYY-MM-DD format`,
      "date.less": `"Birth Date" must be in the past`,
      "date.greater": `"Birth Date" must be after January 1, 1900`,
    }),
});

export default signupSchema;
