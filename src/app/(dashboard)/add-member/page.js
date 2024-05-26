"use client";
import MenuDashboard from "@/components/menu-dashboard/menu-dashboard";
import { PrivateRoute } from "@/context/page";
import React, { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMember() {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter()
  const [inputMember, setInputMember] = useState({
    fullname: "",
    id_number: "",
    birth: "",
    grade: "",
    motto: "",
    photo: "",
  });
  const [photoUpload, setPhotoUpload] = useState(null);

  const AddMemberDashboard = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/add/member`,
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
      setLoading(false);
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", inputMember.fullname);
    formData.append("id_number", inputMember.id_number);
    formData.append("birth", inputMember.birth);
    formData.append("grade", inputMember.grade);
    formData.append("motto", inputMember.motto);
    formData.append("photo", photoUpload);
    const response = await AddMemberDashboard(formData);
    setInputMember({
      fullname: "",
      id_number: "",
      birth: "",
      grade: "",
      motto: "",
      photo: "",
    });
    if(response.status === 201){
      navigate.push('/list-member')
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
  return (
    <PrivateRoute>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 p-5">
          <div className="col-span-1 bg-white rounded-lg h-fit sticky top-0">
            <MenuDashboard />
          </div>
          <div className="col-span-3 pt-5 lg:p-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="file" className="block">
              *Photo max 5 MB
                <Image
                  src={
                    (photoUpload && inputMember.photo) || "/images/noimage.png"
                  }
                  alt="Preview"
                  className="mb-5 rounded-md border border-gray-300 w-60 h-60 rounded-lg object-cover"
                  width={100}
                  height={100}
                />
              </label>
              <input
                id="file"
                type="file"
                name="photo"
                accept=".png, .jpg, .jpeg, .jfif, .webp"
                onChange={handleChangePhoto}
                className="hidden"
              />
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="fullname"
                value={inputMember.fullname}
                onChange={handleChangeInput}
                className="p-3 rounded-md border"
                placeholder="Masukan nama lengkap"
              />
              <label>Nomor Induk</label>
              <input
                type="text"
                name="id_number"
                value={inputMember.id_number}
                onChange={handleChangeInput}
                className="p-3 rounded-md border"
                placeholder="Masukan nomor induk"
              />
              <label>Tempat, Tanggal Lahir</label>
              <input
                type="text"
                name="birth"
                value={inputMember.birth}
                onChange={handleChangeInput}
                className="p-3 rounded-md border"
                placeholder="Masukan tempat, tanggal lahir"
              />
              <label>Tingkatan</label>
              <select
                name="grade"
                value={inputMember.grade}
                onChange={handleChangeInput}
                className="p-3 rounded-md border"
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
              <label>Motto</label>
              <input
                type="text"
                name="motto"
                value={inputMember.motto}
                onChange={handleChangeInput}
                placeholder="Masukan motto hidup (Max 100 huruf)"
                className="p-3 rounded-md border"
                maxLength={100}
              />
              <button
                className={`p-3 ${
                  loading
                    ? "bg-gray-300 hover:none"
                    : "bg-[#dc0000] hover:bg-green-400"
                }  rounded-md font-bold text-white transition duration-500 ease-in-out`}
                onClick={handleAddMember}
                disabled={loading}
              >
                {loading ? "Mengupload..." : "Tambahkan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
