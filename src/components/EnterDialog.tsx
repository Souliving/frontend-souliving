import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { useStore } from "@/AuthProvider"
import { observer } from "mobx-react"
import { login } from "@/server/UserApi"
import { useSecureLocalStorage } from "@/utils/secureLocalStorage"


export const EnterDialog = observer(()=> {

  const { user }=  useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
 
  const handleSubmit =  async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
     await login(email, password).then((data)=>{
       console.log(data);
      user.setIsAuth(true);
      user.setUser({ id: data.userId, email: 'email', name: 'name'});
      useSecureLocalStorage('userData', data);
     /*  for (let key in data) {
        if (data.hasOwnProperty(key) && key !== 'jwt') {
          useSecureLocalStorage(key, data[key]);
        }
        else if(data.hasOwnProperty(key)){
          useSecureLocalStorage('token', data[key].token)
          
          //useSecureLocalStorage(key, data[key]);
        } 
      } */
     
   
     });
      
      
      
   /* if(data){
        navigate(fromPage, { replace: true })
      } */
      // Здесь вы можете выполнить дополнительные действия после успешной отправки данных
      // navigate(fromPage, { replace: true });
    } catch (error) {
      // Обработка ошибки, если запрос завершается с ошибкой
      console.error('Произошла ошибка при отправке данных:', error);
    }
   
  }
  const navigateToRegistration = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    console.log('регистрация')
    navigate('/registration', { replace: true });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Вход</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center">Войти в свой аккаунт</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              /* type="email" */
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <div className="grid gap-4 py-4">
               <Button type="submit">Войти</Button>
               
             
              <DialogDescription className="text-center">
                Нажимая на кнопку, вы подтверждаете согласие на обработку персональных данных
              </DialogDescription>
              <Button variant="link" onClick={navigateToRegistration}>Нет аккаунта? Зарегистрируйтесь здесь</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})