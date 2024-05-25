"use client";
import MenuDashboard from "@/app/menu-dashboard/menu-dashboard";
import { PrivateRoute } from "@/context/page";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditMember() {
  const params = useParams();
  const navigate = useRouter();
  const [inputMember, setInputMember] = useState({
    fullname: "",
    id_number: "",
    birth: "",
    grade: "",
    motto: "",
    photo: "",
  });
  const [photoUpload, setPhotoUpload] = useState(null);

  const GetDetailMember = async (idMember) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/member/${idMember}`
      );
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const EditDetailMember = async (idMember, data) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/edit/member/${idMember}`,
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
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", inputMember.fullname);
    formData.append("id_number", inputMember.id_number);
    formData.append("birth", inputMember.birth);
    formData.append("grade", inputMember.grade);
    formData.append("motto", inputMember.motto);
    formData.append("photo", photoUpload);
    const response = await EditDetailMember(params.memberId, formData);
    setInputMember({
      fullname: "",
      id_number: "",
      birth: "",
      grade: "",
      motto: "",
      photo: "",
    });
    if (response.status === 200) {
      navigate.push("/list-member");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputMember({ ...inputMember, [name]: value });
  };

  const handleChangePhoto = (e) => {
    setPhotoUpload(e.target.files[0]);
    e.target.files[0] &&
      setInputMember({
        ...inputMember,
        photo: URL.createObjectURL(e.target.files[0]),
      });
  };

  const handleGetDetailMember = async () => {
    const response = await GetDetailMember(params.memberId);
    setInputMember({
      fullname: response?.data?.fullname,
      id_number: response?.data?.id_number,
      birth: response?.data?.birth,
      grade: response?.data?.grade,
      motto: response?.data?.motto,
      photo: response?.data?.photo,
    });
  };

  useEffect(() => {
    handleGetDetailMember();
  }, []);
  return (
    <PrivateRoute>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 p-5">
          <div className="col-span-1 bg-white rounded-lg h-fit sticky top-0">
            <MenuDashboard />
          </div>
          <div className="col-span-3 pt-5 lg:p-5">
            <div className="flex flex-col gap-5">
              <label htmlFor="file" className="block">
                {inputMember.photo !== "null" &&
                inputMember.photo !== "" &&
                inputMember.photo !== null ? (
                  <Image
                    src={inputMember?.photo}
                    alt="Preview"
                    className="mb-5 rounded-md border border-gray-300 w-60 h-60 rounded-lg object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={
                      (photoUpload && inputMember?.photo) ||
                      "/images/noimage.png"
                    }
                    alt="Preview"
                    className="mb-5 rounded-md border border-gray-300 w-60 h-60 rounded-lg object-cover"
                    width={100}
                    height={100}
                  />
                )}
              </label>
              <input
                id="file"
                type="file"
                name="photo"
                accept=".png, .jpg, .jpeg, .jfif, .webp"
                onChange={handleChangePhoto}
                className="hidden"
              />
              <input
                type="text"
                name="fullname"
                value={inputMember.fullname}
                onChange={handleChangeInput}
                className="p-3 rounded-md"
                placeholder="Nama lengkap"
              />
              <input
                type="text"
                name="id_number"
                value={inputMember.id_number}
                onChange={handleChangeInput}
                className="p-3 rounded-md"
                placeholder="Nomor induk"
              />
              <input
                type="text"
                name="birth"
                value={inputMember.birth}
                onChange={handleChangeInput}
                className="p-3 rounded-md"
                placeholder="Tempat, tanggal lahir"
              />
              <select
                name="grade"
                value={inputMember.grade}
                onChange={handleChangeInput}
                className="p-3 rounded-md"
              >
                <option value="" disabled>
                  Pilih tingkatan
                </option>
                <option value="Dasar I">Dasar 1</option>
                <option value="Dasar II">Dasar 2</option>
                <option value="Calon Keluarga">Calon Keluarga</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Putih-Hijau">Putih-Hijau</option>
                <option value="Hijau">Hijau</option>
                <option value="Hijau-Biru">Hijau-Biru</option>
                <option value="Biru">Biru</option>
                <option value="Biru-Merah">Biru-Merah</option>
                <option value="Merah">Merah</option>
                <option value="Merah-Kuning">Merah-Kuning</option>
                <option value="Kuning (Pendekar Muda)">
                  Kuning (Pendekar Muda)
                </option>
                <option value="Kuning (Pendekar)">Kuning (Pendekar)</option>
              </select>
              <input
                type="text"
                name="motto"
                value={inputMember.motto}
                onChange={handleChangeInput}
                placeholder="Motto hidup (Max 100 huruf)"
                className="p-3 rounded-md"
              />
              <button
                className="p-3 bg-[#dc0000] rounded-md font-bold text-white hover:bg-green-400 transition duration-500 ease-in-out"
                onClick={handleEditMember}
              >
                Update Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
