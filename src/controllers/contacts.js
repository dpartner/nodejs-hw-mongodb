import createHttpError from 'http-errors';
import * as fs from 'node:fs/promises';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/saveFileToCloudinary.js';

export async function getContactsContoller(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  let photo = null;

  if (typeof req.file !== 'undefined') {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);

    photo = result.secure_url;
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
    photo,
  };
  const result = await createContact(contact);
  res.status(201).send({
    status: 201,
    message: 'Contact created successfully',
    data: result,
  });
}

export async function updateContactController(req, res) {
  let photo = undefined;

  if (typeof req.file !== 'undefined') {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);

    photo = result.secure_url;
  }

  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
    photo,
  };

  const result = await updateContact(contactId, contact);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user.id;

  const result = await deleteContact(contactId, userId);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
}
