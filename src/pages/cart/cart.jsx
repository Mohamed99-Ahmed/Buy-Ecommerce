import React, { useContext, useEffect, useState } from 'react'
import CartProduct from '../../components/CartProduct/CartProduct';
import { cartContext } from '../../Context/cart.context';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';

export default function Cart() {
  // Getting some state from cart context
  const {getUserCarts,carts,totalPrice,deleteCarts} = useContext(cartContext);
 
  // Getting all carts in Mounting phase of component
  useEffect(()=>{
   getUserCarts()
  },[])

  // if carts true display it and if false display loading untill data response
  return (
    <>
{carts?<section className="bg-white py-8 antialiased  md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">Shopping Cart</h2>
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <main className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <section className="carts space-y-6 "> 
          {carts.length == 0?<div className='border border-green-400 p-8'>
            No carts here please go to  <Link className='text-green-400 underline uppercase text-lg ' to="/">Home</Link>
          </div>:""}
          {carts.map((cart)=>{
            return(<CartProduct key={cart._id} cart={cart}/>)
          })}
          <div class="clear mt-4 text-center cursor-pointer">
          <span onClick={()=>{deleteCarts();}} class="btn ">Clear all carts</span>
          </div>
        </section>
        
      </main>
      
      <aside className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm ">
          <p className="text-xl font-semibold text-gray-900 ">Order summary</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">Original price</dt>
                <dd className="text-base font-medium text-gray-900 ">{totalPrice} EGY</dd>
              </dl>
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 ">Savings</dt>
                <dd class="text-base font-medium text-green-600">0 Egyp</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 ">Store Pickup</dt>
                <dd class="text-base font-medium text-gray-900 ">0 EGY</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 ">Tax</dt>
                <dd class="text-base font-medium text-gray-900 ">0 EGY</dd>
              </dl>
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
              <dt className="text-base font-bold text-gray-900 ">Total</dt>
              <dd className="text-base font-bold text-green-500 ">{totalPrice} EGY</dd>
            </dl>
        
          </div>
          <Link to="/checkout" className="flex bg-green-500 cursor-pointer hover:opacity-80 transition-opacity duration-1000 w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">Proceed to Checkout</Link>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 "> or </span>
            <Link to="/" href="#" title className="inline-flex items-center gap-2 text-sm font-medium text-primary-700  hover:no-underline ">
              <span className='underline'>Continue Shopping</span>
              <i class="fa-solid fa-arrow-right "></i>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>:<Loading></Loading>}
    </>
  )
}
