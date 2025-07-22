import Contact from '@/app/model/contact';
import { sendContactCreatedMail } from "./mailController";
// 🔹 Get all contacts
export const getContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

// 🔹 Create new contact + send mail
export const createContact = async (data) => {
  const contact = await Contact.create(data);
 sendContactCreatedMail(contact).catch((err) => {
    console.error("❌ Error sending email:", err);
  });

  return contact;
};

// 🔹 Delete contact by ID
export const deleteContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (contact) await sendContactDeletedMail(contact);
  return contact;
};

// 🔹 Update contact by ID
export const updateContact = async (id, data) => {
  const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (contact) await sendContactUpdatedMail(contact);
  return contact;
};
