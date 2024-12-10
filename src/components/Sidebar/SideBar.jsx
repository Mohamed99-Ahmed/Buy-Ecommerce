import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function SideBar({products,setFilterProducts,filterProducts}) {
    let [openCateg , setOpenCateg]= useState(null);
    let [category, setCategory] = useState(null)
    //! function of handleform of search by category
    function handleForm(e){
      e.preventDefault();
      let filterProducts = products.filter((product)=>{return product.category.name.toLowerCase() == category.toLowerCase()})
      setFilterProducts(filterProducts)
      setOpenCateg(!openCateg)
    }
    //! search function by name of category 
    function search(value){
      //  if you type in search inputs change in filter products
       if(value !== ""){
        let filterProducts =    products.filter((product)=>{return  product.title.toLowerCase().includes(`${value.toLowerCase()}`)})
        setFilterProducts(filterProducts);
        // else return filter product to null
       }
    }
    //! get All categories function
    async function allCategories() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories ");
      }
      let { data, isLoading, isError } = useQuery({
        queryKey: ["allCategories"],
        queryFn: allCategories,
        staleTime: 20000, // The fetch wil be slate from fresh after ...ms and will get fech from start if you leave page and comeback but the data not disappear
        gcTime: 20000, // wiil remove all fetch data and start form begin
        select: (data) => data.data.data, //the data.data.data wil be in state name is products  (كاني مستخدمتش المكتبة دية)
      });
  return (
    <>
      <div className="  sticky top-[76px] z-[10] bg-white  shadow-product mb-6 p-2 ">
        <div className="search space-y-2">
        <input
          type="text"
          className="rounded-lg p-2 max-w-full focus:outline-none text-black border border-gray-600 "
          placeholder="serch by name"
          onChange={(e)=>search(e.target.value)}
        />
       
        </div>
        <form className="category space-y-4 mt-2" onSubmit={handleForm}>
          <h3 className=" font-semibold text-gray-900 flex items-center justify-between">
            Category
       
           {openCateg?<i class="fa-solid fa-arrow-up p-2 border border-gray-200 rounded-lg cursor-pointer" onClick={()=>setOpenCateg(!openCateg)}></i>
           : <i class="fa-solid fa-arrow-down p-2 border border-gray-200 rounded-lg cursor-pointer" onClick={()=>setOpenCateg(!openCateg)}></i>}
            </h3>
        {openCateg ? <div >
            
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {data?.map((product)=>{return<div className="item  items-center  flex gap-1 md:gap-3 line-clamp-2  p-1 md:p-2 rounded-md border-sm border " >
                  <p className=""><input type="radio"   name="category"  onChange={(e)=>{setCategory(e.target.value)}}  id={product.name}   value={product.name} /></p>
                  <label  className="grow cursor-pointer capitalize text-sm md:text-lg font-semibold whitespace-nowrap "  htmlFor={product.name} > {product.name}</label>
                </div>
            })}
          </ul>
           
        <button type="submit" className="btn cursor-pointer mt-4">seach categ</button>
        </div>:""}
        </form>
      </div>
    </>
  );
}
