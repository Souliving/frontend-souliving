import { Bell, Heart, MessageSquare, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useStore } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";
import { emptyUser } from "@/store/UserStore";
import { encryptedLocalStorage } from "@/utils/secureLocalStorage";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { USER_ACCOUNT_ROUTE } from "@/utils/constRoutes";

function AuthAppBar () {
  const navigate = useNavigate()
  const {user} = useStore()

  const logOut =()=>{
    user.setIsAuth(false);
    user.setUser(emptyUser);
    encryptedLocalStorage.removeItem('userData');
  }
  const toFavorites = () =>{
    console.log(user.id)
    /* navigate(`/favorites/${use}`}); */
  }
  const toUserAccount = () =>{
    console.log(user.user.id)
    navigate( `${USER_ACCOUNT_ROUTE}/${user.user.id}`);
  }
  
    return (
     
       <>
        <Button className="mr-[0.2%]" variant="ghost" onClick={toFavorites}><Heart /></Button>
        <Button className="mr-[0.2%]" variant="ghost"> <Bell /></Button>
        <Button className="mr-[0.2%]" variant="ghost"><MessageSquare /></Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><UserRound /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick = {toUserAccount}>
                        Личный кабинет
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button className="mr-[0.5%]" onClick={logOut}>Выход</Button>
                       
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
    </DropdownMenu>
        {/* <Button className="mr-[0.5%]" onClick={logOut}>Выход</Button> */}
       </>
       
       
     
    )
  }
  
  export default AuthAppBar 