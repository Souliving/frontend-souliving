import { useStore } from "@/AuthProvider";
import AppBar from "@/components/header/AppBar"

import GuestPage from "./guest-page/GuestPage";
import UserHomePage from "./user-home-page/UserHomePage";
import { observer } from "mobx-react";

import { useEffect, useState } from "react";
import { encryptedLocalStorage } from "@/utils/secureLocalStorage";
import { getAllCities, getAllSubways } from "@/server/CitySubwayAPI";
import { FormStoreType } from "@/store/FormStore";


interface FavoritesPageProps {
  formStore?: FormStoreType; // Тип для prop formStore
}
const MainPage = observer(( {formStore}: FavoritesPageProps) => {
   let auth;
   const [cities, setCities] = useState<any>(undefined);
   const [subways, setSubways] = useState<any>(undefined);
   const { user }= useStore();
   
   console.log("main "+user)

    return (
        <>
         <AppBar/>
        
         {!user.isAuth ? <GuestPage/>: <UserHomePage formStore = {formStore}/>}
        </>
        
    )
  })
  
  export default MainPage
  