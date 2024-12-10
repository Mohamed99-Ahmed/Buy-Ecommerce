import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const spececCatag = createContext(0);
export default function SpeceficCategory({children}) {
    const [productsCatag, setproductsCatag] = useState(null);
    async function getSpesProducts(id){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
        setproductsCatag(data.data)
    }
  return (
    <>
        <spececCatag.Provider value={{getSpesProducts,productsCatag}} >
            {children}
        </spececCatag.Provider>
    </>
  )
}
