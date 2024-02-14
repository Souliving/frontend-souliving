import { PawPrint } from "lucide-react"
import { Button } from "./ui/button"
import { EnterDialog } from "./EnterDialog";
import { useContext } from "react";
import { AuthContext, useStore } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";
import { User } from "@/utils/dataStructure";


function AppBar () {
  const navigate = useNavigate()
  const {user} = useStore()

  const navigateToRegistration = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    console.log('регистрация')
    navigate('/registration', { replace: true });
  }
  const logOut =()=>{
    user.setIsAuth(false);
    const emptyUser: User = {
      id: -1,
      email: '',
      name: '',
      surname: '',
    };
    user.setUser(emptyUser)
  }
  

    return (
      <div className='container app-bar'>
       <Button className="ml-0	mr-[80%]" ><PawPrint /></Button>
       {!user.isAuth ?
       <>
       <Button className="mr-[0.5%]" onClick={navigateToRegistration}>Регистрация</Button>
       <EnterDialog/>
       </>
       :<Button className="mr-[0.5%]" onClick={logOut}>Выход</Button>
       }
       {/* <Button  className="	mr-[0.5%]" onClick={enter}>Вход</Button> */}
       
      </div>
    )
  }
  
  export default AppBar 
  