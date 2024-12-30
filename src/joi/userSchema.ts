import joi from 'joi';

export const UserSchema = joi.object({
  firstName: joi.string().min(3).max(15).required(),
  lastName: joi.string(),
  email: joi.string().email().required(),
  companyName: joi.string(),
  phone: joi
    .string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .min(10)
    .messages({
      'string.pattern.base': 'Phone number must be in a valid international format.',
    }),
  countryCode: joi.string(),
});
