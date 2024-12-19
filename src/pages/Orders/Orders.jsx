import React, { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/token.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { ProductSp } from "../../Context/ProductSp";

export default function Orders() {
  // take token from token useContext
  let { token } = useContext(tokenContext);
  // distruct userid from token by use jwtDecode library
  let { id } = jwtDecode(token);
  let [orders, setOrders] = useState(null);
  const { getSpProduct } = useContext(ProductSp);
  const navigate = useNavigate();
// this function take orders from backend then put in orders state then you can display in this component
  async function getAllOrders() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    setOrders(data);
  }
  // call getAllOrders func in mounting phase 
  useEffect(() => {
    getAllOrders();
    
  }, []);
  return (
    <>
      <section className="container orders space-y-4">
        {/* if no order here display this div */}
      {  orders !== null && orders.length == 0 ?<div className='border border-green-400 p-8 '>
            No order here please go to  <Link className='text-green-400 underline uppercase text-lg ' to="/cart">Cart</Link>
          </div>:""}
          {/* if have more than 0 order display this div */}
        {orders ? (
          orders.map((order) => {
            return (
              <div
                key={order.id}
                className="orderItem p-4 rounded-lg bg-gray-100  border-2 border-gray-100 space-y-4"
              >
                <header className="flex flex-col md:flex-row items-baseline  justify-between gap-4 text-nowrap">
                  <div className="flex gap-4 items-center ">
                    <h2 className="capitalize bg-white p-2 rounded-full font-semibold">
                      order Id :
                      <span className="text-gray-600">{order.id}</span>
                    </h2>
                    <p className="text-gray-600">
                      {order.createdAt.split("").slice(0, 10).join("")}
                    </p>
                  </div>
                  <div className="status-order space-x-3 self-end md:self-center">
                    {order.isPaid ? (
                      <span className="rounded-full bg-red-500 p-3 text-white capitalize">
                        Paid
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-500 p-3 text-white capitalize">
                        not Paid
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="rounded-full bg-green-400 p-3 text-white capitalize">
                        drived
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-400 p-3 text-white capitalize">
                        not drived
                      </span>
                    )}
                  </div>
                </header>
                <main className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {order.cartItems.map((cart) => {
                    return (
                      <Link
                        onClick={()=>{ getSpProduct(cart._id);}}
                        to={`/product/${cart._id}`}
                        key={cart._id}
                    
                        className="flex overflow-hidden  relative cursor-pointer group flex-col justify-between  gap-2 p-2 border-gray-500 border-2 border-solid rounded-md"
                      >
                        <div className="overflow-hidden self-stretch">
                          <img
                            src={cart.product.imageCover}
                            className=" h-[200px] items-stretch  duration-1000 w-full object-cover   transition-[transform]  group-hover:scale-125"
                            alt={cart.product.title}
                          />
                        </div>
                        <h1 className="capitalize text-lg font-bold line-clamp-2">
                          {cart.product.title}
                        </h1>
                        <p className="text-green-800 font-bold capitalize text-lg">
                          {cart.product.category.name}
                        </p>
                        <h2 className="capitalize ">
                          count :{" "}
                          <span className="font-medium"> {cart.count}</span>
                        </h2>
                        <h2 className="capitalize ">
                          Brand :{" "}
                          <span className="font-medium">
                            {" "}
                            {cart.product.brand.name}
                          </span>
                        </h2>

                        <p className="space-x-4">
                          <i className="fa-solid fa-star text-green-600"></i>
                          <i className="fa-solid fa-star text-green-600"></i>
                          <i className="fa-regular fa-star"></i>
                          <span className="bg-green-300 px-3 py-1 round-sm">
                            {cart.product.ratingsAverage}
                          </span>
                        </p>
                        <span className="font-bold text-xl whitespace-nowrap">
                          price : {cart.price} EGP
                        </span>
                      </Link>
                    );
                  })}
                </main>
                <footer className="border-t-[3px] flex flex-col md:flex-row justify-between items-center pt-4 border-white text-nowrap gap-2">
                  <h3 className="text-lg font-medium capitalize">
                    total price :
                    <span className="text-green-400 text-xl ml-4">
                      {order.totalOrderPrice} Eg
                    </span>
                  </h3>
                  <p className="text-lg font-medium capitalize ">
                    payment method :
                    <span className="uppercase text-green-400 ml-4">
                      {order.paymentMethodType}
                    </span>
                  </p>
                </footer>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
