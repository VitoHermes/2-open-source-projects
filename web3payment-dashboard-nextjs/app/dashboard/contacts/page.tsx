import { fetchFilteredContacts } from '@/app/lib/data';
import CustomersTable from '@/app/ui/constacts/table';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const contacts = await fetchFilteredContacts(query);

  return (
    <main>
      <CustomersTable contacts={contacts} />
    </main>
  );
}
