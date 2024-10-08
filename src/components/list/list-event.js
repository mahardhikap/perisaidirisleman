'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function FormListEvent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('')
  const navigate = useRouter()

  const truncateText = (text, maxLength) => {
    // Remove HTML tags from text
    const plainText = text.replace(/<[^>]*>/g, ' ');
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  const ListEventDashboard = async (onPage, onSearch) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/my/article?search=${onSearch}&searchby=title&sortby=created_at&sort=DESC&limit=5&page=${onPage}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const DeleteEvent = async (idToDelete) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/delete/article/${idToDelete}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };  

  const handleGetListEventDashboard = async () => {
    const getListEventDashboard = await ListEventDashboard(page, title);
    setData(getListEventDashboard?.data);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= data?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  const handleSearchEvent = async () => {
    const getListEventDashboard = await ListEventDashboard(1, title)
    setData(getListEventDashboard?.data)
    setPage(1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchEvent();
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

  const formatDateInIndonesiaTime = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("id-ID", options).replace("pukul", "|");
  };

  useEffect(() => {
    handleGetListEventDashboard();
  }, [page]);
  return (
    <div>
      <div>
        <input type="text" onChange={(e)=> setTitle(e.target.value)} onKeyDown={handleKeyDown} className='p-3 w-full mb-3 rounded-lg border' placeholder='Cari judul, enter'/>
      </div>
      {data?.rows?.map((item, index) => {
        return (
          <div className="grid grid-cols-5 lg:grid-cols-6 mb-2 bg-white p-2 rounded-lg max-h-[430px] md:max-h-[400px] lg:max-h-[260px] sm:max-h-[260px] overflow-hidden" key={index}>
            <div className="col-span-5 lg:col-span-2 relative">
              <Image
                src={
                  item?.image === ('null' || null || 'undefined' || undefined)
                    ? '/images/noimage.png'
                    : item?.image
                }
                alt="image article"
                width={500}
                height={500}
                className="w-full h-60 object-cover rounded-xl border"
              />
              {item?.tags.length > 0 ? (
            <span className="p-2 rounded-2xl bg-white absolute top-2 left-2 text-xs font-medium border">
              {item?.tags}
            </span>
          ) : (
            ""
          )}
            </div>
            <div className="col-span-4 lg:col-span-3 py-2 lg:px-2">
              <h2 className="font-bold truncate">{item?.title}</h2>
              <div className="break-words" dangerouslySetInnerHTML={{__html: truncateText(item?.post_article, 150)}}/>
              <p className="font-medium">{formatDateInIndonesiaTime(item?.created_at)}</p>
            </div>
            <div className="col-span-1 lg:col-span-1 flex flex-col gap-5">
              <button className="p-3 bg-yellow-400 text-white font-medium truncate" onClick={()=>navigate.push(`/edit-event/${item?.article_id}`)}>
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
