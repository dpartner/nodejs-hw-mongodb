import { ContactsCollection } from '../models/contact.js';

export const getAllContacts = async () => {
    return ContactsCollection.find();
};

export const getContactById = async (contactId) => {
    return ContactsCollection.findById(contactId);
};

export const createContact = async (contact) => {
return ContactsCollection.create(contact);
};

export const updateContact = async (contactId, contact) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, {new: true});
};

export const deleteContact = async (contactId) => {
  return ContactsCollection.findByIdAndDelete(contactId);
};