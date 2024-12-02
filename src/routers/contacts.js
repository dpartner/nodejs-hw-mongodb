import express from 'express';

import { getContactController, getContactsContoller, createContactController, updateContactController, deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';



const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', isValidId, ctrlWrapper(getContactController));

router.post('/', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', isValidId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;