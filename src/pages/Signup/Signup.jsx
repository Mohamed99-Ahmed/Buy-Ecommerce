import React, { useContext } from "react";
import { useFormik } from "formik"; // Fix the import
import * as Yup from "yup"
import  axios  from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/token.context";

export default function SignUp() {
  const{setUserData} = useContext(tokenContext)
  let navigate = useNavigate()
let validationSchema = Yup.object({
  name: Yup.string().required("Your Name is required").min(5, "At least 5 letters").max(20, "maxiumum 20 letters in your name"),
  email: Yup.string().required("Your Email is required").email("Not Valid email"),
  password: Yup.string().required("password  is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,"At least One (UpperCase , LowerCase , degit, character space) and at least 8 letters"),
  rePassword: Yup.string().required("Re-password  is required").oneOf([Yup.ref("password")],"Repassword must be like password"),
  phone: Yup.string().required("phone is required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,"Your phone is not valid")
})
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema ,
    onSubmit:async function(values){
      console.log(values);
      setUserData(values);
      let loadToast;
       try{
         loadToast = toast.loading("Send Your Data")
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
        toast.dismiss(loadToast);
        toast.success("Seccess data")
        setTimeout(()=>{
          navigate("/auth/login")
        },3000)
        console.log(res)
       }catch(error){
         toast.dismiss(loadToast)
        console.log(error.response.data.message)
        formik.errors.email = `${error.response.data.message}`
         toast.error("this is error ")
       };
       

    },
  });
  return (
    <>
      <div className="container flex justify-center  items-center ">
        <form className="w-full px-8 lg:w-2/3 " onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={formik.values.name}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          {formik.touched.name && formik.errors.name? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.name}</p>:""}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          {formik.touched.email && formik.errors.email? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.email}</p>:""}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.touched.password && formik.errors.password? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.password}</p>:""}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm re-password
            </label>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.rePassword}</p>:""}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
          {formik.touched.phone && formik.errors.phone? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.phone}</p>:""}
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
