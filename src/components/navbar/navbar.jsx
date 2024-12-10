import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { tokenContext } from "../../Context/token.context";
import { cartContext } from "../../Context/cart.context";
import { wishList } from "../../Context/WishList.context";
import userImg from "../../assets/images/user.png"
import { jwtDecode } from "jwt-decode";


export default function NavBar() {
  const { LogOut, token,userName } = useContext(tokenContext);
 
  // check the width of window to appear or disapperr the links
  const { carts, getUserCarts } = useContext(cartContext);
  const {numProductWish,getAllProductWishList} = useContext(wishList)
  const [isOpen, setIsOpen] = useState(true);
  const [userBox , setUserBox] = useState(false);
  // in updatin phase of component
  function navBar() {
    setIsOpen((prev) => !prev);
  }
  useEffect(()=>{
   // when change the numProductWish   
  },[numProductWish])
  useEffect(() => {
    getUserCarts();
    getAllProductWishList()
  }, []);

  function toggleNav() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
  
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 w-full z-40 border-b border-gray-200 dark:border-gray-600">
        <div className="flex gap-3 flex-wrap md:flex-nowrap items-center justify-between p-4">
          <Link className="logo">
            <h1 className="text-green-700 uppercase font-bold text-2xl">Buy</h1>
          </Link>
          <div className="right-nav m-0 inline-flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="links flex items-center flex-row gap-4 text-xl">
              {!token ? (
                <div>
                  <Link to="/auth/login">
                    <button className="btn px-2 whitespace-nowrap">
                      Log in
                    </button>
                  </Link>
                  <Link to="/auth/signup">
                    <button className="btn px-2 whitespace-nowrap">
                      Sign up
                    </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
              {token ? (<>
                <div className="relative">
                <Link to="/favorites" className="cursor-pointer">
                       <i className="fa-solid fa-heart text-xl"></i>
                </Link>
                 {numProductWish? <span className="absolute -top-2 -right-2  rounded-full  w-5 h-5 text-center  text-sm  bg-green-400 text-white">{numProductWish}</span>:""}
                </div>
             
                <div className="relative">
                  <Link to="/cart" className="cursor-pointer">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                 {carts? <span className="absolute -top-2 -right-2  rounded-full  w-5 h-5 text-center  text-sm  bg-green-400 text-white">{carts.length}</span>:""}
                </div>
                
                </>
              ) : (
                ""
              )}
              {token ? (
                <span onClick={LogOut} className="cursor-pointer">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>
              ) : (
                ""
              )}
            </div>
            <div
              className="button flex items-center justify-center cursor-pointer"
             
            >
              
              <i className="fa-solid font-bold text-2xl fa-bars md:hidden"  onClick={toggleNav}></i>
            </div>
          </div>
          { token ? (
            <div
              className={`items-center justify-center w-full md:flex md:w-auto  md:order-1 ${isOpen?"h-0 overflow-hidden ":""} md:h-auto `}
              id="navbar-sticky"
            >
              <ul  className="flex flex-col md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to=""
                    className="block py-2 px-3 rounded md:bg-transparent hover:text-green-400"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className="block py-2 px-3 rounded md:bg-transparent hover:text-green-400"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Cart
                  </NavLink>
                </li>
             
                <li>
                <NavLink
                    to="/favorites"
                    className="block py-2 px-3 rounded md:bg-transparent hover:text-green-400"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Favoreties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allorders"
                    className="block py-2 px-3 rounded md:bg-transparent hover:text-green-400"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="block py-2 px-3 rounded md:bg-transparent hover:text-green-400"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        { token ?   <div onClick={()=>setUserBox(!userBox)} className="user  cursor-pointer absolute rounded-bl-[20px]  right-0 top-full p-4 z-[100] flex flex-col gap-3 bg-gray-100">
            <img src={userImg} alt="userImg" className="w-[30px] "/>
            
             {userBox ? <>
                <h2 className="capitalize text-md font-semibold ">{userName}</h2>
                <NavLink to="/profile"  className="btn font-bold capitalize">edit profile</NavLink>
              </>:""}
            
        </div>:""}
      </nav>
    </>
  );
}
