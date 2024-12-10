import React, { useState } from "react";
import NavBar from "../NavBar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/footer";
import toast, { Toaster } from "react-hot-toast";
export default function LayOut() {
  return (
    <>
      
        <NavBar />
        <div className="min-h-screen flex flex-col justify-between">
          <div className="mt-[68px]  py-10 flex-grow relative ">
            <Outlet />
          </div>
          <Footer />
        </div>
        <Toaster position="top-center" reverseOrder={false}  />
   
    </>
  );
}
