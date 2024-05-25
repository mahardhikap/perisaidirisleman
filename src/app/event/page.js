"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EventCard, Header, Footer } from "@/components";
import { SearchEvent } from "@/libs";
import Link from "next/link";

export default function Event() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  const handleSearchEvent = async () => {
    try {
      const searchData = await SearchEvent({
        searchTitle: title,
        onPage: page,
      });
      setData(searchData?.data);
      // console.log(searchData?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= data?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchEvent();
    }
  };

  useEffect(() => {
    handleSearchEvent();
  }, [page]);
  return (
    <>
      <div className="sticky top-0 bg-[#fad74f] rounded-b-3xl z-50">
        <div className="container w-11/12 sm:w-10/12 mx-auto">
          <Header />
        </div>
      </div>
      <div className="mx-auto container w-11/12 pt-10">
        <div>
          <Image
            src={"/images/login.jpg"}
            alt="event-pic"
            width={1000}
            height={1000}
            className="max-h-96 rounded-2xl object-cover w-full shadow"
          />
        </div>
        <div className="mx-auto container w-1!/12">
          <div className="mb-10">
            <h1 className="mt-10 mb-5 font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-700">
              NEW EVENTS
            </h1>
            <div className="flex justify-end">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="p-4 text-md w-1/2 mb-3 rounded-lg border outline-none border-2 border-[#fad74f]"
                placeholder="Cari judul, enter"
              />
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl">
              {data?.rows?.map((item, index) => {
                return (
                  <Link href={`/event/${item.article_id}`} key={index}>
                    <EventCard
                      onImage={
                        item.image ===
                        ("null" || null || undefined || "undefined")
                          ? "/images/noimage.png"
                          : item.image
                      }
                      onTags={item.tags}
                      onTitle={item.title}
                      onPost={item.post_article}
                      onAuthor={item.username}
                    />
                  </Link>
                );
              })}
            </div>
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
        </div>
      </div>
      <div className="rounded-t-3xl mx-auto container bg-[#fad74f]">
        <div className="container mx-auto w-11/12 sm:w-10/12 py-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
