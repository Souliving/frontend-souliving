import { useStore } from "@/AuthProvider";
import AppBar from "@/components/AppBar"

import GuestPage from "./guest-page/GuestPage";
import UserHomePage from "./user-home-page/UserHomePage";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { encryptedLocalStorage } from "@/utils/secureLocalStorage";


const MainPage = observer(() => {
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
    return (
        <>
         <AppBar/>
        
         {!user.isAuth ? <GuestPage/>: <UserHomePage/>}
        </>
        
    )
  })
  
  export default MainPage
  