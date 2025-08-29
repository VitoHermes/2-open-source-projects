import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import type { Metadata } from 'next';
import ClientPrivyProvider from './ClientPrivyProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // root layout
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientPrivyProvider>{children}</ClientPrivyProvider>
      </body>
    </html>
  );
}
