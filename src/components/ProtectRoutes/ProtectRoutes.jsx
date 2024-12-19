import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { tokenContext } from '../../Context/token.context';

export default function ProtectRoutes({children}) {
    // take token  from token context to make user go to layout or auth page if he don't have token
    const {token}  = useContext(tokenContext)
    if(token){
        // this children (layout) 
        return children
    }else{
       return <Navigate to="/auth/login"/>
     
    }
}
