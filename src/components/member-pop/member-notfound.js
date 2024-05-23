"use client";
import React from "react";

export default function MemberNotFound({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-10/12 sm:w-6/12">
        <div className="font-bold text-lg mb-8 break-words">
          Nomor induk tidak ditemukan!
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
