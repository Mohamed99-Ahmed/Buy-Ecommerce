import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';

export const wishList = createContext(0);
export default function WishListProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [numProductWish, setNumProductWish] = useState(0)
   async function addProductToWishList(id){
    let load;
      try{
        load = toast.loading("waiting to add data to WishList ......")
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/wishlist`,
            method: "POST",
            headers:{
                token
            },
            data :{
                productId: id
            } 
        }
        let {data} = await axios(options);
        setNumProductWish(data.data.length)
        toast.dismiss(load)
        toast.success(" product has successfully added to wishlist")
      }catch(error){
        console.log(error)
      }finally{ 
        toast.dismiss(load)
      }
   }

   async function getAllProductWishList(){
    try{
      const options = {
        url : "https://ecommerce.routemisr.com/api/v1/wishlist",
        method : "GET",
        headers : {
          token
        }
      }
       let {data} = await axios(options);
       setNumProductWish(data.count)
       return data
    }catch(error){
      console.log(error)
    }
   }
   async function delProductToWishList(id){
    try{
      let load = toast.loading("waiting to delete product from your WishList ......")
      const options = {
          url : `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
          method: "DELETE",
          headers:{
              token
          },
      }
      let {data} = await axios(options);
      console.log(data)
      // when product changes please change in number of product in wishlist
      setNumProductWish(data.data.length)
      toast.dismiss(load)
      toast.success(" product has been deleted from wishlist ")
    }catch(error){
      console.log(error)
    }finally{
      toast.dismiss(load)
    }
 }

  return (
    <>
        <wishList.Provider value={{token,setNumProductWish,addProductToWishList,getAllProductWishList,numProductWish,delProductToWishList}} >
            {children}
        </wishList.Provider>
    </>
  )
}