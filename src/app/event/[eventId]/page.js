"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";

export default function DetailEvent() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [dynamicMetadata, setDynamicMetadata] = useState("");

  const GetDetailEvent = async (idEvent) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/article/${idEvent}`
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const generateMetadata = async (eventData) => {
    // Menghasilkan metadata berdasarkan data acara yang diterima dari panggilan API
    return {
      title: truncateText(eventData.post_article, 60),
      description: truncateText(eventData.post_article, 160),
      // Tambahkan metadata lain sesuai kebutuhan
    };
  };

  const getDetailEvent = async () => {
    try {
      const response = await GetDetailEvent(params.eventId);
      setData(response?.data);

      // Set metadata dinamis setelah menerima data dari API
      const dynamicMetadata = await generateMetadata(response?.data);
      setDynamicMetadata(dynamicMetadata);
    } catch (error) {
      console.error("Error get detail event", error);
    }
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

  const truncateText = (text, maxLength) => {
    // Remove HTML tags from text
    const plainText = text?.replace(/<[^>]*>/g, " ");
    if (plainText?.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  useEffect(() => {
    getDetailEvent();
  }, []);
  return (
    <>
      <Head>
        <title>{dynamicMetadata?.title}</title>
        <meta name="description" content={dynamicMetadata?.description} />
        <meta name="google-site-verification" content="qrhjx4oG31-_WzMue_uckzsud9098vqZz3s7YbKJgDM" />
      </Head>
      <div className="bg-white">
        <div className="sticky top-0 bg-[#fad74f] rounded-b-3xl z-10">
          <div className="container w-11/12 sm:w-10/12 mx-auto">
            <Header />
          </div>
        </div>
        <div className="container mx-auto w-11/12 sm:w-8/12">
          <div className="text-center my-10 text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">
            {data?.title}
          </div>
          <div className="flex justify-center my-2">
            <Image
              src={
                data?.image === ("null" || null || undefined || "undefined")
                  ? "/images/noimage.png"
                  : data?.image
              }
              className="w-full h-70vw sm:h-50vw lg:h-[640px] bg-slate-200 rounded-xl object-cover border shadow-sm"
              width={1500}
              height={1500}
              alt="detail-event-image"
            />
          </div>
          <div className="mb-10">
            <p className="font-medium">
              {formatDateInIndonesiaTime(data?.created_at)} -{" "}
              <span className="text-blue-400">{data?.username}</span>
            </p>
          </div>
          <div
            className="text-sm sm:text-md md:text-lg break-words"
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
      </div>
    </>
  );
}
