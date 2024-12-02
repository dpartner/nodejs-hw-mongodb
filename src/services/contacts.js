import { ContactsCollection } from '../models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter
}) => {
  const skip = page > 0 ? (page -1) * perPage : 0;
  const contactsQuery = ContactsCollection.find();

  if (typeof filter.isFavourite !== 'undefined') {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (typeof filter.type !== 'undefined') {
      contactsQuery.where('contactType').equals(filter.type);
  }


  const [total, contacts] = await Promise.all([
      ContactsCollection.countDocuments(contactsQuery),
      contactsQuery.sort({[sortBy]: sortOrder}).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPrevPage: page > 1,
  };
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