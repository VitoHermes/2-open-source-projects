'use client';

import { DocumentDuplicateIcon, HomeIcon, UserGroupIcon, WalletIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Wallet', href: '/dashboard/wallet', icon: WalletIcon },
  {
    name: 'Activities',
    href: '/dashboard/activities',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Contacts', href: '/dashboard/contacts', icon: UserGroupIcon },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map(link => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

// Auto Code Splitting and Prefetching
// 自动代码分割和预取为了改善导航体验，Next.js会自动按路由段对应用进行代码分割。
// 这与传统的React SPA不同，在传统的React SPA中，浏览器在初始页面加载时加载所有应用程序代码。
// 按路由分割代码意味着页面被隔离。如果某个页面抛出错误，应用程序的其余部分仍将正常工作。
// 这也减少了浏览器解析的代码，从而使应用程序更快。
// 此外，在生产环境中，每当<Link>组件出现在浏览器的视口中时，Next.js就会自动执行预取。

// Next.js会在后台自动预取链接路由的代码。当用户单击链接时，目标页面的代码已经在后台加载，这使得页面转换几乎是即时的！
// 在开发环境中，Next.js会自动预取所有链接，以确保在用户单击链接时，目标页面的代码已经加载。
// 在生产环境中，Next.js会自动预取用户最有可能访问的页面，以确保在用户单击链接时，目标页面的代码已经加载。
// 这使得页面转换几乎是即时的！
