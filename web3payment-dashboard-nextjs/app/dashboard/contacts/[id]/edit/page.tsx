import Form from '@/app/ui/constacts/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchContactById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const contact = await fetchContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacts', href: '/dashboard/contacts' },
          {
            label: 'Edit Contacts',
            href: `/dashboard/contacts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form contact={contact} />
    </main>
  );
}
