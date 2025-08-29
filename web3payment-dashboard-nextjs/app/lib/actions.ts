'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { z } from 'zod';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Contact 表单校验
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter the contact name.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  address: z.string().min(1, { message: 'Please enter the contact address.' })
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type ContactsState = {
  errors?: {
    customerId?: string[];
    name?: string[];
    email?: string[];
    address?: string[];
  };
  message: string;
}

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.', error };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    throw new Error('Database Error: Failed to Delete Invoice.');
  }
}

export async function createContact(prevState: ContactsState, formData: FormData) {
  const image_url = '/customers/amy-burns.png';
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    address: formData.get('address')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create contact.',
    };
  }

  const { name, email, address } = validatedFields.data;

  try {
    await sql`
      INSERT INTO contacts (name, email, address, image_url)
      VALUES (${name}, ${email}, ${address}, ${image_url})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to create contact.',
    };
  }

  revalidatePath('/dashboard/contacts');
  redirect('/dashboard/contacts');
}

export async function updateContact(id: string, prevState: ContactsState, formData: FormData) {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    address: formData.get('address')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to update contact.',
    };
  }

  const { name, email, address } = validatedFields.data;

  try {
    await sql`
      UPDATE contacts
      SET name = ${name}, email = ${email}, address = ${address}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to update contact.', error };
  }

  revalidatePath('/dashboard/contacts');
  redirect('/dashboard/contacts');
}

export async function deleteContact(id: string) {
  try {
    await sql`DELETE FROM contacts WHERE id = ${id}`;
    revalidatePath('/dashboard/contacts');
  } catch (error) {
    throw new Error('Database Error: Failed to delete contact.');
  }
}
