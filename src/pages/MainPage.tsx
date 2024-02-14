import { useStore } from "@/AuthProvider";
import AppBar from "@/components/AppBar"

import GuestPage from "./guest-page/GuestPage";
import UserHomePage from "./user-home-page/UserHomePage";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";


const MainPage = observer(() => {
    const { user }= useStore();
    return (
        <>
         <AppBar/>
        
         {!user.isAuth ? <GuestPage/>: <UserHomePage/>}
         <Button onClick={()=>user.setIsAuth(false)}>Гость</Button>
         <Button onClick={()=>user.setIsAuth(true)}>Дом</Button>
        </>
        
    )
  })
  
  export default MainPage
  