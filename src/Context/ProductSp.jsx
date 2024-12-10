import axios from 'axios';
import React, { createContext, useState } from 'react'

export const ProductSp = createContext(0);
export default function ProductProvider({children}) {
   const [productItem, setProductItem] = useState(null)

   const [relatedProduct, setRelatedProduct] = useState(null)

    async function getSpProduct(id){
      try{
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductItem(data.data);
      }catch(error){
        console.log(error)
       
      }
    }
    async function getRelatedProducts(id){
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
        method:"GET",
      }
      let {data} = await axios(options);
      setRelatedProduct(data.data);
    }
  
  return (
    <>
        <ProductSp.Provider value={{getSpProduct,productItem,getRelatedProducts,relatedProduct}} >
            {children}
        </ProductSp.Provider>
    </>
  )
}
