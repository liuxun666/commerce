import clsx from 'clsx';
import Image from 'next/image';

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <div className='w-full h-full rounded-xl bg-[#141E3C] overfull-hidden'>
      <Image
        src="/icon.png"
        fill={true}
        alt={`${process.env.SITE_NAME} logo`}
        className={clsx('rounded-xl', className)}
      />
    </div>
  );
}
