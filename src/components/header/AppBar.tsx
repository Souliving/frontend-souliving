import {PawPrint } from "lucide-react"
import { Button } from "../ui/button"
import { EnterDialog } from "../EnterDialog";
import {  useEffect } from "react";
import {  useStore } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";

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

 
  

    return (
      <div className='container-bar app-bar '>
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
      
       </>
       
       }
       
      </div>
    )
  }
  
  export default AppBar 
  