import Joi from "joi";

const birthdayWishSchema = Joi.object({
  email: Joi.string().email().required(),
  message: Joi.string().min(1).max(500).required(),
});

export default birthdayWishSchema;
