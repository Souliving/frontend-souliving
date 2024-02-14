import { AuthContext, useStore } from "@/AuthProvider";
import AppBar from "@/components/AppBar"
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const GuestPage = () => {
    const { user }= useStore();
    console.log('GuestPage')
   /*  if (user.isAuth) {
        console.log('User is auth')
        return <Navigate to="/home" replace={true}/>
    } */

    return (
        <>
        <div>{user.isAuth}</div>
         <p>Guest Page</p>
        </>
        
    )
  }
  
  export default GuestPage
  