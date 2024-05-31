"use client";
import MenuDashboard from "@/components/menu-dashboard/menu-dashboard";
import { PrivateRoute } from "@/context/page";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => import("../../../components/custom-editor.js"),
  { ssr: false }
);

export default function AddEvent() {
  const [loading, setLoading] = useState(false)
  const [inputEvent, setInputEvent] = useState({
    title: "",
    post_article: "",
    tags: "",
    image: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const router = useRouter();

  const AddEventDashboard = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/add/article`,
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
      setLoading(false)
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      throw error;
    } finally {
      setLoading(false)
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputEvent.title);
    formData.append("post_article", inputEvent.post_article);
    formData.append("tags", inputEvent.tags);
    formData.append("image", imageUpload);
    const response = await AddEventDashboard(formData);
    setInputEvent({ title: "", post_article: "", tags: "", image: "" });
    if (response.status === 201) {
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
                *Image max 5 MB
                <Image
                  src={
                    (imageUpload && inputEvent.image) || "/images/noimage.png"
                  }
                  alt="Preview"
                  className="mb-5 rounded-md border border-gray-300 w-96 h-60 rounded-lg object-cover"
                  width={500}
                  height={500}
                />
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
                  className="p-3 outline-none bg-white rounded-md w-full border"
                />
                <label>Artikel</label>
                <CustomEditor
                  initialData={inputEvent.post_article}
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
                  className="p-3 outline-none bg-white rounded-md w-full border"
                />
                <button
                  className={`p-3 ${loading ? 'bg-gray-300 hover:none' : 'bg-[#dc0000] hover:bg-green-400'}  rounded-md font-bold text-white transition duration-500 ease-in-out`}
                  onClick={handleAddEvent}
                  disabled={loading}
                >
                  {loading ? 'Mengupload...' : 'Tambahkan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
