import Form from '@/app/ui/constacts/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Contact',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacts', href: '/dashboard/contacts' },
          {
            label: 'Create Contacts',
            href: '/dashboard/contacts/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
