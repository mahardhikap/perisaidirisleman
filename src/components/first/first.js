"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MemberPop from "../member-pop/member-pop";
import MemberNotFound from "../member-pop/member-notfound";
import { SearchMember } from "@/libs";

export default function First() {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [memberNumber, setMemberNumber] = useState("");

  const handleSearchClick = async () => {
    setShowPopup(true);
    try {
      if (memberNumber !== "") {
        const searchData = await SearchMember({ memberNumber });
        setData(searchData?.data?.rows);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setMemberNumber("");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setData([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-10">
      <div className="flex flex-col justify-center order-2 lg:order-1">
        <div>
          <h1 className="font-extrabold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-700">
            PERISAI DIRI CABANG SLEMAN
          </h1>
          <p>Pandai silat, tanpa cidera</p>
          <div className="my-10">
            <input
              type="text"
              value={memberNumber}
              onChange={(e) => setMemberNumber(e.target.value)}
              className="p-3 rounded-xl border border-2 border-[#fad74f] w-full outline-none"
              placeholder="Nomor Induk Perisai Diri Sleman"
            />
            <p className="font-extralight text-xs mt-2">
              Note: Daftar anggota yang tersedia, adalah yang sudah terdaftar di
              Perisai Diri Cabang Sleman
            </p>
            <button
              className="p-3 rounded-lg bg-[#fad74f] mt-5 font-bold text-white transition duration-500 ease-in-out hover:bg-green-400"
              onClick={handleSearchClick}
            >
              Cari Anggota
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2">
        <div>
          <Image
            src={"/images/dirdjo.jpg"}
            alt="Pak Dirdjo"
            width={300}
            height={300}
            className="max-h-96 object-cover rounded-xl shadow"
          />
          <p className="text-center font-light text-black lg:text-white">
            R.M. Soebandiman Dirdjoatmojo
          </p>
        </div>
      </div>
      {/* Menampilkan pop-up jika showPopup true */}
      {showPopup && data.length > 0 ? (
        <MemberPop
          onClose={handleClosePopup}
          fullName={data[0]?.fullname}
          idNumber={data[0]?.id_number}
          grade={data[0]?.grade}
          image={data[0]?.photo}
        />
      ) : (
        showPopup && (
          <MemberNotFound onClose={handleClosePopup}/>
        )
      )}
    </div>
  );
}
