import Joi from 'joi';

const customMessages = {
  name: {
    'string.base': 'Username should be a string', 
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required'
  },
  phoneNumber: {
    'string.base': 'phoneNumber should be a string', 
    'string.min': 'phoneNumber should have at least {#limit} characters',
    'string.max': 'phoneNumber should have at most {#limit} characters',
    'any.required': 'phoneNumber is required',
  },
  email: {
    'string.email': 'Invalid email',
  },
  isFavourite: {
    'boolean.base': 'isFavourite should be a boolean',
  },
  contactType: {
    'string.base': 'contactType should be a string',
    'string.valid': 'contactType should be one of the    following: work, home, personal',
  }
  
};


export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages(customMessages.name),
  phoneNumber: Joi.string().min(3).max(20).required().messages(customMessages.phoneNumber),
  email: Joi.string().email().messages(customMessages.email),
  isFavourite: Joi.boolean().messages(customMessages.isFavourite),
  contactType: Joi.string().valid('work', 'home', 'personal').required().messages(customMessages.contactType),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages(customMessages.name),
  phoneNumber: Joi.string().min(3).max(20).messages(customMessages.phoneNumber),
  email: Joi.string().email().messages(customMessages.email),
  isFavourite: Joi.boolean().messages(customMessages.isFavourite),
  contactType: Joi.string().valid('work', 'home', 'personal').messages(customMessages.contactType),
});

