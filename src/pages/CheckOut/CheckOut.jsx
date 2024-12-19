import axios from "axios";
import { useFormik } from "formik";

import React, { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/token.context";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/cart.context";
import { useNavigate } from "react-router-dom";


export default function CheckOut() {
  // navigat hooke that you can make auto navigate 
    let navigate = useNavigate();
    // get some state from context
    let {cartId,setCarts} = useContext(cartContext);
    let {token} = useContext(tokenContext);
    let [payment, setPayment] = useState("")

//  online payment with 
async function  onlinePayment(values){
    try{
       const options = {
           url : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://${location.origin}`,
           method: "POST",
           headers : {
               token
           },
           data : values
      }
       let {data} = await axios(options);
       console.log(data)
       if(data.status == "success"){
        // if data status is success change the location to url that come from backend that tell me when finsih online payment please return to this url
            location.href = data.session.url;
       }
    }catch(error){
           toast.error(`faild to send your cart` )
        
    }
   }
//   cash pament funcition
    async function  cashPayment(values){
     let toastLoad =    toast.loading("Check your order .... ");
     try{
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            method: "POST",
            headers : {
                token
            },
            data : values
       }
        let {data} = await axios(options);
        if(data.status == "success"){
          // if success request please navigate to home page after 2s
            setTimeout(()=>{
                navigate("/")
            },2000)
        }
        toast.success("Seccess your order arrived to us")
     }catch(error){
            toast.error(`faild to send your cart` )
         
     }finally{
        toast.dismiss(toastLoad)
     }
    }
    // formik library  to make form change from uncontroled to controled 
  let formik =   useFormik({
        initialValues:{
            shippingAddress:{details:"",phone:"",city:""}
        },
        onSubmit: function(values){
          // if payment online please excute onlinepayment func and else please excute cashpyment func
           payment == "online"? onlinePayment(values) : cashPayment(values);
          //  after payment set Carts to 0 that make change in state that written in cartContext
            setCarts(0);
            
        }
    })
  return (
    <>
      <div className="container">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              value={formik.values.shippingAddress.phone}
              name="shippingAddress.phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_tel"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
             />
            <label
              htmlFor="floating_tel"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={formik.values.shippingAddress.city}
              name="shippingAddress.city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
             />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your City
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              value={formik.values.shippingAddress.details}
              name="shippingAddress.details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
             />
            <label
              htmlFor="floating_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
          </div>
          <div className="payment ">
          <button className="btn" onClick={()=>setPayment("cash")}>cash payment</button>
          <button className="btn"  onClick={()=>setPayment("online")}>online payment</button>
          </div>
        </form>
      </div>
    </>
  );
}
