"use client";
import React, { useEffect, useState } from "react";
import { Header, Footer } from "@/components";
import { useParams } from "next/navigation";
import { GetDetailEvent } from "@/libs";
import Image from "next/image";

export default function DetailEvent() {
  const params = useParams();
  const [data, setData] = useState([]);
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
          lorem asdasdas asda sdasdasdasdasd adasda sda asdas dads asd a sas
          dasdasdasd as dasdasd asASaasdasd as ad asd asd asdasdasd asd
          asdasdasd asd asasd asd asdasd asd
        </div>
        <div className="flex justify-center my-2">
          <Image
            src={
              data?.image === ("null" || null || undefined || "undefined")
                ? "/images/noimage.png"
                : data?.image
            }
            className="w-full h-70vw sm:h-50vw lg:h-40vw bg-slate-200 rounded-xl object-cover"
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
        <div className="text-sm sm:text-md md:text-lg">
          {data?.post_article}
        </div>
      </div>
      <div className="rounded-t-3xl mx-auto container bg-[#fad74f] mt-10">
        <div className="container mx-auto w-11/12 sm:w-10/12 py-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
