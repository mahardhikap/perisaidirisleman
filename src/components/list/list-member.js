'use client';
import React, { useEffect, useState } from 'react';
import { ListMemberDashboard, DeleteMember } from '@/libs';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function FormListMember() {
  const [memberUsername, setMemberUsername] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const getListMember = async () => {
    const result = await ListMemberDashboard(memberUsername, page);
    // console.log(result);
    setData(result?.data);
  };
  useEffect(() => {
    getListMember();
  }, [page, memberUsername]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= data?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  const handleDeleteMember = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Kamu tidak bisa mengembalikannya!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus ini!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteMember(id).then(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Member sudah berhasil dihapus',
            icon: 'success',
          }).then(() => getListMember());
        });
      }
    });
  };

  return (
    <div>
      {data?.rows?.map((item, index) => {
        return (
          <div
            className="grid grid-cols-1 lg:grid-cols-5 mb-3"
            key={index}
          >
            <div className="flex justify-start items-center col-span-5 lg:col-span-1">
              <Image
                src={
                  item?.photo === ('null' || null || undefined || 'undefined')
                    ? '/images/noimage.png'
                    : item.photo
                }
                alt="photo-member"
                height={100}
                width={100}
                className="h-44 w-32 object-cover rounded-xl"
              />
            </div>
            <div className="col-span-5 lg:col-span-3">
              <p className="font-medium truncate">{item.fullname}</p>
              <p className="truncate">{item.id_number}</p>
              <p>{item.grade}</p>
              <p className="truncate">{item.birth}</p>
              <p className="mt-3 font-medium">Motto</p>
              <p className="break-all">{item.motto}</p>
            </div>
            <div className="col-span-5 lg:col-span-1 flex flex-col gap-3">
              <button className="p-3 bg-yellow-400 text-white font-medium truncate">
                Edit
              </button>
              <button
                className="p-3 bg-red-500 text-white font-medium truncate"
                onClick={() => handleDeleteMember(item.member_id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <div className="my-5 text-center">
        <div>
          <button
            className="rounded p-2 font-bold text-black border-0 me-3 text-xl"
            onClick={() => goToPage(page - 1)}
          >
            Prev
          </button>
          {data?.pages?.pageNow} From {data?.pages?.totalPage}
          <button
            className="rounded p-2 font-bold text-black border-0 ms-3 text-xl"
            onClick={() => goToPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
