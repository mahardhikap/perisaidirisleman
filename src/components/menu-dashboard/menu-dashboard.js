'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function MenuDashboard() {
  const path = usePathname();
  const router = useRouter();
  console.log(path);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Kamu ingin meninggalkan halaman ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tetap logout.',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: 'Logout berhasil!',
          text: 'Anda perlu login kembali untuk ke dashboard.',
          icon: 'success',
        }).then(() => router.replace('/signin'));
      }
    });
  };
  return (
    <div>
      <div className="mb-3 p-3 font-medium">
        Welcome, {localStorage.getItem('username')}
      </div>
      <ul className="flex flex-col gap-1">
        <Link href={'/list-event'}>
          <li
            className={`${
              path === '/list-event' ? 'bg-blue-100' : 'bg-white'
            } p-3 cursor-pointer`}
          >
            List Event
          </li>
        </Link>
        <Link href={'/list-member'}>
          <li
            className={`${
              path === '/list-member' ? 'bg-blue-100' : 'bg-white'
            } p-3 cursor-pointer`}
          >
            List Member
          </li>
        </Link>
        <Link href={'/add-event'}>
          <li
            className={`${
              path === '/add-event' ? 'bg-blue-100' : 'bg-white'
            } p-3 cursor-pointer`}
          >
            Add Event
          </li>
        </Link>
        <Link href={'/add-member'}>
          <li
            className={`${
              path === '/add-member' ? 'bg-blue-100' : 'bg-white'
            } p-3 cursor-pointer`}
          >
            Add Member
          </li>
        </Link>
        <Link href={'/edit-profile'}>
          <li
            className={`${
              path === '/edit-profile' ? 'bg-blue-100' : 'bg-white'
            } p-3 cursor-pointer`}
          >
            Edit Profile
          </li>
        </Link>
        <li className="p-3 cursor-pointer" onClick={() => handleLogout()}>
          Logout
        </li>
      </ul>
    </div>
  );
}
