import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
      <Image src={'/aurix.png'} alt="Aurix logo" width={60} height={60} />
      <p className="text-[44px]">Aurix</p>
    </div>
  );
}
