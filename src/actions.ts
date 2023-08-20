import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "./contacts";

export async function rootAction() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function editAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId!, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export async function destroyAction({ params }: ActionFunctionArgs) {
  await deleteContact(params.contactId!);
  return redirect("/");
}

export async function contactAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  return updateContact(params.contactId!, {
    favorite: formData.get("favorite") === "true",
  });
}
