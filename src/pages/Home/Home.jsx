import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product/Product.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import SliderHome from "../../components/SliderHome.jsx";
import SliderCategories from "../../components/SliderCategories/SliderCategories.jsx";
import { useQuery } from "@tanstack/react-query";
import SideBar from "../../components/Sidebar/SideBar.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  let [filterProducts, setFilterProducts] =  useState(null);
 

  async function allProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products ");
  }

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["Allproducts"],
    queryFn: allProducts,
    staleTime: 20000,
    gcTime: 20000,
    select: (data) => data.data.data,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <SliderHome />
      <SliderCategories />

      <div className="popular"></div>
      <div className="loader mb-7"></div>
      <SideBar products={data} setFilterProducts={setFilterProducts} />
      <section className=" relative items-start gap-1">
        {filterProducts && filterProducts.length ==0 ? <div className='border border-green-400 p-8 '>
            No products in this category Now You can see all products  <span className='text-green-400 underline uppercase text-lg cursor-pointer' onClick={()=>setFilterProducts(data)}>All products</span>
          </div>:""}
        <main className=" cards grid justify-center gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!filterProducts?data.map((product) => (
            <Product key={product._id} product={product} />
          )):filterProducts.map((product)=>(
            <Product key={product._id} product={product} />
          ))}
        </main>
      </section>
    </div>
  );
}
