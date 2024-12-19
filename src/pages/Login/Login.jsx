import React, { useContext } from "react";
import { useFormik } from "formik"; // Fix the import
import * as Yup from "yup"
import  axios  from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/token.context";


export default function Login() {
  // get token from tokenContext to use it in this component
 const {token, setToken}  = useContext(tokenContext)
  let navigate = useNavigate();
  // vlaidate schema to use it in formik validation and if it true you can submit function now
let validationSchema = Yup.object({
  email: Yup.string().required("Your Email is required").email("Not Valid email"),
  password: Yup.string().required("password  is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,"At least One (UpperCase , LowerCase , degit, character space) and at least 8 letters"),
})
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema ,  // this is come from yub validation
    // after validate you can send values to your api
    onSubmit:async function(values){
      let loadToast;
       try{
         loadToast = toast.loading("Send Your Data")
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
        toast.dismiss(loadToast);
        toast.success("Seccess User");
        // make token state equal to token that come from backend and in localstorage 
        setToken(data.token);
        localStorage.setItem("token", data.token);
        // after 3s of login success go to homepage  
        setTimeout(()=>{
          navigate("/")
        },3000)
       }catch(error){
         toast.dismiss(loadToast)
         toast.error("this is error ");
        //  if any error in response put this in errors.email to display to user 
        formik.errors.email = `${error.response.data.message}`
       };
       

    },
  });
  return (
    <>
      <div className="container flex justify-center  items-center min-h-screen">
        <form className="w-full px-8 lg:w-2/3 " onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.touched.email && formik.errors.email? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.email}</p>:""}
          {formik.touched.password && formik.errors.password? <p className="error text-red-600 m-4 capitalize"> * {formik.errors.password }</p>:""}
          <button type="submit" className="btn">
            Submit
          </button>
          <span className="ml-4">oR </span>
          <Link className="underline  text-lg text-gray-800"to="/auth/signup">signup</Link>
        </form>
      </div>
    </>
  );
}
