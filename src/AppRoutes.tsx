import { Routes, Route, Navigate, BrowserRouter as Router} from 'react-router-dom';
import { MAIN_ROUTE } from './utils/constRoutes';
import { useStore } from './AuthProvider'

import { authRoutes, publicRoutes } from './utils/routes';
import UserAccountPage from './pages/user-account-page/UserAccountPage';



function AppRouter() {
    const { user } = useStore(); // показывает авторизован пользователь или нет
    //user.setIsAuth(true)
    console.log('AppRouter', user)
    const isAuth = user._isAuth;

  return (
      <Router>
        <Routes>
       
        { isAuth && 
            authRoutes.map(({ path, Component, requiresLayout}) => (
              <Route key={path} path={path} element={requiresLayout ? (
                <UserAccountPage>
                  <Component />
                </UserAccountPage>
              ) : (
                <Component />
              )}/>
            ))
            } 
        
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
       
        <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        
        </Routes>
        </Router>
   
    
  );
}

export default AppRouter;