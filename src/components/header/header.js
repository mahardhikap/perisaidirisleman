'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();

  return (
    <div className="flex justify-between items-center py-2">
      <div className="font-medium cursor-pointer">
        <Link href={'/'}>
          <Image
            src={'/images/pdlogo.svg'}
            alt="logo perisai diri"
            width={60}
            height={60}
          />
        </Link>
      </div>
      <div>
        <ul className="flex flex-row gap-5 font-medium list-none">
          <Link href={'/'}>
            <li
              className={`${
                path === '/' ? 'underline underline-offset-8' : ''
              } cursor-pointer transition duration-500 ease-in-out text-white`}
            >
              Home
            </li>
          </Link>
          <Link href={'/event'}>
            <li
              className={`${
                path === '/event' ? 'underline underline-offset-8' : ''
              } cursor-pointer transition duration-500 ease-in-out text-white`}
            >
              Event
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <Link href={'/signin'}>
          <button className="font-semibold p-3 hover:bg-white hover:text-[#fad74f] rounded-2xl text-white transition duration-500 ease-in-out">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
