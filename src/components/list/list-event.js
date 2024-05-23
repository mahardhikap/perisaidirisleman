'use client';
import React, { useEffect, useState } from 'react';
import { DeleteEvent, ListEventDashboard } from '@/libs';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function FormListEvent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleGetListEventDashboard = async () => {
    const getListEventDashboard = await ListEventDashboard(page);
    setData(getListEventDashboard?.data);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= data?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  const handleDeleteEvent = (id) => {
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
        DeleteEvent(id).then(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Artikel sudah berhasil dihapus',
            icon: 'success',
          }).then(() => handleGetListEventDashboard());
        });
      }
    });
  };

  useEffect(() => {
    handleGetListEventDashboard();
  }, [page]);
  return (
    <div>
      {data?.rows?.map((item, index) => {
        return (
          <div className="grid grid-cols-5 lg:grid-cols-6 mb-2" key={index}>
            <div className="col-span-5 lg:col-span-2">
              <Image
                src={
                  item?.image === ('null' || null || 'undefined' || undefined)
                    ? '/images/noimage.png'
                    : item?.image
                }
                alt="image article"
                width={500}
                height={500}
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
            <div className="col-span-4 lg:col-span-3 py-2 lg:px-2">
              <p className="font-medium truncate">{item?.title}</p>
              <p className="break-all">
                {truncateText(item?.post_article, 100)}
              </p>
              <p className="font-light">{item?.created_at}</p>
            </div>
            <div className="col-span-1 lg:col-span-1 flex flex-col gap-5">
              <button className="p-3 bg-yellow-400 text-white font-medium truncate">
                Edit
              </button>
              <button
                className="p-3 bg-red-500 text-white font-medium truncate"
                onClick={() => handleDeleteEvent(item?.article_id)}
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
