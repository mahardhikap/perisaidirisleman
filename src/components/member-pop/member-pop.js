'use client';
import React from 'react';
import Image from 'next/image';

export default function MemberPop({
  onClose,
  fullName,
  idNumber,
  grade,
  image,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10 w-10/12 sm:w-6/12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="col-span-1">
            <Image
              src={
                image === ('null' || null || 'undefined' || undefined)
                  ? '/images/noimage.png'
                  : image
              }
              alt="member"
              height={100}
              width={100}
              className="w-full h-full object-cover border rounded-lg"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <p className="font-bold">Nama Lengkap:</p>
            <p className="mb-2 truncate">{fullName}</p>
            <p className="font-bold ">Nomor Induk:</p>
            <p className="mb-2 truncate">{idNumber}</p>
            <p className="font-bold ">Tingkatan:</p>
            <p className="mb-2 truncate">{grade}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={onClose} // Memanggil fungsi onClose saat tombol Close diklik
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
