"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function FormListMember() {
  const navigate = useRouter()
  const [memberUsername, setMemberUsername] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const ListMemberDashboard = async (onFullName, onPage) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member?searchby=fullname&search=${onFullName}&sortby=created_at&sort=DESC&limit=5&page=${onPage}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const DeleteMember = async (idToDelete) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/delete/member/${idToDelete}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const getListMember = async () => {
    const result = await ListMemberDashboard(memberUsername, page);
    setData(result?.data);
  };
  useEffect(() => {
    getListMember();
  }, [page]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= data?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  const handleSearchMember = async () => {
    const getListMemberDashboard = await ListMemberDashboard(memberUsername, 1)
    setData(getListMemberDashboard?.data)
    setPage(1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchMember()
    }
  };


  const handleDeleteMember = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Kamu tidak bisa mengembalikannya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus ini!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteMember(id).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Member sudah berhasil dihapus",
            icon: "success",
          }).then(() => getListMember());
        });
      }
    });
  };

  const truncateText = (text, maxLength) => {
    // Remove HTML tags from text
    const plainText = text.replace(/<[^>]*>/g, ' ');
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  return (
    <div>
      <div>
        <input type="text" onChange={(e)=> setMemberUsername(e.target.value)} onKeyDown={handleKeyDown} className='p-3 w-full mb-3 rounded-lg border' placeholder='Cari nama, enter'/>
      </div>
      {data?.rows?.map((item, index) => {
        return (
          <div
            className="grid grid-cols-1 lg:grid-cols-6 mb-3 bg-white p-2 rounded-lg"
            key={index}
          >
            <div className="flex justify-start items-center col-span-6 lg:col-span-2">
              <Image
                src={
                  item?.photo === ("null" || null || undefined || "undefined")
                    ? "/images/noimage.png"
                    : item.photo
                }
                alt="photo-member"
                height={500}
                width={500}
                className="h-56 w-56 object-cover rounded-xl border"
              />
            </div>
            <div className="col-span-6 lg:col-span-3 p-2">
              <div className="grid grid-cols-2">
                <div>
                  <div className="font-bold">Nama</div>
                  <div className="break-words">{truncateText(item.fullname, 40)}</div>
                  <div className="font-bold">Nomor Induk</div>
                  <div className="truncate">{item.id_number}</div>
                  <div className="font-bold">Tingkatan</div>
                  <div className="truncate">{item.grade}</div>
                </div>
                <div>
                  <div className="font-bold">Tempat, tanggal lahir</div>
                  <div className="truncate">{item.birth}</div>
                  <div className="font-bold">Motto</div>
                  <div className="break-words">{truncateText(item.motto, 100)}</div>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-1 flex flex-col gap-3 p-2">
              <button onClick={()=> navigate.push(`/edit-member/${item.member_id}`)} className="p-3 bg-yellow-400 text-white font-medium truncate">
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
