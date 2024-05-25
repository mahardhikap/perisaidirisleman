"use client";
import React from "react";
import MenuDashboard from "@/app/menu-dashboard/menu-dashboard";
import { PrivateRoute } from "@/context/page";

export default function EditProfile() {
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
                <div className="w-40 h-60 bg-slate-200 rounded-xl mb-5">
                  image
                </div>
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
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
