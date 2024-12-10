import React, { useContext, useEffect, useState } from "react";
import imgProfile from "../../assets/images/profileUpdate.svg";
import { tokenContext } from "../../Context/token.context";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup"
import toast from "react-hot-toast";
import axios from "axios";
export default function Profile() {
  let { token,userName,setUserName } = useContext(tokenContext);
 
  let vlaidateData = Yup.object({
    email: Yup.string().required("Your Email is required").email("Not Valid email"),
    name: Yup.string().required("Your Name is required").min(5, "At least 5 letters").max(20, "maxiumum 20 letters in your name"),
    phone: Yup.string().required("phone is required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,"Your phone is not valid")

  });
  let validatePassword = Yup.object({
    currentPassword: Yup.string().required("password  is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,"At least One (UpperCase , LowerCase , degit, character space) and at least 8 letters"),
    password :  Yup.string().required("password  is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,"At least One (UpperCase , LowerCase , degit, character space) and at least 8 letters"),
    rePassword: Yup.string().required("Re-password  is required").oneOf([Yup.ref("password")],"Repassword must be like password"),
  })
  let [closeLockData, setCloseLockData] = useState(true);
  let [openLockPass, setOpenLockPass] = useState(true);
  let formikPass = useFormik({
    initialValues: {
      currentPassword:"",
      password:"",
      rePassword:""
    },
    validationSchema:validatePassword,
    onSubmit : async(values)=>{
      let loadToast;
      try{
        loadToast = toast.loading("Send Your new Data")
        const options = {
          url:"https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
          method:"PUT",
          headers:{
            token
          },
          data:{
            currentPassword: values.currentPassword, // Ensure it's being sent
            password: values.password,
            rePassword: values.rePassword
          }
        }
       let {data} = await axios.request(options);
       console.log(data)
       toast.dismiss(loadToast);
       toast.success("Seccess Update Your Paswword")
      
      }catch(error){
        toast.dismiss(loadToast)
        toast.error("this is error ")
        console.log(error)
      };
      
    }
  });
  
  let formikData = useFormik({
    initialValues: {
      name: `${ userName }`,
      email: "",
      phone: "",
    },
    validationSchema:vlaidateData,
    onSubmit : async(values)=>{
      let loadToast;
      try{
        loadToast = toast.loading("Send Your Data")
        const options = {
          url:"https://ecommerce.routemisr.com/api/v1/users/updateMe/",
          method:"PUT",
          headers:{
            token
          },
          data:{
            name: values.name,
            email: values.email,
            phone: values.phone
          }
        }
       let {data} = await axios.request(options);
       console.log(data)
       setUserName(data.user.name)
       toast.dismiss(loadToast);
       toast.success("Seccess Update Your Data")
      
      }catch(error){
        toast.dismiss(loadToast)
        toast.error("this is error ")
        console.log(error)
      };
      
    }
  });
  return (
    <section className="profile container grid md:grid-cols-2 gap-4 items-start">
      <img src={imgProfile} alt="w-full" className="hidden md:block" />
      <div className="forms space-y-12">
        <h1 className="font-bold text-center text-gray-800 mb-8 capitalize text-2xl">
          Hello {userName}
        </h1>
        <form className="w-full space-y-8" onSubmit={formikData.handleSubmit}>
          <legend className="text-md font-semibold capitalize">
            Change Your profile data :{" "}
          </legend>
          <div className="flex gap-4 items-center">
            <label
              htmlFor="email"
              className="text-sm text-gray-500 whitespace-nowrap "
            >
              new-Email :
            </label>
            <input
              disabled={closeLockData ? true : false}
              type="email"
              name="email"
              value={formikData.values.email}
              onChange={formikData.handleChange}
              onBlur={formikData.handleBlur}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {closeLockData ? (
              <i class="fa-solid fa-lock"></i>
            ) : (
              <i class="fa-solid fa-lock-open text-green-400"></i>
            )}
          </div>
          {formikData.touched.email && formikData.errors.email? <p className="error text-red-600 m-4 capitalize"> * {formikData.errors.email}</p>:""}
        
          <div className="flex gap-4 items-center">
            <label
              htmlFor="name"
              className="text-sm text-gray-500 whitespace-nowrap "
            >
              Name :
            </label>
            <input
              disabled={closeLockData ? true : false}
              value={formikData.values.name}
              name="name"
              onChange={formikData.handleChange}
              onBlur={formikData.handleBlur}
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder={userName}
            />
            {closeLockData ? (
              <i class="fa-solid fa-lock"></i>
            ) : (
              <i class="fa-solid fa-lock-open text-green-400"></i>
            )}
          </div>
          {formikData.touched.name && formikData.errors.name? <p className="error text-red-600 m-4 capitalize"> * {formikData.errors.name}</p>:""}
          <div className="flex gap-4 items-center">
            <label
              htmlFor="phone"
              className="text-sm text-gray-500 whitespace-nowrap "
            >
              Phone :
            </label>
            <input
              disabled={closeLockData ? true : false}
              type="tel"
              name="phone"
              value={formikData.values.phone}
              onChange={formikData.handleChange}
              onBlur={formikData.handleBlur}
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {closeLockData ? (
              <i class="fa-solid fa-lock"></i>
            ) : (
              <i class="fa-solid fa-lock-open text-green-400"></i>
            )}
          </div>
          {formikData.touched.phone && formikData.errors.phone? <p className="error text-red-600 m-4 capitalize"> * {formikData.errors.phone}</p>:""}
          <footer className="flex gap-3">
            <button  className="btn">
              Update Data
            </button>
            <sapn
              className="btn flex justify-between gap-4 p-3 cursor-pointer"
              onClick={() => {
                setCloseLockData(!closeLockData);
              }}
            >
              open lock <i class="fa-solid fa-lock"></i>
            </sapn>
          </footer>
        </form>
        <form className="w-full space-y-8" onSubmit={formikPass.handleSubmit}>
          <legend className="text-md font-semibold capitalize">
            Update Your Password :{" "}
          </legend>
          <div className="flex gap-4 items-center">
            <label
              htmlFor="currentPassword"
              className="text-sm text-gray-500 whitespace-nowrap "
            >
              Current Password :
            </label>
            <input
              disabled={openLockPass ? true : false}
              type="password"
              name="currentPassword"
              value={formikPass.values.currentPassword}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleBlur}
              id="currentPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            {openLockPass ? (
              <i class="fa-solid fa-lock"></i>
            ) : (
              <i class="fa-solid fa-lock-open text-green-400"></i>
            )}
          </div>
          {formikPass.touched.currentPassword && formikPass.errors.currentPassword? <p className="error text-red-600 m-4 capitalize"> * {formikPass.errors.currentPassword}</p>:""}

          <div className="flex gap-4 items-center">
            <label
              htmlFor="password"
              className="text-sm text-gray-500 whitespace-nowrap "
            >
              New Password :
            </label>
            <input
              disabled={openLockPass ? true : false}
              type="password"
              name="password"
              value={formikPass.values.password}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleBlur}
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            {openLockPass ? (
              <i class="fa-solid fa-lock"></i>
            ) : (
              <i class="fa-solid fa-lock-open text-green-400"></i>
            )}
          </div>
          {formikPass.touched.password && formikPass.errors.password? <p className="error text-red-600 m-4 capitalize"> * {formikPass.errors.password}</p>:""}

          <div className="flex gap-4 items-center">
            <label
              htmlFor="rePassword"
              className="text-sm text-gray-500 whitespace-nowrap "
            >
              Re-Password :
            </label>
            <input
              type="password"
              disabled={openLockPass ? true : false}
              name="rePassword"
              value={formikPass.values.rePassword}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleBlur}
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            {openLockPass ? (
              <i class="fa-solid fa-lock"></i>
            ) : (
              <i class="fa-solid fa-lock-open text-green-400"></i>
            )}
          </div>
          {formikPass.touched.rePassword && formikPass.errors.rePassword? <p className="error text-red-600 m-4 capitalize"> * {formikPass.errors.rePassword}</p>:""}

          <footer className="flex gap-3">
            <button type="submit" className="btn">
              Update Password
            </button>
            <span
              className="btn flex justify-between gap-4 p-3 cursor-pointer"
              onClick={() => {
                setOpenLockPass(!openLockPass);
              }}
            >
              open lock <i class="fa-solid fa-lock"></i>
            </span>
          </footer>
        </form>
      </div>
    </section>
  );
}
