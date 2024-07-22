import { Bell, Heart, MessageSquare, PawPrint } from "lucide-react"
import { Button } from "../ui/button"
import { EnterDialog } from "../EnterDialog";
import {  useEffect } from "react";
import {  useStore } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";
import { emptyUser } from "@/store/UserStore";
import { encryptedLocalStorage } from "@/utils/secureLocalStorage";
import AuthAppBar from './components/AuthAppBar'

function AppBar () {
  const navigate = useNavigate()
  const {user} = useStore()
  useEffect(() => {
      console.log('appBar',user.isAuth)
    
  }, [user.isAuth]);
  const navigateToMain = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    console.log('главная')
    navigate('/', { replace: true });
  }

  const navigateToRegistration = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    console.log('регистрация')
    navigate('/registration', { replace: true });
  }

  const logOut =()=>{
    user.setIsAuth(false);
    user.setUser(emptyUser);
    encryptedLocalStorage.removeItem('userData');
  }
  

    return (
      <div className='container app-bar ' >
       <Button 
          className="ml-0	mr-[70%]" 
          onClick={navigateToMain}>
            <PawPrint />
        </Button>
       {!user.isAuth ?
       <>
       <Button className="mr-[0.5%]" onClick={navigateToRegistration}>Регистрация</Button>
       <EnterDialog/>
       </>
       :
       <>
       <AuthAppBar/>
       {/*  <Button className="mr-[0.2%]" variant="ghost"><Heart /></Button>
        <Button className="mr-[0.2%]" variant="ghost"> <Bell /></Button>
        <Button className="mr-[0.2%]" variant="ghost"><MessageSquare /></Button>
        <Button className="mr-[0.5%]" onClick={logOut}>Выход</Button> */}
       </>
       
       }
       {/* <Button  className="	mr-[0.5%]" onClick={enter}>Вход</Button> */}
       
      </div>
    )
  }
  
  export default AppBar 
  