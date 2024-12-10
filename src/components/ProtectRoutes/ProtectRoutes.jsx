import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { tokenContext } from '../../Context/token.context';

export default function ProtectRoutes({children}) {
    const {token}  = useContext(tokenContext)
    if(token){
        return children
    }else{
       return <Navigate to="/auth/login"/>
     
    }
}
