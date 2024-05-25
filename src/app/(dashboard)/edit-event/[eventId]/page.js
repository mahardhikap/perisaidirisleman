"use client";
import MenuDashboard from "@/components/menu-dashboard/menu-dashboard";
import { PrivateRoute } from "@/context/page";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const CustomEditor = dynamic(
  () => import("../../../../components/ckeditor/custom-editor"),
  { ssr: false }
);

export default function AddEvent() {
  const params = useParams();
  const [detailData, setDetailData] = useState([]);
  const [inputEvent, setInputEvent] = useState({
    title: "",
    post_article: "",
    tags: "",
    image: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const router = useRouter();

  const GetDetailEvent = async (idEvent) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/article/${idEvent}`
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const EditEventDashboard = async (data, idEvent) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/edit/article/${idEvent}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      throw error;
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputEvent.title);
    formData.append("post_article", inputEvent.post_article);
    formData.append("tags", inputEvent.tags);
    formData.append("image", imageUpload);
    const response = await EditEventDashboard(formData, params.eventId);
    setInputEvent({ title: "", post_article: "", tags: "", image: "" });
    if (response.status === 200) {
      router.push("/list-event");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputEvent({ ...inputEvent, [name]: value });
  };

  const handleChangeImage = (e) => {
    setImageUpload(e.target.files[0]);
    e.target.files[0] &&
      setInputEvent({
        ...inputEvent,
        image: URL.createObjectURL(e.target.files[0]),
      });
  };

  const handleGetDetailEvent = async () => {
    try {
      const response = await GetDetailEvent(params.eventId);
      if (response.status === 200) {
        console.log('ini isi response', response)
        setDetailData(response);
      } else {
        console.error("Required fields are missing in the response data.");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    handleGetDetailEvent();
  }, []);

  useEffect(() => {
    setInputEvent({
      ...inputEvent,
      title: detailData?.data?.title,
      post_article: detailData?.data?.post_article,
      tags: detailData?.data?.tags,
      image: detailData?.data?.image,
    });
  }, [detailData]);

  console.log("ini isi inputevent", inputEvent);

  return (
    <PrivateRoute>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 p-5">
          <div className="col-span-1 bg-white rounded-lg h-fit sticky top-0">
            <MenuDashboard />
          </div>
          <div className="col-span-3 pt-5 lg:p-5">
            <div>
              <label htmlFor="file">
                {inputEvent?.image !== "null" &&
                inputEvent?.image !== "" &&
                inputEvent?.image !== null ? (
                  <Image
                    src={inputEvent?.image}
                    alt="Preview"
                    className="mb-5 rounded-md border border-gray-300 w-96 h-60 rounded-lg object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={
                      (imageUpload && inputEvent?.image) || "/images/noimage.png"
                    }
                    alt="Preview"
                    className="mb-5 rounded-md border border-gray-300 w-96 h-60 rounded-lg object-cover"
                    width={100}
                    height={100}
                  />
                )}
              </label>
              <input
                id="file"
                type="file"
                accept=".png, .jpg, .jpeg, .jfif, .webp"
                name="image"
                onChange={handleChangeImage}
                className="hidden"
              />
              <div className="flex flex-col gap-3 mb-5">
                <label>Judul</label>
                <input
                  type="text"
                  name="title"
                  value={inputEvent.title}
                  onChange={handleChangeInput}
                  placeholder="Masukan judul"
                  className="p-3 outline-none bg-white rounded-md w-full"
                />
                <label>Artikel</label>
                <CustomEditor
                  initialData={detailData?.data?.post_article}
                  onChange={(data) =>
                    setInputEvent({ ...inputEvent, post_article: data })
                  }
                />
                <label>Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={inputEvent.tags}
                  onChange={handleChangeInput}
                  placeholder="Masukan hashtag"
                  className="p-3 outline-none bg-white rounded-md w-full"
                />
                <button
                  className="p-3 bg-[#dc0000] rounded-md font-bold text-white hover:bg-green-400 transition duration-500 ease-in-out"
                  onClick={handleEditEvent}
                >
                  Tambahkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
