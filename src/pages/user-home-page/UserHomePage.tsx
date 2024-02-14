import { useStore } from "@/AuthProvider";
import { getAllShortForms } from "@/server/FormsApi";
import { useEffect } from "react";



const UserHomePage=(() => {
    const { user }= useStore();
    useEffect(() => {
        // Загрузка данных пользователя при монтировании компонента
       try {
            getAllShortForms().then((data:any)=>{
                 console.log(data);
            });
           
          } catch (error) {
            console.error('Произошла ошибка при загрузке данных пользователя:', error);
          }
    
  
      }, []);
    return (
        <>
         
        <div>user page</div>
        </>
        
        
    )
  })
  
  export default UserHomePage
  