import { Routes, Route, Navigate} from 'react-router-dom';
import { MAIN_ROUTE } from './utils/constRoutes';
import { AuthContext, AuthProvider, useStore } from './AuthProvider'
import { useContext } from 'react';
import { authRoutes, publicRoutes } from './utils/routes';

function AppRouter() {
    const { user } = useStore(); // показывает авторизован пользователь или нет
    //user.setIsAuth(true)
    console.log('AppRouter', user)
    const isAuth = user._isAuth;

  return (

        <Routes>
       
        { isAuth && 
            authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />}/>
            ))} 
        
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
       
        <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        
        </Routes>
   
    
  );
}

export default AppRouter;