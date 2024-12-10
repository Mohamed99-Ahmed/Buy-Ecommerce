import React, { useContext, useState } from "react";
import { spececCatag } from "../../Context/SpeceficCategory";
import Loading from "../../components/Loading/Loading";
import Product from "../../components/Product/Product";

export default function Categories() {
  const { productsCatag } = useContext(spececCatag);
  console.log(productsCatag);
  return (
    <>
      <section className="container">
        {productsCatag ? 
          <main className="col-span-6 md:col-span-8 lg:col-span-9 cards grid justify-center gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {  productsCatag.map((product) => {
            return (
             
                <Product key={product._id} product={product} />
           
            );
          })}
          </main>
            : (
          <Loading></Loading>
        )}
      </section>
    </>
  );
}
