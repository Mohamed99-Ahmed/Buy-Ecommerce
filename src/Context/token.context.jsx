import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

export const tokenContext = createContext(0);
export default function TokenProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState(null);

    const [userName, setUserName] = useState("");
    useEffect(() => {
      if (token) {
        let decodedToken = jwtDecode(token);
        setUserName(decodedToken.name); // Set the decoded name
      }
    }, [token]);
    function LogOut(){
        localStorage.removeItem("token");
        setToken(null)
    }
  return (
    <>
        <tokenContext.Provider value={{token, setToken,LogOut,userName,setUserName}} >
            {children}
        </tokenContext.Provider>
    </>
  )
}
