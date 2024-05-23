import React from 'react';

export default function FormProfile() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-40 h-60 bg-slate-200 rounded-xl mb-5">image</div>
      </div>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className="p-3 rounded-md outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-md outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-md outline-none"
        />
        <button className="p-3 bg-[#dc0000] rounded-md font-bold text-white hover:bg-green-400 transition duration-500 ease-in-out">
          Update Profile
        </button>
      </div>
    </div>
  );
}
