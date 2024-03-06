import { useStore } from "@/AuthProvider";
import AppBar from "@/components/AppBar"

import GuestPage from "./guest-page/GuestPage";
import UserHomePage from "./user-home-page/UserHomePage";
import { observer } from "mobx-react";

import { useEffect, useState } from "react";
import { encryptedLocalStorage } from "@/utils/secureLocalStorage";
import { getAllCities, getAllSubways } from "@/server/CitySubwayAPI";



const MainPage = observer(() => {
   let auth;
   const [cities, setCities] = useState<any>(undefined);
   const [subways, setSubways] = useState<any>(undefined);
   const { user }= useStore();
   
   console.log("main "+user)

     /*  useEffect(()=>{
        console.log(user.isAuth)
        const fetchData = async () => {
         
              try {
                await getAllCities().then(data => {
                    setCities(data);
                    console.log(cities);
                  });
                  
                  await getAllSubways().then(data => {
                    setSubways(data);
                    console.log(subways);
                  });
                return [cities, subways]
              } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
              }
            
          };
        if (user.isAuth && (!cities || !subways)) {  
            
            console.log('cs',cities, subways);
            
            fetchData();
        }
      }, [user.isAuth]) */

     /*  useEffect(()=>{
        console.log('User auth is', user.isAuth)
      }, [cities]) */

    return (
        <>
         <AppBar/>
        
         {!user.isAuth ? <GuestPage/>: <UserHomePage/>}
        </>
        
    )
  })
  
  export default MainPage
  