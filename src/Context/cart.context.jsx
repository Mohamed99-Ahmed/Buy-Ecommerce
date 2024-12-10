import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { tokenContext } from './token.context';
import toast from 'react-hot-toast';

export const cartContext = createContext(0);
export default function CartContext({children}) {
    const {token}  = useContext(tokenContext)
    const [carts, setCarts] = useState(null);
    const [totalPrice,setTotalPrice] = useState(0)
    const [cartId, setCartId] = useState(0)
    // Add Product  to cart function
     async function addTocCart(productId){
        try{
            let x = toast.loading("Waiting to send .....")
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers:{
                    token 
                },
                data:{
                    productId
                }
            }
            let {data} = await axios.request(options);
            toast.dismiss(x)
            if(data.status == "success"){
                setCarts(data.data.products)
                toast.success(data.message);
              
            }   
        }catch(error){
            toast.error("please try add your product again")

            toast.dismiss(x);
        }
    }
    // get All carts
    async function getUserCarts(){
        try{
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers:{
                    token 
                },
            }
            let {data} = await axios.request(options);
            setCartId(data.cartId)
            setCarts(data.data.products);
            setTotalPrice(data.data.totalCartPrice)
       
        }catch(error){
            console.log(error);
        }
    }
    // change number of cart in order
    async function quantityCart({id,count}){
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "PUT",
                headers:{
                    token 
                },
                data:{
                     count
                }
            }
            let {data} = await axios.request(options);
              if(data.status == s)
            if(data.status == "success"){
                setCarts(data.data.products);
                setTotalPrice(data.data.totalCartPrice);
                setCartId(data.cartId);
            }
      
            
            return data
       
        }catch(error){
            console.log(error);
        }
    }
    // delete cart from carts
    async function deleteCart(id){
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "DELETE",
                headers:{
                    token 
                },
              
            }
            let {data} = await axios.request(options);
            if(data.status == "success"){
                setCartId(data.cartId)
            }
               if(data.status == "success"){
                toast.success("seccessed deleted product from your cart")
                setTotalPrice(data.data.totalCartPrice);
                setCarts(data.data.products)
               }
                
            
        }catch(error){
           toast.error(error);
        }
    }
    // delete all carts
    async function deleteCarts(){
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: "DELETE",
                headers:{
                    token 
                },
              
            }
            let {data} = await axios.request(options);
             setCartId(0)
            // setCartId(data.cartId)
                toast.success("Delete all cart successfuly");
                getUserCarts()
                
        }catch(error){
           console.log(error)
        }
    }
  return (
    <>
        <cartContext.Provider value={{addTocCart,quantityCart,carts,getUserCarts,totalPrice,deleteCart,deleteCarts,cartId,setCarts}} >
            {children}
        </cartContext.Provider>
    </>
  )
}