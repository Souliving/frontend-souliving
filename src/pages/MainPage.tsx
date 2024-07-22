import { useStore } from "@/AuthProvider";
import AppBar from "@/components/header/AppBar"

import GuestPage from "./guest-page/GuestPage";
import UserHomePage from "./user-home-page/UserHomePage";
import { observer } from "mobx-react";



const MainPage = observer(() => {
   const { user }= useStore();
   
   console.log("main "+user)

    return (
        <>
         <AppBar/>
        
         {!user.isAuth ? <GuestPage/>: <UserHomePage/>}
        </>
        
    )
  })
  
  export default MainPage
  