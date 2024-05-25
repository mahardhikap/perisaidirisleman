'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignIn() {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };
  const LoginUser = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3001/login`, data);
      return response.data; // Mengembalikan data yang diterima dari panggilan API
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
    }
  };
  const handleLogin = async () => {
    const resultLogin = await LoginUser(dataLogin);
    localStorage.setItem('user_id', resultLogin?.data?.user_id);
    localStorage.setItem('token', resultLogin?.data?.token);
    localStorage.setItem('username', resultLogin?.data?.username);
    router.replace('/list-event');
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 h-screen">
        <div className="flex justify-center items-center col-span-2">
          <Image
            src={'/images/login.jpg'}
            alt="pd-pic-login"
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center col-span-1 rounded-none sm:rounded-l-2xl bg-[#fad74f] border-none ms-0 sm:ms-[-50px]">
          <div className="rounded-t-2xl sm:rounded-none w-full bg-[#fad74f] border-none mt-[-100px] sm:mt-0">
            <div className="flex flex-col w-full p-2 gap-5">
              <div className="flex items-center flex-col">
                <Image
                  src={'/images/pdlogo.svg'}
                  alt="logo-login"
                  width={100}
                  height={100}
                />
                <p className="text-center font-bold text-2xl text-white">
                  Sign In
                </p>
              </div>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="p-3 rounded-lg outline-none"
                value={dataLogin.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                className="p-3 rounded-lg outline-none"
                value={dataLogin.password}
                onChange={handleInputChange}
              />
              <button
                className="p-3 bg-[#dc0000] rounded-lg font-bold text-white hover:bg-green-400 transition duration-500 ease-in-out"
                onClick={() => handleLogin()}
              >
                SUBMIT
              </button>
              <Link href={'/'}>
                <p className="text-center text-sm font-light hover:text-blue-500 cursor-pointer transition duration-500 ease-in-out">
                  &larr; Kembali ke Home
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
