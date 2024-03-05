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
    useEffect(() => {
        // Получение данных из localStorage
        const storedUserData = encryptedLocalStorage.getItem('userData');
        // Проверка наличия данных
        if (storedUserData) {
          const userData = storedUserData;
            console.log('userData', userData)
            user.setIsAuth(true)
            user.setUser({ id: userData.jwt.userId, 
                email: userData.email, 
                name: userData.name, 
                surname: 'surname' });
          // Ваши действия с авторизованным пользователем, например, установка состояния
          // и перенаправление на защищенную страницу.
        }
      }, []);

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
  