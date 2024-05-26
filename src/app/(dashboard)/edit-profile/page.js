'use client'
import React, { useEffect, useState } from "react";
import MenuDashboard from "@/components/menu-dashboard/menu-dashboard";
import { PrivateRoute } from "@/context/page";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [photoUpload, setPhotoUpload] = useState(null);
  const [inputUser, setInputUser] = useState({
    username: "",
    password: "",
    email: "",
    photo: "",
  });
  const [initialUser, setInitialUser] = useState(null);

  const GetDetailUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const EditDetailUser = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3001/edit/user`,
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
      }).then(() => window.location.reload());
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", inputUser.username);
    if (inputUser.password && inputUser.password.trim() !== "") {
      formData.append("password", inputUser.password);
    }
    formData.append("photo", photoUpload);
    const response = await EditDetailUser(formData);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
    }
  };

  const handleGetDetailUser = async () => {
    const response = await GetDetailUser();
    setInitialUser(response.data); // Set initial user data fetched from the server
    setInputUser({
      username: response.data.username,
      photo: response.data.photo,
      email: response.data.email,
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputUser({ ...inputUser, [name]: value });
  };

  const handleChangePhoto = (e) => {
    setPhotoUpload(e.target.files[0]);
    e.target.files[0] &&
      setInputUser({
        ...inputUser,
        photo: URL.createObjectURL(e.target.files[0]),
      });
  };

  useEffect(() => {
    handleGetDetailUser();
  }, []);

  // Function to check if there are changes in input fields
  const hasChanges = () => {
    if (!initialUser) return true; // Return true if initial user data is not fetched yet
    return Object.keys(inputUser).some(
      (key) => inputUser[key] !== initialUser[key]
    );
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
              <div className="flex justify-center">
                <label htmlFor="file" className="block">
                  *Photo max 5 MB
                  {inputUser.photo !== "null" &&
                  inputUser.photo !== "" &&
                  inputUser.photo !== null ? (
                    <Image
                      src={inputUser?.photo}
                      alt="Preview"
                      className="mb-5 rounded-md border border-gray-300 w-60 h-60 rounded-lg object-cover"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src={
                        (photoUpload && inputUser?.photo) ||
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
              </div>
              <div className="flex flex-col gap-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={inputUser.username}
                  onChange={handleChangeInput}
                  placeholder="Masukan username"
                  className="p-3 rounded-md outline-none border"
                />
                <label>Email</label>
                <input
                  disabled="true"
                  type="email"
                  name="email"
                  value={inputUser.email}
                  onChange={handleChangeInput}
                  placeholder="Masukan email"
                  className="p-3 rounded-md outline-none border text-gray-400"
                />
                <label>New Password</label>
                <input
                  type="password"
                  name="password"
                  value={inputUser.password}
                  onChange={handleChangeInput}
                  placeholder="Masukan password baru"
                  className="p-3 rounded-md outline-none border"
                />
                <button
                  className={`p-3 ${
                    loading || !hasChanges()
                      ? "bg-gray-300 hover:none"
                      : "bg-[#dc0000] hover:bg-green-400"
                  }  rounded-md font-bold text-white transition duration-500 ease-in-out`}
                  onClick={handleEditUser}
                  disabled={loading || !hasChanges()} // Disable button if there are no changes
                >
                  {loading ? "Mengupload..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
