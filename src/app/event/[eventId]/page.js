"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function DetailEvent() {
  const params = useParams();
  const [data, setData] = useState([]);

  const GetDetailEvent = async (idEvent) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/article/${idEvent}`
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const getDetailEvent = async () => {
    try {
      const response = await GetDetailEvent(params.eventId);
      setData(response?.data);
    } catch (error) {
      console.error("Error get detail event", error);
    }
  };

  useEffect(() => {
    getDetailEvent();
  }, []);
  return (
    <>
      <div className="sticky top-0 bg-[#fad74f] rounded-b-3xl">
        <div className="container w-11/12 sm:w-10/12 mx-auto">
          <Header />
        </div>
      </div>
      <div className="container mx-auto w-11/12 sm:w-10/12">
        <div className="text-center my-10 text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
          {data?.title}
        </div>
        <div className="flex justify-center my-2">
          <Image
            src={
              data?.image === ("null" || null || undefined || "undefined")
                ? "/images/noimage.png"
                : data?.image
            }
            className="w-full h-70vw sm:h-50vw lg:h-40vw bg-slate-200 rounded-xl object-cover border shadow-sm"
            width={500}
            height={500}
            alt="detail-event-image"
          />
        </div>
        <div className="mb-10">
          <p>
            {data?.created_at} - {data?.username}
          </p>
        </div>
        <div
          className="text-sm sm:text-md md:text-lg"
          dangerouslySetInnerHTML={{ __html: data?.post_article }}
        />
        {/* <div className="text-sm sm:text-md md:text-lg">
          {data?.post_article}
        </div> */}
      </div>
      <div className="rounded-t-3xl mx-auto container bg-[#fad74f] mt-10">
        <div className="container mx-auto w-11/12 sm:w-10/12 py-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
