import { createContact } from "./contacts";

export async function action() {
  const contact = await createContact();
  return { contact };
}
