import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, createContext, useContext, useEffect, useState } from 'react'
import UserStore from './store/UserStore';
import GlobalStore from './store/GlobalStore';
import { encryptedLocalStorage } from './utils/secureLocalStorage';


export const AuthContext = createContext<GlobalStore | undefined | null>(null);;

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [userState, setUserState] = useState(() => {
    // Получение данных из localStorage
    const storedUserData = encryptedLocalStorage.getItem('userData');
    console.log("auth")
    // Проверка наличия данных
    if (storedUserData) {
      const userData = storedUserData;
      console.log('userData', userData)
      const obj = new GlobalStore()
      obj.user.setIsAuth(true)
      obj.user.setUser({
        id: userData.jwt.userId,
        email: userData.email,
        name: userData.name,
      });
      console.log(obj)
      return obj

      // Ваши действия с авторизованным пользователем, например, установка состояния
      // и перенаправление на защищенную страницу.
    } else {
      return new GlobalStore()
    }
  });
  console.log('userState',userState)

  return (
    <AuthContext.Provider value={userState}>
      {children}
    </AuthContext.Provider>
  )
}
export const useStore = () => useContext(AuthContext);
