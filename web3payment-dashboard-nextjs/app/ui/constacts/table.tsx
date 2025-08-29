import type { FormattedContactTable } from '@/app/lib/definitions';
import { CreateContacts } from '@/app/ui/constacts/buttons';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Image from 'next/image';
import { DeleteContacts, UpdateContacts } from './buttons';

export default async function ContactsTable({
  contacts,
}: {
  contacts: FormattedContactTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>contacts</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search contacts..." />
        <CreateContacts />
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {contacts?.map(contacts => (
                  <div key={contacts.id} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={contacts.image_url}
                              className="rounded-full"
                              alt={`${contacts.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{contacts.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{contacts.email}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Address
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {contacts.map(contacts => (
                    <tr key={contacts.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={contacts.image_url}
                            className="rounded-full"
                            alt={`${contacts.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{contacts.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {contacts.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm align-middle">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-left">{contacts.address}</span>
                          <div className="flex gap-2 justify-end">
                            <UpdateContacts id={contacts.id} />
                            <DeleteContacts id={contacts.id} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
